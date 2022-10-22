import { getSalt, hash, compare } from "../helpers/passwordUtils"
var jwt = require("jsonwebtoken")
require("dotenv").config()

const signUp = async (
  _source: any,
  { username, password, name, email }: any,
  context: any
) => {
  const [existing] = await context.User.find({
    where: {
      username,
    },
  })

  if (existing) {
    throw new Error(`User with username ${username} already exists!`)
  }

  const salt = getSalt()
  const hashedPassword = hash(password, salt)

  const { users } = await context.User.create({
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
  return jwt.sign(
    { sub: users[0].id, username: username },
    process.env.JWT_SECRET
  )
}

const signIn = async (
  _source: any,
  { username, password }: any,
  context: any
) => {
  const [user] = await context.User.find({
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
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
}

const addResource = async (
  _source: any,
  {
    headline,
    description,
    url,
    imageURL,
    rootSite,
    author,
    generatedTags,
    userAddedTags,
  }: any,
  context: any
) => {
  const [existing] = await context.Resource.find({
    where: {
      url,
    },
  })

  if (existing) {
    throw new Error(`Resource with url ${url} already exists!`)
  }

  const { resource } = await context.Resource.create({
    input: [
      {
        headline,
        description,
        url,
        imageURL,
        rootSite,
        author,
        generatedTags,
        userAddedTags,
        counter: 0,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString(),
        addedAt: new Date().toISOString(),
      },
    ],
  })
  return "It worked"
}

export default {
  Mutation: {
    signIn,
    signUp,
    addResource,
  },
}
