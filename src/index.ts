const express = require("express")
import { typeDefs } from "./types"
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer } = require("apollo-server-express")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
const cookieParser = require("cookie-parser")
import resolvers from "./resolvers"
const depthLimit = require("graphql-depth-limit")
const login = require("./auth/login")
const signup = require("./auth/signup")
import { createContext } from "./helpers/createContext"
import { initializeDatabase } from "./helpers/intializeDatabase"

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

// if running the test replace env with docker container thingies
// docker container setting up database that is destroyed after tests
// test would act like frontend
// send post request to localhost server and checks response
// between each test run -> clean up db
// how to call resolver function?
export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const ogm = new OGM({ typeDefs, driver })
export const User = ogm.model("User")
export const Resource = ogm.model("Resource")
export const Tag = ogm.model("Tag")
export const Comment = ogm.model("Comment")
export const Note = ogm.model("Note")

export default Promise.all([initializeDatabase(driver), ogm.init()]).then(
  async ([schema]) => {
    app.use("/graphql", (req: any, res: any, next: any) => {
      const cookie = `Bearer ${req.cookies["jwt"]}`
      req.headers["Authorization"] = cookie

      next()
    })

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)],
      context: async ({ res, req }: any) => createContext({ res, req }),
      introspection: true,
      playground: true,
    })

    await server.start()
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })

    app.use("/login", login)
    app.use("/signup", signup)

    app.use(express.urlencoded({ extended: true }))

    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
