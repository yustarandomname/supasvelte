<script>
  import {sveltesupa, Auth} from "sveltesupa"
  import {Container} from "projectc-components"
</script>

<Auth {sveltesupa} let:user>
  <Container header="email">
	  Email: {user.email}
  </Container>
</Auth>