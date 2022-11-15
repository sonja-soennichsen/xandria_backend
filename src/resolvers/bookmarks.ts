import { User } from "../index"
import { checkAuth } from "../utils/check"
import { checkResourceExists } from "../utils/check"

import fetch from "node-fetch"

const makeBookmark = async (
  _source: any,
  { resourceId }: any,
  context: any
) => {
  try {
    checkAuth(context)

    // const rawResponse = await fetch(
    //   "https://xandria-scraper-2jytui6ygq-ey.a.run.app",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({ url: resourceURL }),
    //   }
    // )
    // const content = await rawResponse.json()

    // console.log(content)

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
                    id: resourceId,
                  },
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
    checkAuth(context)
    await checkResourceExists(resourceId)

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

const makeBookmarkToNewResource = async (
  _source: any,
  { resourceId, resourceUrl, headline }: any,
  context: any
) => {
  try {
    checkAuth(context)

    await User.update({
      where: {
        id: context.currentUser.id,
      },
      connectOrCreate: {
        bookmarks: [
          {
            where: {
              node: {
                id: resourceId,
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

    return
  } catch (e) {
    return e
  }
}

export default {
  makeBookmarkToNewResource,
  makeBookmark,
  removeBookmark,
}
