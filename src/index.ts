const express = require("express")
const neo4j = require("neo4j-driver")
require("dotenv").config()
import { initialize_server } from "./config/server_config"
import { corsOptions } from "./config/static"
import {
  initialize_models,
  get_schema,
  get_credentials,
} from "./config/db_config"
const { OGM } = require("@neo4j/graphql-ogm")
import { typeDefs } from "./model"

const app = express()

const { DB_URI, DEV_AUTH } = get_credentials()
const driver = neo4j.driver(DB_URI, DEV_AUTH)
const ogm = new OGM({ typeDefs, driver })
ogm.init()
export const { User, Resource, Tag, Comment, Note } = initialize_models(ogm)

export default Promise.all([get_schema(driver)]).then(async ([schema]) => {
  const server = initialize_server(schema)
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
