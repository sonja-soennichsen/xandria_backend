import jwt_decode from "jwt-decode"

export function getUser(token: string) {
  var decoded = jwt_decode(token)
  console.log(decoded)
}
