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
    userAddedTags: [String]
    author: String
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
  }

  type Mutation {
    signUp(
      username: String!
      password: String!
      name: String!
      email: String!
    ): String!

    signIn(username: String!, password: String!): String!

    makeBookmark(resourceID: String!): String!

    addResource(
      headline: String!
      description: String!
      url: String!
      imageURL: String!
      rootSite: String!
      author: String!
      generatedTags: [String!]
      userAddedTags: [String!]
    ): String!
  }

  type Tag {
    name: String!
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
        {
          operations: [CREATE, READ, UPDATE, DELETE]
          isAuthenticated: true
          allow: { id: "$jwt.sub" }
        }
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
    text: String!
    createdAt: DateTime!
  }

  extend type Comment
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  type Query {
    me: User
      @cypher(
        statement: """
        MATCH (user:User {id: $auth.jwt.sub})
        RETURN user
        """
      )
  }

  type Query {
    addBookmark: Resource
      @cypher(
        statement: """
        MATCH (a:User), (b:Resource)  WHERE a.id = '21d43772-8c8c-4d55-bf50-c893bd27ef56' AND b.url = 'google.com'  CREATE (a)-[r: BOOKMARKED]->(b) RETURN b
        """
      )
  }

  type Query {
    randomNumber: Float @cypher(statement: "RETURN rand()")
  }
`
