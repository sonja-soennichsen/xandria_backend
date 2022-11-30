import { ApolloError } from "apollo-server-express"
import { User } from "../index"
import { check_context_auth } from "../utils/check"
var jwt = require("jsonwebtoken")

export const format_error = (err: ApolloError) => {
  if (err.message.startsWith("Expected")) {
    return new Error("Internal server error -  Malformed Database Source")
  }
  if (err.message.startsWith("Context creation failed: JsonWebTokenError")) {
    return new Error(
      "Context creation failed: JsonWebTokenError: jwt must be provided"
    )
  }
  return err
}

export const create_context = async ({ res, req }: any) => {
  try {
    const token = req.cookies["jwt"] || "" || req.headers["jwt"]
    const userJWT = jwt.verify(token, process.env.JWT_SECRET)
    const [currentUser] = await User.find_by_id(userJWT.sub)

    check_context_auth(currentUser)

    return {
      req,
      res,
      currentUser,
    }
  } catch (e) {
    throw new Error(e)
  }
}
