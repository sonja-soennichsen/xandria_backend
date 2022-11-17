require("dotenv").config()
var jwt = require("jsonwebtoken")

export function get_token(userID: string) {
  return jwt.sign({ sub: userID, username: "testUser" }, "secreeet")
}
