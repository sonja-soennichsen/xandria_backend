import { Tag } from "../../index"
import { GraphQLError } from "graphql"

const relateTag = async (_source: any, { tag1, tag2 }: any, context: any) => {
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
    await Tag.update({
      where: {
        name: tag1,
      },
      connectOrCreate: {
        related: [
          {
            where: {
              node: {
                name: tag2,
              },
            },
            onCreate: {
              node: {
                name: tag2,
              },
            },
          },
        ],
      },
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  relateTag,
}
