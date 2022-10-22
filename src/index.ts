import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
import { typeDefs } from "./types"
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer } = require("apollo-server")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
var jwt = require("jsonwebtoken")
import { compare, hash, getSalt } from "./helpers/passwordUtils"
import { startStandaloneServer } from "@apollo/server/standalone"
import { addMocksToSchema } from "@graphql-tools/mock"
import { makeExecutableSchema } from "@graphql-tools/schema"
import mutation from "./resolvers/mutation"

export const driver = neo4j.driver(
  "neo4j+s://3af1e591.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "E-r9PlqZMgSwO4JKRwwr5o7nhntIkAK9w3L8dhdoAcU")
)

const ogm = new OGM({ typeDefs, driver })
const User = ogm.model("User")
const Resource = ogm.model("Resource")

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers: mutation,
  plugins: {
    auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: "secret",
    }),
  },
})

export default Promise.all([neoSchema.getSchema(), ogm.init()]).then(
  ([schema]) => {
    const server = new ApolloServer({
      schema,
      context: ({ req }: any) => ({
        req,
        User,
        Resource,
      }),
    })

    server.listen().then(({ url }: any) => {
      console.log(`🚀 Server ready at ${url}`)
    })
  }
)
