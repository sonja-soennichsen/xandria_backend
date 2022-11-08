import request from "graphql-request"
// https://www.npmjs.com/package/graphql-request
const axios = require("axios")

const signUp = {
  username: "tesUser",
  password: "Ne1nfee!fgew",
  name: "null",
  email: "null@test.de",
}

const login = {
  username: "tesUser",
  password: "Ne1nfeefge!w",
}

let header: {}
it("signs up", async () => {
  await axios
    .post("http://localhost:4000/signup", signUp)
    .then((res: any) => {
      console.log(`Status: ${res.status}`)
      expect(res.status).toBe(200)
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
