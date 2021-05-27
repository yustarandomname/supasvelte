<script>
  import {sveltesupa, Auth} from "sveltesupa"
  import {Container} from "projectc-components"
</script>

<Auth {sveltesupa} let:user>
  {console.log(user)}
  <Container>
	  Email: {user.email}
  </Container>
</Auth>