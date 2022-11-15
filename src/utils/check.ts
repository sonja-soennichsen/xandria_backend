import { GraphQLError } from "graphql"
import { Resource, User } from "../index"
import { UserInputError } from "apollo-server"

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

export async function checkResourceExists(resourceId: String) {
  const [exists] = await Resource.find({
    where: { id: resourceId },
  })

  if (!exists) {
    throw new GraphQLError("Wrong ID provided", {
      extensions: {
        code: "The Resource doesn't exist",
        http: {
          status: 404,
        },
      },
    })
  }
}

export async function checkDoubleResource(resourcceUrl: String) {
  const [existing] = await Resource.find({
    where: {
      resourcceUrl,
    },
  })
  if (existing) {
    throw new GraphQLError("Resoure already exists", {
      extensions: {
        code: "The id to resource already exists",
        http: {
          status: 404,
        },
      },
    })
  }
}
