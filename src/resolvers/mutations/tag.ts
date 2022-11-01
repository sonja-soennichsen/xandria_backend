const relateTag = async (_source: any, { tag1, tag2 }: any, context: any) => {
  if (!context.currentUser) return null
  try {
    await context.Tag.update({
      where: {
        name: tag1,
      },
      connectOrCreate: {
        related: [
          {
            where: {
              node: {
                name: tag2,
              },
            },
            onCreate: {
              node: {
                name: tag2,
              },
            },
          },
        ],
      },
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  relateTag,
}
