import request from "graphql-request"
const axios = require("axios")
import { AxiosError, AxiosResponse } from "axios"
import { clear_database } from "../utils/clear_database"
import { signUp, signUpWrong, login, loginWrong } from "../__mocks__/user"
import {
  addResourceQuery,
  resourceInput,
  resourceQuery,
} from "../__mocks__/resource"
require("dotenv").config()
import { get_token } from "../utils/get_token"

afterAll(async () => {
  await clear_database()
})

describe("testing auth and graphql endpoint", () => {
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
    await axios
      .post("http://localhost:4000/login", login)
      .then((res: any) => {
        expect(res.status).toBe(200)
        expect(res.data).toMatch("logged in")
      })
      .catch((err: any) => {
        expect(err).toBeFalsy
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
    const token = get_token(userID)
    await request({
      url: "http://localhost:4000/graphql",
      document: `query Me {
        me {
          name
          username
        }
      }
      `,
      requestHeaders: { authorization: `Bearer ${token}`, jwt: token },
    }).then((data) => {
      expect(data.me.name).toBe("Test User")
      expect(data.me.username).toBe("testUser")
    })
  })

  it("adds a new resource", async () => {
    const token = get_token(userID)
    await request({
      url: "http://localhost:4000/graphql",
      document: addResourceQuery,
      variables: resourceInput,
      requestHeaders: { authorization: `Bearer ${token}`, jwt: token },
    }).then((data) => {
      expect(data).toBeTruthy
    })
  })

  it("requests resource with token", async () => {
    const token = get_token(userID)
    await request({
      url: "http://localhost:4000/graphql",
      document: resourceQuery,
      requestHeaders: { authorization: `Bearer ${token}`, jwt: token },
    }).then((data) => {
      expect(data.resources[0].headline).toBe("Test Headline")
      expect(data.resources[0].description).toBe("amazing description")
      expect(data.resources[0].url).toBe("example.com/image")
    })
  })
})
