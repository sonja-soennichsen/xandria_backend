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

export default {
  makeBookmark,
}
