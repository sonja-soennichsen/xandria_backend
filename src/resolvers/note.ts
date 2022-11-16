import { Note } from "../index"
import { check_auth, check_resource_exists } from "../utils/check"

const addNote = async (
  _source: any,
  { resourceId, text }: any,
  context: any
) => {
  try {
    check_auth(context)
    await check_resource_exists(resourceId)
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
    check_auth(context)
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

const deleteNote = async (_source: any, { noteId }: any, context: any) => {
  try {
    check_auth(context)
    await Note.delete({
      where: {
        id: noteId,
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
  deleteNote,
}
