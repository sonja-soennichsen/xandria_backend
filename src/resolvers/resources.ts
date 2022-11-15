import { Resource } from "../index"
import {
  checkAuth,
  checkResourceExists,
  checkDoubleResource,
} from "../utils/check"

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
  checkAuth(context)

  try {
    await checkDoubleResource(url)
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
    return "it worked"
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
    checkAuth(context)
    await checkResourceExists(resourceId)
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
    return
  } catch (e) {
    return e
  }
}

export default {
  addResource,
  addTagToResource,
}
