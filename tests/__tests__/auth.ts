import request from "graphql-request"
// https://www.npmjs.com/package/graphql-request
const axios = require("axios")
import { AxiosError, AxiosResponse } from "axios"
import { clearDatabase } from "../helpers/clearDatabase"
import { signUp, signUpWrong, login, loginWrong } from "../__mocks__/user"
require("dotenv").config()
import { getToken } from "../helpers/getToken"

afterAll(async () => {
  clearDatabase()
})

describe("testing auth functionns", () => {
  let headers = ""
  let userID = ""

  test("signs up", async () => {
    await axios
      .post("http://localhost:4000/signup", signUp)
      .then((res: AxiosResponse) => {
        expect(res.status).toBe(200)
        userID = res.data
      })
      .catch((err: AxiosError) => {
        expect(err).toBeFalsy
      })
  })

  test("refuses signup with the same username", async () => {
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

  test("refuses sign up with bad signup data", async () => {
    await axios
      .post("http://localhost:4000/signup", signUpWrong)
      .then((res: any) => {
        expect(res.status).toBe(400)
      })
      .catch((err: any) => {
        expect(err).toBeTruthy()
      })
  })

  test("logs in", async () => {
    process.env.JWT = "TEST"
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

  test("refuse login with wrong credentials", async () => {
    await axios
      .post("http://localhost:4000/login", loginWrong)
      .then((res: any) => {
        expect(res.status).toBe(400)
      })
      .catch((err: any) => {
        expect(err).toBeTruthy()
      })
  })

  test("get user data", async () => {
    const token = getToken(userID)
    await request({
      url: "http://localhost:4000/graphql",
      document: `query Me {
        me {
          email
          name
          username
        }
      }
      `,
      requestHeaders: { authorization: `Bearer ${token}`, jwt: token },
    }).then((data) => {
      expect(data.me.email).toBe("null@test.de")
      expect(data.me.name).toBe("Test User")
      expect(data.me.username).toBe("testUser")
    })
  })

  // it("requests resource with token", async () => {
  //   const token = getToken(userID)
  //   request({
  //     url: "http://localhost:4000/graphql",
  //     document: `query Query {
  //       resources {
  //         headline
  //         description
  //         url
  //       }
  //     }`,
  //     requestHeaders: { authorization: `Bearer ${token}`, jwt: token },
  //   }).then((data) => {
  //     expect(data).toBeTruthy
  //   })
  // })
})

// it("works", () => {
//   expect(true).toBe(true)
// })
