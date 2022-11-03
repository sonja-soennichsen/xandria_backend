import { Note } from "../../index"
import { GraphQLError } from "graphql"

const addNote = async (
  _source: any,
  { resourceURL, text }: any,
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
    await Note.create({
      input: [
        {
          text: text,
          resource: {
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
          author: {
            connect: [
              {
                where: {
                  node: {
                    username: context.currentUser.username,
                  },
                },
              },
            ],
          },
        },
      ],
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  addNote,
}
