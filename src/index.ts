const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const neo4j = require("neo4j-driver")
require("dotenv").config()
import { initializeDatabase } from "./config/intializeDatabase"
import { initializeModels } from "./config/initializeModels"
import { serverConfig } from "./config/serverConfig"

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

export const { User, Resource, Tag, Comment, Note } = initializeModels(driver)

export default Promise.all([initializeDatabase(driver)]).then(
  async ([schema]) => {
    // initialize and start server
    const server = new ApolloServer({
      schema,
      ...serverConfig,
    })
    await server.start()

    // Add Middleware
    require("./config/middleware")(app)

    // apply middleware to graphql endpoint
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })

    // add REST Auth Endpoints
    require("./auth/index")(app)

    // start the whole thing
    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
