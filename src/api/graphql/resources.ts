import { Resource } from "../../index"
import {
  check_auth,
  check_resource_exists,
  check_double_resource,
} from "../../utils/check"

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
  check_auth(context)

  try {
    await check_double_resource(url)
    await Resource.create({
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
              onCreate: {
                node: {
                  name: tags,
                },
                edge: {
                  name: tags,
                },
              },
            },
          },
          userAddedTags,
          counter: 0,
          upvotes: 0,
          downvotes: 0,
        },
      ],
    })
    return true
  } catch (e) {
    return e
  }
}

const addTagToResource = async (
  _source: any,
  { resourceId, tagName }: any,
  context: any
) => {
  try {
    check_auth(context)
    await check_resource_exists(resourceId)
    await Resource.update({
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
              edge: {
                name: tagName,
              },
            },
          },
        ],
      },
      where: {
        id: resourceId,
      },
    })
    return true
  } catch (e) {
    return e
  }
}

export default {
  addResource,
  addTagToResource,
}
