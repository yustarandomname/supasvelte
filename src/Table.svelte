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
  let _data;

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
    if (order) res = (order == ">") ? res.order("id", {ascending: false}) : res.order("id",{ascending: true})
    if (range && range[0] && range[1]) res = res.range(range[0], range[1])
    if (single) res = res.single()

    let {data, error: supabaseError} = await res

    // set local _error to supabase error
    _error = supabaseError
    if (supabaseError) return 

    _data = data
  }

  getTable()
</script>

{#if _error}
  <slot name="error" error={_error} refresh={() => getTable()}/>
{:else}
  {#await _data} 
    <slot name="loading"/>
  {:then data}
    <slot {data} refresh={() => getTable()}/>
  {:catch error}
    catch error
    <slot name="error" {error} refresh={() => getTable()} />
  {/await}
{/if}