<script>
  import {sveltesupa} from "./supabaseStore"

  export let bucket;
  export let file;

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

</script>

{#if _loading}
  <slot name="loading" error={_error}/>
{:else if _error}
  <slot error={_error}/>
{:else if _src}
  <slot error={_error} src={_src} />
{/if}