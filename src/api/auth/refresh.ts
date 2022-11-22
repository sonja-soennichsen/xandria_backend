const express = require("express")
const router = express.Router()
var jwt = require("jsonwebtoken")
import { cookieConfig } from "../../config/static"
import { Request, Response } from "express"
import { create_logger } from "../../utils/logger_helper"
const logger = create_logger()

router.get("/", async (req: Request, res: Response) => {
  const token = req.cookies["jwt"]

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decode: any) => {
      if (err) {
        logger.error("Unauthorized attempt to refresh token")

        return res
          .status(406)
          .json({ message: "Unauthorizied: Invalid token provided" })
      } else {
        const token = jwt.sign(
          { sub: decode["sub"], username: decode["username"] },
          process.env.JWT_SECRET
        )

        res.cookie("jwt", token, cookieConfig)

        return res.status(200)
      }
    })
  } catch (e) {
    return e
  }
})

module.exports = router
