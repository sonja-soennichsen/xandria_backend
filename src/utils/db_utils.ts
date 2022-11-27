const { OGM } = require("@neo4j/graphql-ogm")
import { typeDefs } from "../model/index"
import resolvers from "../api/graphql"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const neo4j = require("neo4j-driver")

export async function get_driver() {
  let dbURI
  let DEV_AUTH

  if (process.env.NODE_ENV === "test") {
    dbURI = process.env.NEO4J_URI_TEST
    DEV_AUTH = neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD_TEST
    )
  } else {
    dbURI = process.env.NEO4J_URI
    DEV_AUTH = neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD
    )
  }
  return neo4j.driver(dbURI, DEV_AUTH)
}

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
