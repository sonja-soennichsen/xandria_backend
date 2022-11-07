const express = require("express")
const router = express.Router()
import { signoutConfig } from "../types"

router.post("/", (req: any, res: any) => {
  res.clearCookie("jwt", signoutConfig)
  return res.status(200).json("succesfully signed out")
})

module.exports = router
