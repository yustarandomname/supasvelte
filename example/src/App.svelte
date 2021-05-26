<svelte:head>
  <script type="module" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule="" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js"></script>
</svelte:head>

<script>
	import TableTab from "./TableTab.svelte"
	import {sveltesupa} from "sveltesupa"
	import {Tabs} from "projectc-components"

	const SUPABASE_URL = "https://ulvtjjabqrmyytlqkhhv.supabase.co"
	const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTM3ODMyNywiZXhwIjoxOTM0OTU0MzI3fQ.L32epFv3XaJu7Jk7pd45F9AN8U4-80j_Dc1I4LF8ZZ8'

	sveltesupa.init({url: SUPABASE_URL, key: SUPABASE_KEY})

	const tabs = [
		{component: TableTab, props: {title: "Tabel default"}},
		{component: TableTab, props: {title: "Select", select: "id, name"}},
		{component: TableTab, props: {title: "Nested select", select: "*, organisation(name, type(*)) "}},
		{component: TableTab, props: {title: "Limit", limit: 4}},
		{component: TableTab, props: {title: "Order", order: ">"}},
		{component: TableTab, props: {title: "Range", range: [3,4]}},
		{component: TableTab, props: {title: "Where", where: ["id", ">=", "2"]}}
	]
</script>

<Tabs {tabs}>
</Tabs>