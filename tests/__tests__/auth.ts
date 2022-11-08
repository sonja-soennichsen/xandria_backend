import request from "graphql-request"
// https://www.npmjs.com/package/graphql-request
const axios = require("axios")
import { AxiosError, AxiosResponse } from "axios"

const signUp = {
  username: "testUser",
  password: "Ne1nfee!fgew",
  name: "null",
  email: "null@test.de",
}

const signUpWrong = {
  username: "otherUser",
  password: "tooEasy",
  name: "null",
  email: "null@test.de",
}

const login = {
  username: "testUser",
  password: "Ne1nfee!fgew",
}

let header: {}
it("signs up", async () => {
  await axios
    .post("http://localhost:4000/signup", signUp)
    .then((res: AxiosResponse) => {
      expect(res.status).toBe(200)
      expect(res.data).toMatch("succesfully signed up")
    })
    .catch((err: AxiosError) => {
      expect(err).toBeFalsy
    })
})

it("refuses signup with the same username", async () => {
  await axios
    .post("http://localhost:4000/signup", signUp)
    .then((res: any) => {
      expect(res).toBeFalsy
    })
    .catch((err: AxiosError) => {
      // write test for failure here
      expect(err.response?.data).toMatchObject({
        error: "User with username testUser already exists!",
      })
    })
})

it("refuses sign up with bad signup data", async () => {
  await axios
    .post("http://localhost:4000/signup", signUpWrong)
    .then((res: any) => {
      expect(res.status).toBe(400)
    })
    .catch((err: any) => {
      expect(err).toBeTruthy()
    })
})

it("logs in", async () => {
  await axios
    .post("http://localhost:4000/login", login)
    .then((res: any) => {
      expect(res.status).toBe(200)
      expect(res.data).toMatch("logged in")
    })
    .catch((err: any) => {
      // write test for failure here
      console.log(err)
    })
})

// axios(url, {
//   method: 'post',
//   timeout: 1000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: {
//     property: "value",
//   },
// })

// it("logs in", async () => {
//   await axios.post("http://localhost:4000/login", login).then((res: any) => {
//     console.log(`Status: ${res.status}`)
//     expect(res.status).toBe(200)
//   })
// })

// it("requests resource with token", async () => {
//   request({
//     url: "http://localhost:4000/graphql",
//     document: `query Query {
//       resources {
//         headline
//         description
//         url
//       }
//     }`,
//     requestHeaders: header,
//   }).then((data) => {
//     expect(data).toBeTruthy
//   })
// })
