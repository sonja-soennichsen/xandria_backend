import { Resource, Tag } from "../../index"
import { GraphQLError } from "graphql"

const getResourcesByTag = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  if (!context.currentUser) {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "User unauthorized or not found",
        http: {
          status: 403,
        },
      },
    })
  }
  const resources = await Resource.find({
    where: {
      tagsConnection_SOME: {
        node: {
          name: tagName,
        },
      },
    },
  })

  return resources
}

const getResourcesRelatedToRelatedTags = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
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
  try {
    const tags = await Tag.find({
      where: {
        name: tagName,
      },
    })
    return tags
  } catch (e) {
    return e
  }
}

export default {
  getResourcesByTag,
  getResourcesRelatedToRelatedTags,
}
