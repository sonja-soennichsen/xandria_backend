const { scryptSync } = require("node:crypto")
const { randomBytes } = require("node:crypto")

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

export function getSalt() {
  const salt = randomBytes(32)
  return salt.toString("ascii")
}
