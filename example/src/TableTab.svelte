<script>
  import {Table} from "sveltesupa"
  export let title
  export let select = "id,comment, up_votes"
  export let where = "up_votes != 0"
</script>

<h3>{title}</h3>
<Table name="Comments" {select} {where} let:data let:error>



  <b>Data</b>
  {JSON.stringify(data)}

	<div slot="error">
		<b>Error:</b> {JSON.stringify(error)}
	</div>
	<div slot="loading">LOADING</div>


</Table>