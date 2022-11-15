const { gql } = require("apollo-server")

export const typeDefs = gql`
  type Resource {
    id: ID! @id
    headline: String!
    description: String!
    url: String! @unique
    imageURL: String
    rootSite: String!
    tags: [Tag!]!
      @relationship(direction: OUT, type: "HAS_TAG", properties: "hasTag")
    users: [User!]! @relationship(direction: IN, type: "BOOKMARKED")
    comments: [Comment!]! @relationship(direction: IN, type: "HAS_COMMENT")
    notes: [Note!]! @relationship(direction: IN, type: "HAS_NOTE")
    userAddedTags: [String]
    author: String
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [CREATE, UPDATE])
    upvotes: Int
    downvotes: Int
    counter: Int
  }

  type ResourceResponse {
    id: ID! @id
    headline: String!
    description: String!
    url: String! @unique
    imageURL: String
    rootSite: String!
    tags: [Tag!]
    users: [User!]
    comments: [Comment!]
    notes: [Note!]
    userAddedTags: [String]
    author: String
    createdAt: DateTime
    updatedAt: DateTime
    upvotes: Int
    downvotes: Int
    counter: Int
  }

  type User {
    id: ID @id
    username: String!
    password: String @private
    salt: String! @private
    name: String!
    role: String!
    email: String!
    bookmarks: [Resource!]! @relationship(direction: OUT, type: "BOOKMARKED")
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [CREATE, UPDATE])
    comments: [Comment!]! @relationship(direction: OUT, type: "WROTE_COMMENT")
    notes: [Note!]! @relationship(direction: OUT, type: "WROTE_NOTE")
  }

  interface hasTag @relationshipProperties {
    name: String!
  }

  type Tag {
    id: ID @id
    name: String! @unique
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [CREATE, UPDATE])
    resources: [Resource!]!
      @relationship(direction: IN, type: "HAS_TAG", properties: "hasTag")
    related: [Tag!]!
      @relationship(
        direction: OUT
        type: "RELATED"
        queryDirection: DEFAULT_UNDIRECTED
      )
  }

  type Collection {
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
    name: String!
    collectionTags: [String]
  }

  type Note {
    text: String!
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
    resource: Resource! @relationship(direction: OUT, type: "HAS_NOTE")
    author: User! @relationship(direction: IN, type: "WROTE_NOTE")
  }

  type Comment {
    id: ID @id
    text: String!
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
    resource: Resource! @relationship(direction: OUT, type: "HAS_COMMENT")
    author: User! @relationship(direction: IN, type: "WROTE_COMMENT")
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

  extend type Collection
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  extend type User
    @auth(
      rules: [
        {
          operations: [READ, UPDATE, DELETE]
          isAuthenticated: true
          allow: { id: "$jwt.sub" }
        }
        {
          operations: [CREATE]
          isAuthenticated: true
          bind: { id: "$jwt.sub" }
        }
      ]
    )

  extend type Note
    @auth(
      rules: [
        {
          operations: [UPDATE, DELETE, READ, CREATE]
          isAuthenticated: true
          allow: { author: { id: "$jwt.sub" } }
          bind: { author: { id: "$jwt.sub" } }
        }
      ]
    )

  extend type Resource
    @auth(
      rules: [
        { operations: [CREATE, UPDATE, DELETE, READ], isAuthenticated: true }
      ]
    )

  type Mutation {
    makeBookmark(resourceURL: String!): String
    removeBookmark(resourceURL: String!): String
    makeBookmarkToNewResource(resourceURL: String!, headline: String!): String

    addComment(resourceURL: String!, text: String!): String

    addNote(resourceURL: String!, text: String!): String

    addTagToResource(resourceURL: String!, tagName: String!): String

    relateTag(tag1: String!, tag2: String!): String

    updateUserData(newUsername: String!, name: String!, email: String!): String

    changePassword(oldPassword: String!, newPassword: String!): String

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
    getResourceByID(resourceID: String!): Resource
      @cypher(
        statement: """
        MATCH (res:Resource {id: $resourceID})
        RETURN res
        """
      )
  }

  type Query {
    getResourcesByTag(tag: String!): [Resource]
      @cypher(
        statement: """
        MATCH (n:Resource )-[:HAS_TAG]-(t:Tag)
        WHERE t.name = $tag
        RETURN n
        """
      )
  }

  type Query {
    getResourcesByRelatedTag(tag: String!): [Resource]
      @cypher(
        statement: """
        MATCH (r:Resource )-[:HAS_TAG]-(t:Tag)-[:RELATED]-(t2:Tag)-[:HAS_TAG]-(r2:Resource)
        WHERE t.name = $tag
        RETURN r, r2, t, t2
        """
      )
  }

  type Query {
    resources: [Resource!]
  }
`
