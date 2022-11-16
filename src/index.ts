const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const neo4j = require("neo4j-driver")
require("dotenv").config()
import { server_config } from "./config/server_config"
import { initialize_database, initialize_models } from "./utils/initialize_db"

const app = express()

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

const driver = neo4j.driver(dbURI, DEV_AUTH)

// put initalize
export const { User, Resource, Tag, Comment, Note } = initialize_models(driver)

export default Promise.all([initialize_database(driver)]).then(
  async ([schema]) => {
    const server = new ApolloServer({
      schema,
      ...server_config,
    })
    await server.start()

    require("./config/middleware")(app)
    require("./api/endpoints/auth")(app)

    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })

    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
