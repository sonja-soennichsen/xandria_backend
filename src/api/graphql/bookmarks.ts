import { User, Resource } from "../../index"
import { check_auth, check_resource_exists } from "../../utils/check"

const makeBookmark = async (
  _source: any,
  { resourceId, userAddedTags }: any,
  context: any
) => {
  try {
    check_auth(context)

    await User.update({
      where: {
        id: context.currentUser.id,
      },
      update: {
        bookmarks: [
          {
            connect: [
              {
                where: {
                  node: {
                    id: resourceId,
                  },
                },
                edge: {
                  userAddedTags: userAddedTags,
                },
              },
            ],
          },
        ],
      },
    })

    return
  } catch (e) {
    return e
  }
}

const removeBookmark = async (
  _source: any,
  { resourceId }: any,
  context: any
) => {
  try {
    check_auth(context)
    await check_resource_exists(resourceId)

    await User.update({
      where: {
        id: context.currentUser.id,
      },
      disconnect: {
        bookmarks: [
          {
            where: {
              node: {
                id: resourceId,
              },
            },
          },
        ],
      },
    })

    return
  } catch (e) {
    return e
  }
}

const makeBookmarkFromUrl = async (
  _source: any,
  { resourceUrl, headline }: any,
  context: any
) => {
  try {
    check_auth(context)

    const [existing] = await Resource.find({
      where: {
        url: resourceUrl,
      },
    })

    if (existing) {
      await User.update({
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
                      url: resourceUrl,
                    },
                  },
                },
              ],
            },
          ],
        },
      })
    } else {
      // fetch scraper

      // make bookmarkgit
      await User.update({
        where: {
          id: context.currentUser.id,
        },
        connectOrCreate: {
          bookmarks: [
            {
              where: {
                node: {
                  url: resourceUrl,
                },
              },
              onCreate: {
                node: {
                  headline: headline,
                  description: "null",
                  url: resourceUrl,
                  imageURL: "null",
                  rootSite: "null",
                  userAddedTags: ["tag"],
                  author: "null",
                },
              },
            },
          ],
        },
      })
    }

    return
  } catch (e) {
    return e
  }
}

export default {
  makeBookmarkFromUrl,
  makeBookmark,
  removeBookmark,
}
