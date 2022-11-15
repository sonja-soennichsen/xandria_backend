import { Note } from "../index"
import { checkAuth, checkResourceExists } from "../utils/check"

const addNote = async (
  _source: any,
  { resourceId, text }: any,
  context: any
) => {
  try {
    checkAuth(context)
    await checkResourceExists(resourceId)
    await Note.create({
      input: [
        {
          author: {
            connect: {
              where: {
                node: {
                  id: context.currentUser.id,
                },
              },
            },
          },
          resource: {
            connect: {
              where: {
                node: {
                  id: resourceId,
                },
              },
            },
          },
          text: text,
        },
      ],
    })
    return
  } catch (e) {
    return e
  }
}

const updateNote = async (
  _source: any,
  { noteId, text }: any,
  context: any
) => {
  try {
    checkAuth(context)
    await Note.update({
      where: {
        id: noteId,
      },
      update: {
        text: text,
      },
    })
    return
  } catch (e) {
    return e
  }
}

export default {
  addNote,
  updateNote,
}
