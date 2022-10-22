import { ApolloServer } from "@apollo/server"
import { signUpData } from "../__mocks__/user"
import { resolvers } from "../../src"
import { addMocksToSchema } from "@graphql-tools/mock"
import { typeDefs } from "../../src/types"
import { makeExecutableSchema } from "@graphql-tools/schema"

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello",
  getUser: () => signUpData,
}

export const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
})
