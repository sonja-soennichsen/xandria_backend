import { User } from "../../index"
import { checkAuth } from "../../helpers/checkAuth"

const updateUserData = async (
  _source: any,
  { newUsername, name, email }: any,
  context: any
) => {
  checkAuth(context)

  try {
    await User.update({
      where: {
        id: context.currentUser.id,
      },
      update: {
        username: newUsername,
        name: name,
        email: email,
      },
    })
    return "it worked"
  } catch (e) {
    return e
  }
}

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
  updateUserData,
}
