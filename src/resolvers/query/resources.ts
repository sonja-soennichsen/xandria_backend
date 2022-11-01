const getResourcesByTag = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  const [resources] = await context.Resource.find({
    where: {
      tagsConnection_SOME: {
        node: {
          name: tagName,
        },
      },
    },
  })

  console.log(resources)
  return [resources]
}

export default {
  getResourcesByTag,
}
