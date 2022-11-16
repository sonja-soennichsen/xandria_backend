import { typeDefs } from "../api/model/index"
import resolvers from "../api/endpoints/graphql"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"

export async function initialize_database(driver: any) {
  const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    resolvers,
    plugins: {
      auth: new Neo4jGraphQLAuthJWTPlugin({
        secret: process.env.JWT_SECRET,
      }),
      config: {
        auth: {
          isAuthenticated: true,
        },
      },
    },
  })

  return neoSchema.getSchema()
}
