const express = require("express")
import { typeDefs } from "./types"
const { Neo4jGraphQL } = require("@neo4j/graphql")
const { ApolloServer, AuthenticationError } = require("apollo-server-express")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
const cookieParser = require("cookie-parser")
var jwt = require("jsonwebtoken")
import resolvers from "./mutations"

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

export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const ogm = new OGM({ typeDefs, driver })
const User = ogm.model("User")
const Resource = ogm.model("Resource")
const Tag = ogm.model("Tag")
const Comment = ogm.model("Comment")

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

export default Promise.all([neoSchema.getSchema(), ogm.init()]).then(
  async ([schema]) => {
    const server = new ApolloServer({
      schema,
      context: async ({ res, req }: any) => {
        if (req.url == "/login") {
          //console.log("login")
          return { req, res, User }
        } else {
          try {
            const token = req.cookies["jwt"] || ""
            const userJWT = jwt.verify(token, process.env.JWT_SECRET)
            const [currentUser] = await User.find({
              where: { id: userJWT.sub },
            })

            return {
              req,
              res,
              driver,
              User,
              Resource,
              Tag,
              Comment,
              currentUser,
            }
          } catch (e) {
            throw new AuthenticationError(
              "Authentication token is invalid, please log in"
            )
          }
        }
      },
      introspection: true,
      playground: true,
    })

    await server.start()
    server.applyMiddleware({ app, path: "/graphql", cors: false })
    app.use(express.urlencoded({ extended: true }))

    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
