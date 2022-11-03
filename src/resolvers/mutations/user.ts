import { User } from "../../index"
import { GraphQLError } from "graphql"

const makeBookmark = async (
  _source: any,
  { resourceURL }: any,
  context: any
) => {
  try {
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

    await User.update({
      where: {
        username: context.currentUser.username,
      },
      update: {
        bookmarks: [
          {
            connect: [
              {
                where: {
                  node: {
                    url: resourceURL,
                  },
                },
              },
            ],
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
  makeBookmark,
}
