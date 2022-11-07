const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

router.post("/", jsonParser, async (req: any, res: any) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "none",
    secure: true,
  })
  return res.status(200).json("succesfully signed out")
})

module.exports = router
