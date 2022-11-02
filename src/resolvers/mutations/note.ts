const addNote = async (
  _source: any,
  { resourceURL, text }: any,
  context: any
) => {
  if (!context.currentUser) return null
  try {
    await context.Note.create({
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
