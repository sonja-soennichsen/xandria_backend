const express = require("express")
import { typeDefs } from "./types"
const { Neo4jGraphQL } = require("@neo4j/graphql")
import { GraphQLError } from "graphql"
const { ApolloServer, AuthenticationError } = require("apollo-server-express")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
const cookieParser = require("cookie-parser")
var jwt = require("jsonwebtoken")
import resolvers from "./resolvers"
const depthLimit = require("graphql-depth-limit")
const login = require("./auth/login")
const signup = require("./auth/signup")

const app = express()
const corsOptions = {
  origin: [
    "http://localhost:4000",
    "https://studio.apollographql.com",
    "http://localhost:3000",
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

export const neoSchema = new Neo4jGraphQL({
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

export default Promise.all([neoSchema.getSchema(), ogm.init()]).then(
  async ([schema]) => {
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(10)],
      context: async ({ res, req }: any) => {
        try {
          const token = req.cookies["jwt"] || ""
          const userJWT = jwt.verify(token, process.env.JWT_SECRET)
          const [currentUser] = await User.find({
            where: { id: userJWT.sub },
          })

          if (!currentUser) {
            throw new GraphQLError(
              "You are not authorized to perform this action.",
              {
                extensions: {
                  code: "User unauthorized or not found",
                  http: {
                    status: 403,
                  },
                },
              }
            )
          }

          return {
            req,
            res,
            currentUser,
          }
        } catch (e) {
          throw new Error(e)
        }
      },
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
