# supa svelte
Cybernetically enhanced supabase apps

## What is sveltesupa
Svelte supa is build on top of svelte to give svelte users an easier way to access their supabase. 

## How to use sveltesupa
I created an example app which is visible out [here](https://github.com/yustarandomname/supasvelte/tree/main/example).

## Getting started
In your terminal, navigate to this directory, and run:
```
  npm link ../
  npm run dev
```

## Documentation
### Initalization
Go to or create your supabase project. In the ``API`` sidebar, go to ``Authenication``. This is where you find your ``SUPABASE_KEY`` and ``SUPABASE_URL``. Paste these in your project. To initialze the project use.

```javascript
  import {sveltesupa} from "sveltesupa"

  sveltesupa.init({
    url: "<YOUR_SUPABASE_URL>", 
    key: "<YOUR_SUPABASE_key>"
  })
```

### Auth
```html
  import {Auth} from "sveltesupa"
  <Auth {sveltesupa} />
```

#### Props
- **sveltesupa**: *[Required]* An initialized sveltesupa.

#### slots
- user
- error
- signIn
- signUp
- signOut

#### Example
```html
<script>
  import {Auth, sveltesupa} from "sveltesupa"
  sveltesupa.init({"<YOUR_SUPABASE_URL>", "<YOUR_SUPABASE_KEY>"})
  let credentials = {email:"", password:""}
</script>

<Auth {sveltesupa} let:user let:signIn let:signOut let:error>
  <pre>{JSON.stringify(user, null, 2)}</pre>

  <button on:click={() => signOut()}>Sign out</button>

  <div slot="logged-out">
    <form on:submit={signIn(credentials)}>
      <input type="email" bind:value={credentials.email} required/>
      <input type="password" bind:value={credentials.email} required />
      <input type="submit">
    </form>
  </div>
</Auth>
```

### Table
#### Props
- **name**:[String] - *[Required]* - A name of a certain table in your database.
- **select**: [String] - A comma seperated string of collums in a database. Default is all columns.
- **limit**: [String | Num | **false**] - Limit the amount of rows
- **order**: [">" | "<" | **false**] - Order row id from large to small or small to large.
- **range**: [[String, String] | **false**] - From, to row
- **single**: [String | **false**] - Returns only one data item
- **where**: [[[String], [String], [String]] | **false** ] - ["Column name", "Filter type", "value"]

#### Filter types
- == - alias for equal to, eq.
- === - alias for strictly equal to, is
- < - alias for less than, lt
- \> - alias for greater than, gt
- <= - alias for less than or equal to, lte
- \>= - alias for greater than or equal to, gte
- % - alias for like
- i% - alias for ilike
- contains
- contained by
- in
- rangeGt
- rangeGte
- rangeLt
- rangeLte
- range adjacent
- overlaps
- textseatch


#### Slots
- data - array of rows
- error
- refresh
#### Example
```html
  <Table name="Users" select="name, surname" limit={3} where={["id",">=","3"]}  let:data let:error let:refresh>
    <h1>data</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <button on:click={refresh}>Click here to refresh data</button>
    <div slot="error">
      <h1>There was an error:</p>
      <p>{error}</p>
      </div>
  </Table>
```

### Storage
```javascript
import {Storage} from "sveltesupa"
```

> ⚠️ Don't forget to set your policies where users have at least access to SELECT 

#### Props
- **bucket**:[String] - *[Required]* - Bucket name
- **file**: [String] - *[Required]* - Path to file name

#### Example
- Download a image from bucket
```html
<Storage bucket="cats" file="IMG_123.png" let:src let:error let:delete>
  <img {src} alt="blob">

  <button on:click={delete}>Delete file</button>

  {#if error}
    <pre>error: {JSON.stringify(error, null, 2)}</pre>
  {/if}
</Storage>
```

- Uplaod image to bucket
```html
  <script>
    let files;
  </script>
```

```html
<Storage bucket="cats" let:src let:error let:upload>
  {#if src}
    <img {src} alt="blob">
  {/if}

  <input type="file" bind:files>

  <button on:click={() => upload(files)}>Delete file</button>

  {#if error}
    <pre>error: {JSON.stringify(error, null, 2)}</pre>
  {/if}
</Storage>
```

## What we are working on
1. Write more/better documentation
2. Auto updated table


# Change log
## Version 0.1.0
- Added storage example
- Added count example for Table
- Removed console.logs
