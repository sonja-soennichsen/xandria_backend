require("dotenv").config()
var jwt = require("jsonwebtoken")

export function getToken(userID: string) {
  return jwt.sign({ sub: userID, username: "testUser" }, "secreeet")
}
