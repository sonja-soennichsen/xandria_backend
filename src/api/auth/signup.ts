const express = require("express")
const router = express.Router()
import { get_salt, hash, set_cookie } from "../../utils/password_uitls"
import { User } from "../../index"
const { passwordStrength } = require("check-password-strength")
import { body, validationResult } from "express-validator"
import { Request, Response } from "express"
import { mostCommonPasswords } from "../../config/static"

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

    const existing: any[] = await User.find_by_username(username)

    if ((existing.length = 0)) {
      return res.status(400).json({
        error: `User with username ${username} already exists!`,
      })
    }

    const passStrength = passwordStrength(password)
    if (passStrength.id < 3 || password in mostCommonPasswords) {
      return res.status(400).json({
        error: `Choose stronger password. Should contain at least a lowercase, uppercase, symbol and a number`,
        data: passStrength,
      })
    }

    const salt = get_salt()
    const hashedPassword = hash(password, salt)

    const { users } = await User.create({
      input: [
        {
          username: username.trim(),
          password: hashedPassword,
          salt,
          name: name.trim(),
          role: "User",
          email: email.trim(),
        },
      ],
    })

    set_cookie(users[0].id, username, res)

    return res.status(200).json(users[0].id)
  }
)

module.exports = router
