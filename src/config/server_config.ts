const depthLimit = require("graphql-depth-limit")
const { ApolloServer } = require("apollo-server-express")
var jwt = require("jsonwebtoken")
import { check_context_auth } from "../utils/check"
import { format_error } from "../utils/error_utils"
const { createComplexityLimitRule } = require("graphql-validation-complexity")
import { User } from "../index"

export const initialize_server = (schema: any) => {
  return new ApolloServer({
    schema,
    validationRules: [depthLimit(10), createComplexityLimitRule(2000)],
    context: async ({ res, req }: any) => {
      try {
        const token = req.cookies["jwt"] || "" || req.headers["jwt"]
        const userJWT = jwt.verify(token, process.env.JWT_SECRET)
        const [currentUser] = await User.find({
          where: { id: userJWT.sub },
        })

        check_context_auth(currentUser)

        return {
          req,
          res,
          currentUser,
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    introspection: false,
    playground: true,
    formatError: format_error,
  })
}
