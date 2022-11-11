const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const cookieParser = require("cookie-parser")
import { initializeDatabase } from "./config/intializeDatabase"
import { initializeModels } from "./config/initializeModels"
import { serverConfig } from "./config/serverConfig"
const bodyParser = require("body-parser")
const helmet = require("helmet")

const app = express()
const corsOptions = {
  origin: [
    "http://localhost:4000",
    "https://studio.apollographql.com",
    "http://localhost:3000",
    "https://xandria-2jytui6ygq-ey.a.run.app/",
  ],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())

let dbURI
let NEO4J_USER
let NEO4J_PASSWORD
let DEV_AUTH

if (process.env.NODE_ENV === "development") {
  dbURI = process.env.NEO4J_URI
  NEO4J_USER = process.env.NEO4J_USER
  NEO4J_PASSWORD = process.env.NEO4J_PASSWORD
  DEV_AUTH = neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
}
if (process.env.NODE_ENV === "test") {
  dbURI = process.env.NEO4J_URI_TEST
  NEO4J_USER = process.env.NEO4J_USER
  NEO4J_PASSWORD = process.env.NEO4J_PASSWORD_TEST
  DEV_AUTH = neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
}

export const driver = neo4j.driver(dbURI, DEV_AUTH)

export const { User, Resource, Tag, Comment, Note } = initializeModels(driver)

export default Promise.all([initializeDatabase(driver)]).then(
  async ([schema]) => {
    // rewrite request to include JWT
    app.use("/graphql", (req: any, res: any, next: any) => {
      try {
        const cookie = `Bearer ${req.cookies["jwt"]}`
        req.headers["Authorization"] = cookie
      } catch {
        return res.status(403).json("Please provide JWT Token")
      }
      next()
    })

    // initialize and start server
    const server = new ApolloServer({
      schema,
      ...serverConfig,
    })
    await server.start()

    // Apply Validation and Sanitation Plugins
    app.use(bodyParser.json())
    // app.use(helmet())

    // apply middleware
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())

    // add REST Auth Endpoints
    require("./auth/index")(app)

    // start the whole thing
    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
