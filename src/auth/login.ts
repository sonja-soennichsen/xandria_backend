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

  const user = await User.find({
    where: { username: username },
  })

  if (!user) {
    throw new Error(`User with username ${username} not found!`)
  }

  const correctPassword = compare(password, user[0].password, user[0].salt)

  if (!correctPassword) {
    throw new Error(`Incorrect password for user with username ${username}!`)
  }

  const token = jwt.sign(
    { sub: user[0].id, username: username },
    process.env.JWT_SECRET
  )

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: "none",
    secure: true,
  })

  return res.json(token)
})
// define the about route
router.get("/signup", (req: any, res: any) => {
  res.send("About birds")
})

module.exports = router
