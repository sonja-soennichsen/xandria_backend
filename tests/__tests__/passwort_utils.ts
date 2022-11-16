import { getSalt, hash, compare } from "../../src/utils/password_checks"
import { Blob } from "buffer"
const { scryptSync } = require("node:crypto")

test("hashes password", () => {
  const manual_hash = scryptSync("password1", "salt", 64).toString("hex")
  const hashed_password = hash("password1", "salt")
  expect(manual_hash == hashed_password).toBe(true)
})

test("hashed password with scrypt", () => {
  const salt = "salt123"
  const password1 = "password123"
  const password2 = "PASSWORD123"
  const hash1 = hash(password1, salt)
  const hash2 = hash(password2, salt)

  expect(compare(password1, hash1, salt)).toBe(true)
  expect(compare(password1, hash2, salt)).toBe(false)
  expect(compare(password2, hash1, salt)).toBe(false)
  expect(compare(password2, hash2, salt)).toBe(true)
})
test("getSalt returns 32 bit string", () => {
  const salt = getSalt()
  let size = new Blob([salt]).size

  expect(salt).toBeDefined
  expect(typeof salt).toBe("string")
  expect(size).toBe(32)
})
