const addResource = async (
  _source: any,
  {
    headline,
    description,
    url,
    imageURL,
    rootSite,
    author,
    generatedTags,
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

  console.log(context.auth)

  const { resource } = await context.Resource.create({
    input: [
      {
        headline,
        description,
        url,
        imageURL,
        rootSite,
        author,
        generatedTags,
        userAddedTags,
        counter: 0,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString(),
        addedAt: new Date().toISOString(),
      },
    ],
  })
  return { data: "It worked" }
}

export default {
  addResource,
}
