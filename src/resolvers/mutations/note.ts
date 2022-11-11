import { Note } from "../../index"
import { checkAuth } from "../../helpers/check"

const addNote = async (
  _source: any,
  { resourceURL, text }: any,
  context: any
) => {
  checkAuth(context)

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
    return
  } catch (e) {
    return e
  }
}

export default {
  addNote,
}
