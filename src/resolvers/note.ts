import { Note } from "../index"
import { checkAuth, checkResourceExists } from "../utils/check"

const addNote = async (
  _source: any,
  { resourceId, text }: any,
  context: any
) => {
  checkAuth(context)

  try {
    await checkResourceExists(resourceId)
    await Note.create({
      input: [
        {
          text: text,
          resource: {
            connect: [
              {
                where: {
                  node: {
                    id: resourceId,
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
    return
  } catch (e) {
    return e
  }
}

export default {
  addNote,
}
