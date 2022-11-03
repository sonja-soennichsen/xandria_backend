import { GraphQLError } from "graphql"
var jwt = require("jsonwebtoken")
import { User } from "../index"

export async function createContext({ res, req }: any) {
  try {
    const token = req.cookies["jwt"] || ""
    const userJWT = jwt.verify(token, process.env.JWT_SECRET)
    const [currentUser] = await User.find({
      where: { id: userJWT.sub },
    })

    if (!currentUser) {
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "User unauthorized or not found",
          http: {
            status: 403,
          },
        },
      })
    }

    return {
      req,
      res,
      currentUser,
    }
  } catch (e) {
    throw new Error(e)
  }
}
