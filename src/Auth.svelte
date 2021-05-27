<script>
  export let sveltesupa

  let _user;
  let _error;

  $sveltesupa.auth.onAuthStateChange((_, session) => {
    _user = session?.user
  })

  function signUp(credentials) {
    if (!$sveltesupa) {_error = {message: "Supabase is not initiated"}}
    const {user, error} = $sveltesupa.auth.signUp(credentials)
    _error = error
    _user = user
  }

  function signIn(credentials) {
    if (!$sveltesupa) {_error = {message: "Supabase is not initiated"}}
    const {user, error} = $sveltesupa.auth.signIn(credentials)
    _error = error
    _user = user
  }

  function signOut() {
    if (!$sveltesupa) {_error = {message: "Supabase is not initiated"}}
    const {error} = $sveltesupa.auth.signOut()
    _error = error
    _user = null
  }
</script>

{#if _user}
  <slot user={_user} {signOut} />
{:else}
  <slot name="logged-out" error={_error} {signIn} {signUp}/>
{/if}

