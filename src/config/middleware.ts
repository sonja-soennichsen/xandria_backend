require("dotenv").config()
const bodyParser = require("body-parser")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
import { corsOptions, helmetOptions } from "./types"
const express = require("express")

module.exports = function (app: any) {
  app.use(cors(corsOptions))
  app.use(helmet(helmetOptions))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: true }))

  app.use("/graphql", (req: any, res: any, next: any) => {
    try {
      const cookie = `Bearer ${req.cookies["jwt"]}`
      req.headers["Authorization"] = cookie
    } catch {
      return res.status(403).json("Please provide JWT Token")
    }
    next()
  })
}
