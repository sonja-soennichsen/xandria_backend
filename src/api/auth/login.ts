import express from "express"
const router = express.Router()
import { compare } from "../../utils/password_uitls"
var jwt = require("jsonwebtoken")
import { User } from "../../index"
import { cookieConfig } from "../../config/static"
import { Request, Response } from "express"
import { user_by_username } from "../../utils/find"
const { body } = require("express-validator")

router.post(
  "/",
  body("username", "Please provide a username").isString(),
  body("password", "Password must be at least 8 characters").isString(),
  async (req: Request, res: Response) => {
    const password: string = req.body.password
    const username: string = req.body.username

    const [user] = await user_by_username(username)

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

    const token = jwt.sign(
      { sub: user.id, username: username },
      process.env.JWT_SECRET
    )

    res.cookie("jwt", token, cookieConfig)

    return res.status(200).json("logged in")
  }
)

module.exports = router
