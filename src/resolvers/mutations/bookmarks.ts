import { User } from "../../index"
import { checkAuth } from "../../helpers/checkAuth"

const makeBookmark = async (
  _source: any,
  { resourceURL }: any,
  context: any
) => {
  try {
    checkAuth(context)

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
                    url: resourceURL,
                  },
                },
              },
            ],
          },
        ],
      },
    })

    return "it worked"
  } catch (e) {
    return e
  }
}

const makeBookmarkToNewResource = async (
  _source: any,
  { resourceURL, headline }: any,
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
                url: resourceURL,
              },
            },
            onCreate: {
              node: {
                headline: headline,
                description: "null",
                url: resourceURL,
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
}