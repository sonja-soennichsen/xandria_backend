import { GraphQLError } from "graphql"

export function checkAuth(context: any) {
  if (!context.currentUser || !context.auth.isAuthenticated) {
    throw new GraphQLError("Please log in or sign up", {
      extensions: {
        code: "User unauthorized or not found",
        http: {
          status: 403,
        },
      },
    })
  }
}

export function checkContextAuth(currentUser: any) {
  if (!currentUser) {
    throw new GraphQLError("Please log in or sign up", {
      extensions: {
        code: "User unauthorized or not found",
        http: {
          status: 403,
        },
      },
    })
  }
}
