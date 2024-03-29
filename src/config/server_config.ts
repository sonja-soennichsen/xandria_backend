const depthLimit = require("graphql-depth-limit")
const { ApolloServer } = require("apollo-server-express")
const { createComplexityLimitRule } = require("graphql-validation-complexity")
import { User } from "../index"
import { check_context_auth } from "../utils/check"
var jwt = require("jsonwebtoken")
import { format_error } from "../utils/server_utils"
require("dotenv").config()

const intro_flag: boolean = process.env.IS_PROD === "true" ? false : true

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
    introspection: intro_flag,
    formatError: format_error,
  })
}
