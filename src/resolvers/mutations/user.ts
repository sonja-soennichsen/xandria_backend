import { User } from "../../index"
import { checkAuth } from "../../helpers/checkAuth"
import { compare, hash } from "../../helpers/passwordUtils"
import { GraphQLError } from "graphql"

const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
var jwt = require("jsonwebtoken")

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

const changePassword = async (
  _source: any,
  { oldPassword, newPassword }: any,
  context: any
) => {
  checkAuth(context)

  try {
    const [user] = await User.find({
      where: { id: context.currentUser.id },
    })

    if (compare(oldPassword, user.password, user.salt)) {
      const hashed = hash(newPassword, user.salt)
      await User.update({
        where: {
          id: context.currentUser.id,
        },
        update: {
          password: hashed,
        },
      })
      return "it worked"
    } else {
      throw new GraphQLError("Wrong Password", {
        extensions: {
          code: "Please try again",
          http: {
            status: 406,
          },
        },
      })
    }
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
  changePassword,
}
