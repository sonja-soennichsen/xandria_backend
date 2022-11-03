import { Comment } from "../../index"
import { checkAuth } from "../../helpers/checkAuth"

const addComment = async (
  _source: any,
  { resourceURL, text }: any,
  context: any
) => {
  try {
    checkAuth(context)

    await Comment.create({
      input: [
        {
          text: text,
          resource: {
            connect: {
              where: {
                node: {
                  url: resourceURL,
                },
              },
            },
          },
          author: {
            connect: {
              where: {
                node: {
                  username: context.currentUser.username,
                },
              },
            },
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
  addComment,
}
