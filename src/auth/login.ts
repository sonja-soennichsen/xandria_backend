const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
import { compare } from "../helpers/passwordUtils"
var jwt = require("jsonwebtoken")
import { User } from "../index"

router.post("/", jsonParser, async (req: any, res: any) => {
  const password = req.body.password
  const username = req.body.username

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

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "none",
    secure: true,
  })

  return res.json(token)
})

module.exports = router
