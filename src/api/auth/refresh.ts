const express = require("express")
const router = express.Router()
var jwt = require("jsonwebtoken")
import { Request, Response } from "express"
import { set_cookie } from "../../utils/password_uitls"

router.get("/", async (req: Request, res: Response) => {
  const token = req.cookies["jwt"]

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decode: any) => {
      if (err) {
        return res
          .status(406)
          .json({ message: "Unauthorizied: Invalid token provided" })
      } else {
        set_cookie(decode["sub"], decode["username"], res)
        return res.status(200)
      }
    })
  } catch (e) {
    return e
  }
})

module.exports = router
