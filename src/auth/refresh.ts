const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
var jwt = require("jsonwebtoken")
import { User } from "../index"
import { cookieConfig } from "../types"

router.get("/", jsonParser, async (req: any, res: any) => {
  const token = req.cookies["jwt"]

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decode: any) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: "Unauthorized" })
      } else {
        const token = jwt.sign(
          { sub: decode["sub"], username: decode["username"] },
          process.env.JWT_SECRET
        )

        res.cookie("jwt", token, cookieConfig)

        return res.status(200).json(decode["sub"])
      }
    })
  } catch (e) {
    return e
  }
})

module.exports = router
