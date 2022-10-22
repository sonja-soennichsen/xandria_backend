import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
import { typeDefs } from "./types"
import mutation from "./resolvers/mutation"
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer } = require("apollo-server")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
var jwt = require("jsonwebtoken")

export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
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
      secret: process.env.SECRET,
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
