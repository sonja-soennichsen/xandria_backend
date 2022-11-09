var jwt = require("jsonwebtoken")
import { User } from "../index"
import { checkContextAuth } from "./checkAuth"

// unit test
export async function createContext({ res, req }: any) {
  try {
    const token = req.cookies["jwt"] || "" || req.headers["jwt"]
    console.log("TOKEN", token)
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
}
