import { ApolloServer, gql } from "apollo-server"
import { Neo4jGraphQL } from "@neo4j/graphql"
import { typeDefs } from "../../src/types"
const neo4j = require("neo4j-driver")

const driver = neo4j.driver(
  "neo4j+s://3af1e591.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "E-r9PlqZMgSwO4JKRwwr5o7nhntIkAK9w3L8dhdoAcU")
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

const serverPromise = neoSchema.getSchema().then((schema: any) => {
  const server = new ApolloServer({
    schema,
  })
  server.listen()
})

export { serverPromise }
