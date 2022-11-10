const depthLimit = require("graphql-depth-limit")
import { ApolloError } from "apollo-server-express"
var jwt = require("jsonwebtoken")
import { User } from "../index"
import { checkContextAuth } from "../helpers/checkAuth"

export const serverConfig = {
  validationRules: [depthLimit(10)],
  context: async ({ res, req }: any) => {
    try {
      const token = req.cookies["jwt"] || "" || req.headers["jwt"]
      console.log(req.headers)
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
    // Otherwise return the original error
    return err
  },
}
