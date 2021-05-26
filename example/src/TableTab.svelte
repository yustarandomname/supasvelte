<script>
  import {Container, Form, Input} from "projectc-components"
  import {Table} from "sveltesupa"
  export let title
  export let select = "*"
  export let limit = false
  export let order = false
  export let range = [false, false]
  export let single = false
  export let where = false

  let _values = {
    name: {default: null, value: ["Any database table name"], description: "Name of your table"},
    select: {default: "*", value: ["Column name"] },
    limit: {default: false, value: ["Num"] },
    order: {default: false, value: [">", "<"]},
    range: {default: [false, false], value: ["[Start Num, End Num]"] },
    single: {default: false, value: ["Bool"] },
    where: {default: false, value: ["<",">","<=",">=","%","i%","!=","==","==="]}
  }

  function init(variable, to) {
    switch (variable) {
      case "limit": limit = (typeof limit == "boolean") ? to : limit; return ""
      case "range": range = (typeof range[0] == "boolean") ? to : range; return ""
      case "where": where = (typeof where == "boolean") ? to : where; return ""
    }
  }
</script>

<style>

</style>

<h3>{title}</h3>
<Table name="Users" {select} {where} {limit} {order} {single} {range} let:data let:error let:refresh>
  <Container>
    <div>
      {"<Table name='Comments'"}
        <br>
        &nbsp;&nbsp;
        {#if select != _values.select.default}select=<b>'{select}'</b>{/if}
        {#if limit != _values.limit.default}limit=<b>'{limit}'</b>{/if}
        {#if order != _values.order.default}order=<b>'{order}'</b>{/if}
        {#if range[0] != _values.range.default[0]}range=<b>'[{range}]'</b>{/if}
        {#if single != _values.single.default}single=<b>'{single}'</b>{/if}
        {#if where != _values.where.default}where=<b>'[{where}]'</b>{/if}
        <br>
        &nbsp;
      {"  />"}
    </div>
  </Container>

  <Form size="s" header="Props" submitMessage="Retry" on:submit={() => refresh()}>
    <Input.Text header="select" footer="Comma separated columns you would like to fetch." placeholder="select" bind:value={select} />

    <Input.MultiInput header="limit" footer="Limit the amount of rows fetched from your database.">
      <Input.Checkbox bind:value={limit} />
      {#if limit}{init("limit", 1)}<Input.Default type="number" bind:value={limit} /> {/if}
    </Input.MultiInput>

    <Input.Dropdown header="Order" footer="Orders from either large to small or small to large. False means no order at all." options={[false, "<", ">"]} bind:value={order} />

    <Input.MultiInput header="range" footer="Limit the amount of rows fetched from your database in a certain range.">
      <Input.Checkbox bind:value={range[0]} />
      {#if range[0]}{init("range", [1,2])}
        <Input.Default type="number" bind:value={range[0]} /> 
        <Input.Default type="number" bind:value={range[1]} /> 
      {/if}
    </Input.MultiInput>

    <Input.MultiInput header="where" footer="Filter your data with 3 parameters">
      <Input.Checkbox bind:value={where} />
        {#if where}{init("where", ["id", ">=", 4])}
          <Input.Text header="column" placeholder="column" bind:value={where[0]} /> 
          <Input.Dropdown header="Opperator" options={["<",">","<=",">=","%","i%","!=","==","==="]} bind:value={where[1]}/>
          <Input.Text header="value" bind:value={where[2]} /> 
        {/if}
    </Input.MultiInput>
      
    <Input.Checkbox header="Single" footer="Give back the head as a single item, when you need just one row of a table." bind:value={single} />
  </Form>

  {#if data}
    <Container size="s" header="Data">
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </Container>
  {/if}

  <div slot="error">
    <Container size="s" header="Error">
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Container>
  </div>

</Table>