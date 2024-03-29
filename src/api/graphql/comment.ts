import { Comment } from "../../index"
import { check_auth } from "../../utils/check"

const addComment = async (
  _source: any,
  { resourceId, text }: any,
  context: any
) => {
  try {
    check_auth(context)

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
    return true
  } catch (e) {
    return e
  }
}

const deleteComment = async (
  _source: any,
  { commentId }: any,
  context: any
) => {
  try {
    check_auth(context)
    await Comment.delete({
      where: {
        id: commentId,
      },
    })
    return true
  } catch (e) {
    return e
  }
}

export default {
  addComment,
  deleteComment,
}
