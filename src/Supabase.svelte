<script>
  import {supasvelte} from "./supabaseStore"
</script>

<slot supabase={$supasvelte}/>