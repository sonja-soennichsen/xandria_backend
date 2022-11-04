const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
var jwt = require("jsonwebtoken")
import { User } from "../index"

router.post("/", jsonParser, async (req: any, res: any) => {
  res.clearCookie("jwt", { httpOnly: true })
  return res.status(200).json("succesfully signed out")
})

module.exports = router
