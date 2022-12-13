const { scryptSync } = require("node:crypto")
const { randomBytes } = require("node:crypto")
var jwt = require("jsonwebtoken")
import { cookieConfig } from "../config/static"

export function compare(
  inputPassword: string,
  dbPassword: Buffer,
  salt: string
) {
  const hashedPassword = hash(inputPassword, salt)
  const result = dbPassword == hashedPassword

  return result
}

export function hash(inputPassword: string, salt: string) {
  return scryptSync(inputPassword, salt, 64).toString("hex")
}

export function get_salt() {
  const salt = randomBytes(32)
  return salt.toString("ascii")
}

export function set_cookie(id: string, username: string, res: any) {
  const token = jwt.sign(
    { sub: id, username: username },
    process.env.JWT_SECRET
  )

  return res.cookie("jwt", token, cookieConfig)
}
