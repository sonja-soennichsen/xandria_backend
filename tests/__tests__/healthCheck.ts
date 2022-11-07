import request from "graphql-request"
// https://www.npmjs.com/package/graphql-request

console.log(process.env.NODE_ENV)

it("requests resources", async () => {
  request({
    url: "http://localhost:4000/graphql/login",
    document: `query Query {
      resources {
        headline
        description
        url
      }
    }`,
    requestHeaders: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMjg2MWM5Zi1hYTg1LTQyMDItYTI4Ni0xNmFjODZkNzc5N2MiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTExIiwiaWF0IjoxNjY3MzA2Mjk1fQ.CPMSgJ6U82decN40N8uZT1vWdzW7DyRhJ4px57pjqoA",
    },
  }).then((data) => expect(data).toBeTruthy)
})
