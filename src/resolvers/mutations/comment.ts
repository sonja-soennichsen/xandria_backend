const addComment = async (
  _source: any,
  { resourceURL, text }: any,
  context: any
) => {
  try {
    if (!context.currentUser) return null
    await context.Comment.create({
      input: [
        {
          text: text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
