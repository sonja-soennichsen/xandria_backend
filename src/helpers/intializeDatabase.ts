import { typeDefs } from "../models"
import resolvers from "../resolvers"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"

export async function initializeDatabase(driver: any) {
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
