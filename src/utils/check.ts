import { GraphQLError } from "graphql"
import { Resource, User } from "../index"

export function check_auth(context: any) {
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

export function check_context_auth(currentUser: any) {
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

export async function check_resource_exists(resourceId: String) {
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

export async function check_double_resource(resourceUrl: String) {
  const [existing] = await Resource.find({
    where: {
      url: resourceUrl,
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
