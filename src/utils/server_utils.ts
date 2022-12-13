import { ApolloError } from "apollo-server-express"

export const format_error = (err: ApolloError) => {
  if (err.message.startsWith("Expected")) {
    return new Error("Internal server error -  Malformed Database Source")
  }
  if (err.message.startsWith("Context creation failed: JsonWebTokenError")) {
    return new Error(
      "Context creation failed: JsonWebTokenError: jwt must be provided"
    )
  }
  return err
}
