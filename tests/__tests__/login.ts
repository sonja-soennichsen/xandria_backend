import request from "graphql-request"
// https://www.npmjs.com/package/graphql-request

let header: {}
it("logs in", async () => {
  request({
    url: "http://localhost:4000/graphql/login",
    document: `mutation Mutation($username: String!, $password: String!) {
      signIn(username: $username, password: $password)
    }`,
    variables: {
      username: "username111",
      password: "null",
    },
  }).then((data) => {
    header = {
      authorization: `Bearer ${data.signIn}`,
    }
    expect(data.signIn).toMatch("ey")
  })
})

it("requests resource with token", async () => {
  request({
    url: "http://localhost:4000/graphql",
    document: `query Query {
      resources {
        headline
        description
        url
      }
    }`,
    requestHeaders: header,
  }).then((data) => {
    expect(data).toBeTruthy
  })
})
