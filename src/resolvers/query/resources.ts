import { Resource, Tag } from "../../index"
import { checkAuth } from "../../helpers/check"

const getResourcesByTag = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  checkAuth(context)
  const resources = await Resource.find({
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

const getResourceByID = async (
  _source: any,
  { ResourceId }: any,
  context: any
) => {
  checkAuth(context)
  const [resource] = await Resource.find({
    where: {
      id: ResourceId,
    },
  })

  return [resource]
}

const getResourcesRelatedToRelatedTags = async (
  _source: any,
  { tagName }: any,
  context: any
) => {
  checkAuth(context)
  try {
    const tags = await Tag.find({
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
  getResourceByID,
}
