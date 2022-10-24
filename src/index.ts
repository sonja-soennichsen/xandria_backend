import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
import { typeDefs } from "./types"
import mutations from "./mutations/index"
import { getUser } from "./helpers/user"
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer } = require("apollo-server")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")

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
  resolvers: mutations,
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
      context: async ({ req }: any) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || ""


        return {
          req,
          User,
          Resource,
        }
      },
    })

    server.listen().then(({ url }: any) => {
      console.log(`🚀 Server ready at ${url}`)
    })
  }
)
