const addResource = async (
  _source: any,
  {
    headline,
    description,
    url,
    imageURL,
    rootSite,
    author,
    tags,
    userAddedTags,
  }: any,
  context: any
) => {
  const [existing] = await context.Resource.find({
    where: {
      url,
    },
  })

  if (existing) {
    throw new Error(`Resource with url ${url} already exists!`)
  }

  try {
    await context.Resource.create({
      input: [
        {
          headline,
          description,
          url,
          imageURL,
          rootSite,
          author,
          tags: {
            connectOrCreate: {
              where: { node: { name: tags } },
              onCreate: { node: { name: tags } },
            },
          },
          userAddedTags,
          counter: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

const makeBookmark = async (
  _source: any,
  { resourceURL }: any,
  context: any
) => {
  try {
    await context.User.update({
      where: {
        username: context.currentUser.username,
      },
      update: {
        bookmarks: [
          {
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
        ],
      },
    })

    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  addResource,
  makeBookmark,
}
