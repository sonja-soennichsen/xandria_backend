const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
import { getSalt, hash } from "../helpers/passwordUtils"
var jwt = require("jsonwebtoken")
import { User } from "../index"

router.post("/", jsonParser, async (req: any, res: any) => {
  const password = req.body.password
  const username = req.body.username
  const name = req.body.name
  const email = req.body.email

  const [existing] = await User.find({
    where: {
      username,
    },
  })

  if (existing) {
    return res.status(400).json({
      error: `User with username ${username} already exists!`,
    })
  }

  const salt = getSalt()
  const hashedPassword = hash(password, salt)

  const { users } = await User.create({
    input: [
      {
        username,
        password: hashedPassword,
        salt,
        name,
        role: "User",
        email,
      },
    ],
  })
  const token = jwt.sign(
    { sub: users[0].id, username: username },
    process.env.JWT_SECRET
  )

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "none",
    secure: true,
  })

  return res.status(200).json(token)
})

module.exports = router
