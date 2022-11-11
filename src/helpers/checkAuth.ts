import { GraphQLError } from "graphql"
import { Resource } from "../index"

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

export async function checkResourceExists(resourceURL: String) {
  const [exists] = await Resource.find({
    where: { url: resourceURL },
  })

  if (!exists) {
    throw new GraphQLError("Wrong URL provided", {
      extensions: {
        code: "The Resource doesn't exist",
        http: {
          status: 404,
        },
      },
    })
  }
}
