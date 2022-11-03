const express = require("express")
import { typeDefs } from "./types"
const { Neo4jGraphQL, GraphQLError } = require("@neo4j/graphql")
const { ApolloServer, AuthenticationError } = require("apollo-server-express")
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth"
const cors = require("cors")
const neo4j = require("neo4j-driver")
require("dotenv").config()
const { OGM } = require("@neo4j/graphql-ogm")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const cookieParser = require("cookie-parser")
var jwt = require("jsonwebtoken")
import resolvers from "./resolvers"
const depthLimit = require("graphql-depth-limit")
import { compare, hash, getSalt } from "./helpers/passwordUtils"

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
const User = ogm.model("User")
const Resource = ogm.model("Resource")
const Tag = ogm.model("Tag")
const Comment = ogm.model("Comment")
const Note = ogm.model("Note")

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

          return {
            req,
            res,
            User,
            Resource,
            Tag,
            Comment,
            Note,
            currentUser,
          }
        } catch (e) {
          throw new Error(e)
        }
      },
      introspection: true,
      playground: true,
    })

    app.post("/login", jsonParser, async (req: any, res: any) => {
      const password = req.body.password
      const username = req.body.username

      const user = await User.find({
        where: { username: username },
      })

      if (!user) {
        throw new Error(`User with username ${username} not found!`)
      }

      const correctPassword = compare(password, user[0].password, user[0].salt)

      if (!correctPassword) {
        throw new Error(
          `Incorrect password for user with username ${username}!`
        )
      }

      const token = jwt.sign(
        { sub: user[0].id, username: username },
        process.env.JWT_SECRET
      )

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: "none",
        secure: true,
      })

      return res.json(token)
    })

    app.post("/signup", jsonParser, async (req: any, res: any) => {
      const password = req.body.password
      const username = req.body.username
      const name = req.body.name
      const email = req.body.email

      const [existing] = await User.find({
        where: {
          username,
        },
      })

      if (existing) {
        throw new Error(`User with username ${username} already exists!`)
      }

      const salt = getSalt()
      const hashedPassword = hash(password, salt)

      const { users } = await User.create({
        input: [
          {
            username,
            password: hashedPassword,
            salt,
            name,
            role: "User",
            email,
          },
        ],
      })
      const token = jwt.sign(
        { sub: users[0].id, username: username },
        process.env.JWT_SECRET
      )

      return res.json(token)
    })

    await server.start()
    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: false,
    })

    app.use(express.urlencoded({ extended: true }))

    app.listen(4000, () => console.log(`🚀 Server ready at 4000`))
  }
)
