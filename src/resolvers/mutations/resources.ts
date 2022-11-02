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
  if (!context.currentUser) return null
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
        },
      ],
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

const addTagToResource = async (
  _source: any,
  { resourceURL, tagName }: any,
  context: any
) => {
  if (!context.currentUser) return null
  const [existing] = await context.Resource.find({
    where: {
      url: resourceURL,
    },
  })

  if (!existing) {
    throw new Error(`Resource doesn't exist`)
  }

  try {
    await context.Resource.update({
      connectOrCreate: {
        tags: [
          {
            where: {
              node: {
                name: tagName,
              },
            },
            onCreate: {
              node: {
                name: tagName,
              },
            },
          },
        ],
      },
      where: {
        url: resourceURL,
      },
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

export default {
  addResource,
  addTagToResource,
}
