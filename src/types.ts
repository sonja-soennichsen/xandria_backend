const { gql } = require("apollo-server");

export const typeDefs = gql`


  type Resource {
    id: ID
    headline: String!
    description: String
    url: String!
    imageURL: String
    rootSite: String!
    counter: Int!
    generatedTags: [String!]
    userAddedTags: [String]
    createdAt: DateTime!
    author: String
    addedAt: DateTime!
    upvotes: Int!
    downvotes: Int!
  }

  extend type Resource
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  type User {
    id: ID @id
    username: String!
    password: String @private
    name: String!
    role: String!
    email: String!
    bookmarks: [ID]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Mutation {
    signUp(username: String!, password: String!, name:String!, email:String!): String!
    signIn(username: String!, password: String!): String!
}


  type Tag {
    name: String!
    resources: [Resource!]! @relationship(type: "HAS_TAG", direction: IN)
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

  type Bookmark {
    createdAt: DateTime!
    updatedAt: DateTime!
    personalTags: [String!]
  }

  extend type Bookmark
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
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  type Comment {
    text: String!
    createdAt: DateTime!
  }

  extend type Comment
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

`;