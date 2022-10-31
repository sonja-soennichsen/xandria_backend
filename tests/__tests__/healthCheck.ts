// import { serverPromise } from "../helpers/mockServer"
// import { gql } from "apollo-server"
// import server from "../../src/index"

// const neo4j = require("neo4j-driver")

// const testQuery = gql`
//   type Query {
//     me: User
//       @cypher(
//         statement: """
//         MATCH (user:User {username: "username111"})
//         RETURN user
//         """
//       )
//   }
// `

// it("runs a healthcheck against graphql schema", async () => {
//   const result = await server.then(serverr =>{
// serverr.makeExecutableSchema()

// })

// //or

// server.makeExecutableSchema(...)

it("tests", () => {
  expect(true).toBe(true)
})
