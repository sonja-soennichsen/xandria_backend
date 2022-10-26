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

const makeBookmark = async (
  _source: any,
  { resourceID }: any,
  context: any
) => {
  const [user] = await context.User.find({
    where: {
      id: context.currentUser.id,
    },
  })

  if (!context.auth.isAuthenticated) {
    throw new Error(`User not found`)
  }

  try {
    const result = await context.driver.run(
      "MATCH (a:User), (b:Resource)  WHERE a.username = $userID AND b.url = $rescourceID  CREATE (a)-[r: BOOKMARKED]->(b) RETURN a,b ",
      { userID: context.currentUser.id, rescourceID: resourceID }
    )
  } catch (e) {
    return e
  }

  return { data: "It worked" }
}

export default {
  addResource,
  makeBookmark,
}
