<script>
  import {sveltesupa} from "./supabaseStore"

  export let bucket;
  export let file = false;

  let _src;
  let _error;
  let _loading;

  // Update _src when file or bucket changes
  $: file && bucket && getFile()

  // Get _src with bucket and file
  async function getFile() {
    try {
      _loading = true

      if (!bucket) throw "Please specify a bucket name"
      if (!file) throw "Please specify a file name"

      const { data, error } = await $sveltesupa.storage
        .from(bucket)
        .download(file)

      if (error) throw error
      _src = URL.createObjectURL(await data)
      _meta = await metadata
    } catch (error) {
      _error = error
    } finally {
      _loading = false
    }
  }

  async function remove() {
    try {
      const tempSrc = [..._src]
      const _src = null

      const { error} = await $sveltesupa.storage
        .from(bucket)
        .remove([file])

      if (error) {
        _src = tempSrc
        throw error
      }
    } catch (error) {
      _error = error
    }
  }

  async function upload(files) {
    try {
      for (file in files) {
        const { error } = await $sveltesupa.storage
          .from(bucket)
          .upload(file.name, file)

        if (error) throw error
      }
      _src = URL.createObjectURL(files[0])
    } catch (error) {
      _error = error
    }
    
  }

</script>

{#if _loading}
  <slot name="loading" error={_error}/>
{:else if _error}
  <slot error={_error}/>
{:else}
  <slot error={_error} src={_src} {remove} {upload}/>
{/if}