const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const depthLimit = require("graphql-depth-limit")
import { createContext } from "./helpers/createContext"
import { initializeDatabase } from "./helpers/intializeDatabase"
import { initializeModels } from "./helpers/initializeModels"

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
  dbURI = process.env.DATABASE_TEST_DB
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
      validationRules: [depthLimit(10)],
      context: createContext,
      introspection: true,
      playground: true,
    })
    await server.start()

    // apply middleware
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })
    app.use(express.urlencoded({ extended: true }))

    // add REST Auth Endpoints
    require("./auth/index")(app)

    // start the whole thing
    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
