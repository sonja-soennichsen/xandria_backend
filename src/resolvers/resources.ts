import { Resource } from "../index"
import { checkAuth } from "../utils/check"
import { UserInputError } from "apollo-server"

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

  const [existing] = await Resource.find({
    where: {
      url,
    },
  })
  if (existing) {
    return new UserInputError("Resource already exisits")
  }

  try {
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
  { resourceURL, tagName }: any,
  context: any
) => {
  checkAuth(context)
  const [existing] = await Resource.find({
    where: {
      url: resourceURL,
    },
  })

  if (!existing) {
    throw new Error(`Resource doesn't exist`)
  }

  try {
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
        url: resourceURL,
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
