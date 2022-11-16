import { User } from "../../index"
import { check_auth } from "../../utils/check"
import { compare, hash } from "../../utils/password_checks"
import { GraphQLError } from "graphql"

const updateUserData = async (
  _source: any,
  { newUsername, name, email }: any,
  context: any
) => {
  try {
    check_auth(context)
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
  try {
    check_auth(context)

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
      return "password updated"
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

export default {
  updateUserData,
  changePassword,
}
