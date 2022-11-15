import { Comment } from "../index"
import { checkAuth } from "../utils/check"

const addComment = async (
  _source: any,
  { resourceId, text }: any,
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
                  id: resourceId,
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
    return
  } catch (e) {
    return e
  }
}

export default {
  addComment,
}
