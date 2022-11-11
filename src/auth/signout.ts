const express = require("express")
const router = express.Router()
import { signoutConfig } from "../types"
import { Request, Response } from "express"

router.post("/", (req: Request, res: Response) => {
  res.clearCookie("jwt", signoutConfig)
  return res.status(200).json("succesfully signed out")
})

module.exports = router
