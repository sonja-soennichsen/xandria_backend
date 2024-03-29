const { gql } = require("apollo-server")

export const base_model = gql`
  type Resource {
    id: ID! @id
    headline: String!
    description: String
    url: String! @unique
    imageURL: String
    rootSite: String
    tags: [Tag!]!
      @relationship(direction: OUT, type: "HAS_TAG", properties: "hasTag")
    users: [User!]!
      @relationship(direction: IN, type: "BOOKMARKED", properties: "bookmarked")
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

  type User {
    id: ID @id
    username: String! @unique
    password: String @private
    salt: String! @private
    name: String!
    role: String!
    email: String! @private
    bookmarks: [Resource!]!
      @relationship(
        direction: OUT
        type: "BOOKMARKED"
        properties: "bookmarked"
      )
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [CREATE, UPDATE])
    comments: [Comment!]! @relationship(direction: OUT, type: "WROTE_COMMENT")
    notes: [Note!]! @relationship(direction: OUT, type: "WROTE_NOTE")
  }

  interface hasTag @relationshipProperties {
    name: String!
  }

  interface bookmarked @relationshipProperties {
    createdAt: DateTime @timestamp(operations: [CREATE])
    userAddedTags: [String]
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
    id: ID @id
    text: String!
    createdAt: DateTime! @timestamp(operations: [CREATE])
    updatedAt: DateTime! @timestamp(operations: [CREATE, UPDATE])
    resource: Resource! @relationship(direction: OUT, type: "HAS_NOTE")
    author: User! @relationship(direction: IN, type: "WROTE_NOTE")
  }

  type Comment {
    id: ID @id
    text: String!
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [CREATE, UPDATE])
    resource: Resource! @relationship(direction: OUT, type: "HAS_COMMENT")
    author: User! @relationship(direction: IN, type: "WROTE_COMMENT")
  }
`
