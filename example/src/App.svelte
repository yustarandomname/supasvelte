<svelte:head>
  <script type="module" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule="" src="https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js"></script>
</svelte:head>

<script>
	import Auth from "../../src/Auth.svelte"
	import Storage from "../../src/Storage.svelte"
	import TableTab from "./TableTab.svelte"
	import EmailCard from "./EmailCard.svelte"
	import {sveltesupa} from "sveltesupa"
	import {Tabs, Form, Input, Container, Button} from "projectc-components"

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

	let email;
	let password;

	let fileName = "IMG_5345.jpeg";
</script>

<style>
	img {
		max-height: 30rem;
		width:auto 
	}
</style>

<EmailCard/>

<Auth {sveltesupa} let:user let:signIn let:signUp let:signOut let:error>
	<Container size="m" header="Auth">
		<pre>
			{JSON.stringify(user, null, 2)}
		</pre>

		<Button on:click={() => signOut()}>Sign out</Button>
	</Container>

	<Tabs {tabs} />

	<div slot="logged-out">
		<Form header="Sign in" submitMessage="sign in" on:submit={() => signIn({email, password})}>
			<Input.Email bind:value={email}/>
			<Input.Password bind:value={password}/>
		</Form>

		<Form header="Sign up" submitMessage="sign up" on:submit={() => signUp({email, password})}>
			<Input.Email bind:value={email}/>
			<Input.Password bind:value={password}/>
		</Form>
	</div>

	<Container size="m" header="Storage">
		<Input.Dropdown options={["IMG_5345.jpeg", "IMG_5357.jpeg", "IMG_5430.jpeg", "IMG_5455.jpeg", "IMG_5460.jpeg"]} bind:value={fileName}/>
		<Storage bucket="cats" file={fileName} let:src let:error>
			<img {src} alt="blob">
	
			{#if error}
				<pre>error: {JSON.stringify(error, null, 2)}</pre>
			{/if}
		</Storage>
	</Container>
</Auth>