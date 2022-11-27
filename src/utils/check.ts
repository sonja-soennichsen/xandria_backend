import { GraphQLError } from "graphql"
import { Resource, User } from "../index"
import { resource_by_id, resource_by_url } from "./find"

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

export async function check_resource_exists(id: String) {
  const [exists] = await resource_by_id(id)

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

export async function check_double_resource(url: String) {
  const [existing] = await resource_by_url(url)
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
