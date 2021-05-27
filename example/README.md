# supa svelte
Cybernetically enhanced supabase apps

## What is sveltesupa
Svelte supa is build on top of svelte to give svelte users an easier way to access their supabase. 

## How to use sveltesupa
I created an example app which is visible out [here](https://github.com/yustarandomname/supasvelte/tree/main/example).

## Getting started
Create a folder and run these commands in that directory.
```
  npx degit sveltejs/template
  npm install supabase supasvelte
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
``` javascript
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
```javascript
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
- **select**: [String] - A comma seperated string of collums in a database.
- **limit**
- **order**
- **range**
- **single**
- **where**
#### Slots
- data
- error
- refresh
#### Example

## What we are working on
1. Write more/better documentation
1. Auto updated table
