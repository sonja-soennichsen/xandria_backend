// import request from "graphql-request"
// // https://www.npmjs.com/package/graphql-request
// const axios = require("axios")

// const data = {
//   username: "tesUser",
//   password: "Ne1nfeefgew",
//   name: "null",
//   email: "null",
// }

// const login = {
//   username: "tesUser",
//   password: "Ne1nfeefgew",
// }

// let header: {}
// it("signs up", async () => {
//    await axios.post("http://localhost:4000/signup", data).then((res: any) => {
//     console.log(`Status: ${res.status}`)
//     expect(res.status).toBe(200)
//   })
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
