const { OGM } = require("@neo4j/graphql-ogm")
import { typeDefs } from "../model/index"
import resolvers from "../api/graphql"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"

export function initialize_models_and_ogm(driver: any) {
  const ogm = new OGM({ typeDefs, driver })
  ogm.init()
  const User = ogm.model("User")
  const Resource = ogm.model("Resource")
  const Tag = ogm.model("Tag")
  const Comment = ogm.model("Comment")
  const Note = ogm.model("Note")

  return { User, Resource, Tag, Comment, Note }
}

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
