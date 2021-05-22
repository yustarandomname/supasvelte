<script>
	import {Table, supasvelte} from "supasvelte"
	import {SUPABASE_URL, SUPABASE_KEY} from "./API_KEYS"

	// console.log(supasvelte)
	supasvelte.init({url: SUPABASE_URL, key: SUPABASE_KEY})
</script>
<h1>test</h1>

<Table name="Comments" select={"id,comment, up_votes"} where={"up_votes != 0"} let:data let:error>
	{JSON.stringify(data)}
	{@debug data}

	<div slot="error">
		Error: {JSON.stringify(error)}
	</div>
	<div slot="loading">LOADING</div>
</Table>