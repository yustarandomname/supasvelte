<script>
  import {sveltesupa} from "./supabaseStore"

  // SELECTORS
  export let name;
  export let select = "*"

  // // MODIFIERS
  export let limit = false
  export let order = false
  export let range = [false, false]
  export let single = false

  // // FILTER
  export let where = false

  // Local reactive variables
  let _error = false

  function findFilterType(type) {
    switch (type) {
      case "<": return "lt"
      case ">": return "gt"
      case "<=": return "lte"
      case ">=": return "gte"
      case "%": return "like"
      case "i%": return "ilike"
      case "!=": return "neq"
      case "==": return "eq"
      case "===": return "is"
      default:
        return type
    } 
  }

  function filterRes(res) {
    if (typeof where == "string") where = where.split(" ")
    if (where.length != 3) return {error: {message: "Where has to be an Array of length 3"}}

    return {filteredRes: res.filter(where[0], findFilterType(where[1]), `${where[2]}`)}
  }

  async function getTable() {
    if (!$sveltesupa) {_error = {message: "Supabase is not yet inited"}}
    if (!name) {_error = {message: "Please specify the name of the table", code: "42P01"}; return}

    let res = $sveltesupa
      .from(name)
      .select(select)

    if (where) {
      const {filteredRes, error} = filterRes(res)
      if (error) {_error = error; return}
      res = filteredRes
    }
    
    if (limit) res = res.limit(limit)
    if (order) res = (order == "<") ? res.order({ascending: false}) : res.order({ascending: true})
    if (range && range[0] && range[1]) res = res.range(range[0], range[1])
    if (single) res = res.single()

    let {data, error: supabaseError} = await res

    // set local _error to supabase error
    _error = supabaseError
    if (supabaseError) return 

    return data
  }
</script>

{#if _error}
  <slot name="error" error={_error}/>
{:else}
  {#await getTable()} 
    <slot name="loading"/>
  {:then data}
    <slot {data} />
  {:catch error}
    catch error
    <slot name="error" {error} />
  {/await}
{/if}