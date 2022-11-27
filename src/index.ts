const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const neo4j = require("neo4j-driver")
require("dotenv").config()
import { server_config } from "./config/server_config"
import { corsOptions } from "./config/static"
import {
  initialize_models_and_ogm,
  get_schema,
  get_credentials,
} from "./utils/db_utils"

const app = express()

const { DB_URI, DEV_AUTH } = get_credentials()
const driver = neo4j.driver(DB_URI, DEV_AUTH)

export const { User, Resource, Tag, Comment, Note } =
  initialize_models_and_ogm(driver)

export default Promise.all([get_schema(driver)]).then(async ([schema]) => {
  const server = new ApolloServer({
    schema,
    ...server_config,
  })
  await server.start()

  require("./config/middleware")(app)
  require("./config/logger")(app)
  require("./api/auth")(app)

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: corsOptions,
  })

  app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
})
