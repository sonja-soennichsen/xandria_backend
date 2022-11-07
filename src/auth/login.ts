import express from "express"
const router = express.Router()
import { compare } from "../helpers/passwordUtils"
var jwt = require("jsonwebtoken")
import { User } from "../index"
import { cookieConfig } from "../types"
import { Request, Response } from "express"
const { body } = require("express-validator")

router.post(
  "/",
  body("username", "Please provide a username").isString(),
  body("password", "Password must be at least 8 characters").isString(),
  async (req: any, res: any) => {
    const password: string = req.body.password
    const username: string = req.body.username

    const [user] = await User.find({
      where: { username: username },
    })

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
