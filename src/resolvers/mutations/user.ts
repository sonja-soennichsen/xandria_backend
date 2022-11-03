import { User } from "../../index"

const makeBookmark = async (
  _source: any,
  { resourceURL }: any,
  context: any
) => {
  try {
    if (!context.currentUser) return null
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

export default {
  makeBookmark,
}
