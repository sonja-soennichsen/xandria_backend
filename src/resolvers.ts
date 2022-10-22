import { getSalt, hash, compare } from "./helpers/passwordUtils"
var jwt = require("jsonwebtoken")
import { typeDefs } from "./types"
const { OGM } = require("@neo4j/graphql-ogm")
const neo4j = require("neo4j-driver")
import { driver } from "./index"
import { getUser } from "./helpers/user"

const ogm = new OGM({ typeDefs, driver })
const User = ogm.model("User")

const signUp = async (
  _source: any,
  { username, password, name, email }: any
) => {
  const [existing] = await User.find({
    where: {
      username,
    },
  })

  if (existing) {
    throw new Error(`User with username ${username} already exists!`)
  }

  const salt = getSalt()
  const hashedPassword = hash(password, salt)

  const { user } = await User.create({
    input: [
      {
        username,
        password: hashedPassword,
        salt,
        name,
        role: "User",
        email,
        bookmarks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  })
  return jwt.sign({ sub: user.id, username: username }, "shhhhh")
}

const signIn = async (_source: any, { username, password }: any) => {
  const [user] = await User.find({
    where: {
      username,
    },
  })

  if (!user) {
    throw new Error(`User with username ${username} not found!`)
  }

  const correctPassword = compare(password, user.password, user.salt)

  if (!correctPassword) {
    throw new Error(`Incorrect password for user with username ${username}!`)
  }
  return jwt.sign({ sub: user.id }, "shhhhh")
}

const Mutation = {
  ...signIn,
  ...signUp,
}
export default Mutation
