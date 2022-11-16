const depthLimit = require("graphql-depth-limit")
import { ApolloError } from "apollo-server-express"
var jwt = require("jsonwebtoken")
import { User } from "../index"
import { checkContextAuth } from "../utils/check"
const { createComplexityLimitRule } = require("graphql-validation-complexity")
import { GraphQLResponse, GraphQLRequestContext } from "apollo-server-core"

export const serverConfig = {
  validationRules: [depthLimit(10), createComplexityLimitRule(2000)],
  context: async ({ res, req }: any) => {
    try {
      const token = req.cookies["jwt"] || "" || req.headers["jwt"]
      const userJWT = jwt.verify(token, process.env.JWT_SECRET)
      const [currentUser] = await User.find({
        where: { id: userJWT.sub },
      })

      checkContextAuth(currentUser)

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
  formatError: (err: ApolloError) => {
    // Don't give the specific errors to the client
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error -> Custom ;)")
    }
    if (err.message.startsWith("Context creation failed: JsonWebTokenError")) {
      return new Error(
        "Context creation failed: JsonWebTokenError: jwt must be provided custom"
      )
    }
    // Otherwise return the original error
    return err
  },
}
