import { GraphQLError } from "graphql"

export function checkAuth(context: any) {
  if (!context.currentUser || !context.auth.isAuthenticated) {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "User unauthorized or not found",
        http: {
          status: 403,
        },
      },
    })
  }
}
