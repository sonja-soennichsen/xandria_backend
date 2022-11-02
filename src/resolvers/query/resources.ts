const getResourcesByTag = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  const resources = await context.Resource.find({
    where: {
      tagsConnection_SOME: {
        node: {
          name: tagName,
        },
      },
    },
  })

  return resources
}

const getResourcesRelatedToRelatedTags = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  if (!context.currentUser) return null

  try {
    const tags = await context.Tag.find({
      where: {
        name: tagName,
      },
    })
    return tags
  } catch (e) {
    return e
  }
}

export default {
  getResourcesByTag,
  getResourcesRelatedToRelatedTags,
}
