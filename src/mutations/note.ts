const addNote = async (
  _source: any,
  { resourceURL, text }: any,
  context: any
) => {
  try {
    await context.Note.create({
      input: [
        {
          text: text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
