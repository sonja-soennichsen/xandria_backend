import express from "express"
const router = express.Router()
import { compare } from "../../utils/password_uitls"
import { User } from "../../index"
import { set_cookie } from "../../utils/password_uitls"
import { Request, Response } from "express"
const { body } = require("express-validator")

router.post(
  "/",
  body("username", "Please provide a username").isString(),
  body("password", "Password must be at least 8 characters").isString(),
  async (req: Request, res: Response) => {
    const password: string = req.body.password
    const username: string = req.body.username

    const [user] = await User.find_by_username(username)

    if (!user) {
      return res.status(404).json({
        error: `User with username ${username} not found!`,
      })
    }

    const correctPassword = compare(password, user.password, user.salt)

    if (!correctPassword) {
      return res.status(401).json({
        error: `Incorrect password for user with username ${username}!`,
      })
    }

    set_cookie(user.id, username, res)

    return res.status(200).json("logged in")
  }
)

module.exports = router
