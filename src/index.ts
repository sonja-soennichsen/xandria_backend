const express = require("express")
import { typeDefs } from "./types"
const { Neo4jGraphQL, GraphQLError } = require("@neo4j/graphql")
const { ApolloServer, AuthenticationError } = require("apollo-server-express")
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
const cookieParser = require("cookie-parser")
var jwt = require("jsonwebtoken")
import resolvers from "./mutations"

const app = express()
const corsOptions = {
  origin: ["http://localhost:4000", "https://studio.apollographql.com"],
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

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
})

export default Promise.all([neoSchema.getSchema(), ogm.init()]).then(
  async ([schema]) => {
    const server = new ApolloServer({
      schema,
      context: async ({ res, req }: any) => {
        if (req.url == "/login") {
          return { req, res, User }
        } else {
          const token = req.headers["jwt"] || ""
          const userJWT = jwt.verify(token, process.env.JWT_SECRET)
          const userID = userJWT.sub
          const [currentUser] = await User.find({
            where: { id: userID },
          })
          return {
            req,
            res,
            User,
            Resource,
            currentUser,
          }
        }
      },
      introspection: true,
    })

    await server.start()
    server.applyMiddleware({ app, path: "/graphql", cors: false })
    app.use(express.urlencoded({ extended: true }))

    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
