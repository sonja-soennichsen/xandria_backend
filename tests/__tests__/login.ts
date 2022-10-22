// import { request } from "graphql-request"
// import { signIn, signUp } from "../__mocks__/graphql"
// import { getConfig } from "../helpers/testHelpers"
// import { signUpData, loginData } from "../__mocks__/user"

// const config = getConfig()

// test("successfully create a user", async () => {
//   try {
//     const data: any = await request(config.url, signUp, signUpData)

//     expect(data).toHaveProperty("signup")
//     expect(data.signup.signUpData.name).toEqual(signUpData.name)
//   } catch (e) {
//     console.log("error", e)
//   }
// })

// test("successfully get token on login", async () => {
//   const data: any = await request(config.url, signIn, loginData)

//   expect(data).toHaveProperty("signin")
//   expect(data.login.accessToken).toBeDefined()
// })

const { ApolloServer } = require("apollo-server")
import { addMocksToSchema } from "@graphql-tools/mock"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { startStandaloneServer } from "@apollo/server/standalone"
import server from "../../src/index"

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name}!`,
  },
}

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  }),
})

const { url } = await startStandaloneServer(testServer, {
  listen: { port: 4000 },
})

it("returns hello with the provided name", async () => {
  const response = await testServer.executeOperation({
    query: "query SayHelloWorld($name: String) { hello(name: $name) }",
    variables: { name: "world" },
  })

  // expect(response.body.singleResult.errors).toBeUndefined()
  // expect(response.body.singleResult.data?.hello).toBe("Hello world!")
})
