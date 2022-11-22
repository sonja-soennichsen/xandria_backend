import { User, Resource } from "../../index"
import { check_auth, check_resource_exists } from "../../utils/check"
import { fetch_scraper } from "../../utils/fetch_scraper"
const fetch = require("@adobe/node-fetch-retry")

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
  { resourceUrl }: any,
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
      const content = await fetch_scraper(resourceUrl)

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
                  headline: content["headline"],
                  description: content["description"],
                  url: content["url"],
                  imageURL: content["imageURL"],
                  rootSite: content["rootSite"],
                  author: content["author"],
                },
                edge: {
                  userAddedTags: [],
                },
              },
            },
          ],
        },
      })

      content["tags"].map(async (tag: string) => {
        await Resource.update({
          connectOrCreate: {
            tags: [
              {
                where: {
                  node: {
                    name: tag,
                  },
                },
                onCreate: {
                  node: {
                    name: tag,
                  },
                  edge: {
                    name: tag,
                  },
                },
              },
            ],
          },
          where: {
            url: resourceUrl,
          },
        })
      })
    }

    return true
  } catch (e) {
    return e
  }
}

export default {
  makeBookmarkFromUrl,
  makeBookmark,
  removeBookmark,
}
