const express = require("express")
const router = express.Router()
import { getSalt, hash } from "../helpers/passwordUtils"
var jwt = require("jsonwebtoken")
import { User } from "../index"
const { passwordStrength } = require("check-password-strength")
import { cookieConfig } from "../types"
import { body, validationResult } from "express-validator"
import { Request, Response } from "express"

router.post(
  "/",
  body("username", "Please provide a username").exists().isString(),
  body("email", "Invalid email").exists().isEmail(),
  body("name", "Please fill in a name").exists().isString(),
  body("password", "Password must be at least 8 characters")
    .exists()
    .isLength({ min: 8 })
    .isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { password, username, name, email } = req.body

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

    const passStrength = passwordStrength(password)
    if (passStrength.id < 3) {
      return res.status(400).json({
        error: `Choose stronger password. Should contain at least a lowercase, uppercase, symbol and a number`,
        data: passStrength,
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

    res.cookie("jwt", token, cookieConfig)

    return res.status(200).json("succesfully signed up")
  }
)

module.exports = router
