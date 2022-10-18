import { gql } from "apollo-server";
// const { ApolloServer, gql } = require("apollo-server");
import server from "../src/index";

it("runs a health against our graphql schema", async () => {
  let result = await server.executeOperation({
    query: gql`
      query {
        test(bool: false)
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result).toHaveProperty("data");
  expect(result.errors).toBeFalsy();
  expect(result.data?.test).toEqual(false);

  result = await server.executeOperation({
    query: gql`
      query {
        test(bool: invalidArgument)
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeTruthy();
});

it("should validate user info correctly", async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation {
        login(
          credentials: {
            email: "bob@gmail.com"
            username: "helloworld"
            password: ""
          }
        )
      }
    `,
  });
  expect(result).toBeTruthy();
  expect(result.errors).toBeTruthy();
});