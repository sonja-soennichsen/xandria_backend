const { gql } = require("apollo-server")

export const typeDefs = gql`
  type Resource {
    id: ID @id
    headline: String!
    description: String
    url: String!
    imageURL: String
    rootSite: String!
    tags: [Tag!]! @relationship(direction: OUT, type: "HAS_TAG")
    users: [User!]! @relationship(direction: IN, type: "BOOKMARKED")
    comments: [Comment!]! @relationship(direction: IN, type: "HAS_COMMENT")
    userAddedTags: [String]
    author: String
    createdAt: DateTime!
    updatedAt: DateTime!
    upvotes: Int!
    downvotes: Int!
    counter: Int!
  }

  extend type Resource
    @auth(
      rules: [
        { operations: [CREATE, UPDATE, DELETE, READ], isAuthenticated: true }
      ]
    )

  type User {
    id: ID @id
    username: String!
    password: String @private
    salt: String! @private
    name: String!
    role: String!
    email: String!
    bookmarks: [Resource!]! @relationship(direction: OUT, type: "BOOKMARKED")
    createdAt: DateTime!
    updatedAt: DateTime!
    comments: [Comment!]! @relationship(direction: OUT, type: "WROTE_COMMENT")
  }

  extend type User
    @auth(
      rules: [
        {
          operations: [READ, UPDATE, DELETE]
          isAuthenticated: true
          allow: { id: "$jwt.sub" }
        }
        { operations: [CREATE], isAuthenticated: true }
      ]
    )

  type Mutation {
    signUp(
      username: String!
      password: String!
      name: String!
      email: String!
    ): String!

    signIn(username: String!, password: String!): String!

    makeBookmark(resourceURL: String!): String!

    addComment(resourceURL: String!, text: String!): String!

    addResource(
      headline: String!
      description: String!
      url: String!
      imageURL: String!
      rootSite: String!
      author: String!
      tags: String!
      userAddedTags: [String!]
    ): String!
  }

  type Tag {
    id: ID @id
    name: String! @unique
  }

  type Collection {
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    collectionTags: [String]
  }

  extend type Collection
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  type Note {
    text: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Note
    @auth(
      rules: [{ operations: [CREATE, UPDATE, DELETE], isAuthenticated: true }]
    )

  type Comment {
    id: ID @id
    text: String!
    resource: [Resource!]! @relationship(direction: OUT, type: "HAS_COMMENT")
    author: [User!]! @relationship(direction: IN, type: "WROTE_COMMENT")
  }

  extend type Comment
    @auth(
      rules: [
        {
          operations: [UPDATE, DELETE]
          isAuthenticated: true
          allow: { author: { id: "$jwt.sub" } }
        }
        {
          operations: [CREATE]
          isAuthenticated: true
          bind: { author: { id: "$jwt.sub" } }
        }
      ]
    )
`
