const express = require("express")
const { ApolloServer } = require("apollo-server-express")
import cors from "cors"
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
    "https://studio.apollographql.com",
    "https://xandria-2jytui6ygq-ey.a.run.app/",
    "https://xandria-web-joshuaknauber.vercel.app",
    "xandria-web-joshuaknauber.vercel.app",
    "https://studio.apollographql.com",
  ],
  crendentials: true,
}

// app.use(cors(corsOptions))
app.use(cookieParser())

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

    // apply validation and sanitation plugins
    app.use(bodyParser.json())

    // app.use(
    //   helmet({
    //     crossOriginEmbedderPolicy: false,
    //     crossOriginOpenerPolicy: false,
    //     contentSecurityPolicy: false,
    //     crossOriginResourcePolicy: {
    //       policy: "cross-origin",
    //     },
    //   })
    // )

    app.use(express.urlencoded({ extended: true }))

    // add REST Auth Endpoints
    require("./auth/index")(app)

    // apply middleware to graphql endpoint
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: corsOptions,
    })

    // start the whole thing
    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
