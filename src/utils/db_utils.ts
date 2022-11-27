const { OGM } = require("@neo4j/graphql-ogm")
import { typeDefs } from "../model/index"
import resolvers from "../api/graphql"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const neo4j = require("neo4j-driver")

export function initialize_models(ogm: any) {
  const User = ogm.model("User")
  const Resource = ogm.model("Resource")
  const Tag = ogm.model("Tag")
  const Comment = ogm.model("Comment")
  const Note = ogm.model("Note")

  return { User, Resource, Tag, Comment, Note }
}

export async function get_schema(driver: any) {
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

export function get_credentials() {
  let DB_URI
  let DEV_AUTH

  if (process.env.NODE_ENV === "test") {
    DB_URI = process.env.NEO4J_URI_TEST
    DEV_AUTH = neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD_TEST
    )
  } else {
    DB_URI = process.env.NEO4J_URI
    DEV_AUTH = neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD
    )
  }

  return { DB_URI, DEV_AUTH }
}
