export const signIn = /* GraphQL */ `
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`

export const signUp = /* GraphQL */ `
  mutation SignUp(
    $username: String!
    $password: String!
    $name: String!
    $email: String!
  ) {
    signUp(username: $username, password: $password, name: $name, email: $email)
  }
`
