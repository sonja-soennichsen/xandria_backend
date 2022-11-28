const depthLimit = require("graphql-depth-limit")
const { ApolloServer } = require("apollo-server-express")
import { create_context, format_error } from "../utils/server_utils"
const { createComplexityLimitRule } = require("graphql-validation-complexity")

export const initialize_server = (schema: any) => {
  return new ApolloServer({
    schema,
    validationRules: [depthLimit(10), createComplexityLimitRule(2000)],
    context: create_context,
    introspection: true,
    playground: true,
    formatError: format_error,
  })
}
