<script>
	import TableTab from "./TableTab.svelte"
	import {Container} from "projectc-components"
	// import {sveltesupa} from "sveltesupa"
	// import {SUPABASE_URL, SUPABASE_KEY} from "./API_KEYS"

	// console.log(supasvelte)
	sveltesupa.init({url: SUPABASE_URL, key: SUPABASE_KEY})

	// const tabs = [
	// 	{component: TableTab, props: {title: "Select"}}
	// ]
</script>
<h1>test</h1>

<!-- <Tabs {tabs} /> -->
<Container>test</Container>