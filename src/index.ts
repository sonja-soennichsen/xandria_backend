const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");
require('dotenv').config()

const typeDefs = gql`
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
    id: ID
    name: String!
    username: String!
    password: String!
    role: String!
    email: String!
    bookmarks: [ID]
    createdAt: DateTime!
    updatedAt: DateTime!
    session: [Session!]! @relationship(type: "HAS_SESSION", direction: OUT)
    account: [Account!]! @relationship(type: "HAS_ACCOUNT", direction: OUT)
  }

  extend type User
    @auth(
      rules: [
        { operations: [CREATE, READ, UPDATE, DELETE], isAuthenticated: true }
      ]
    )

  type Tag {
    name: String!
    resources: [Resource!]! @relationship(type: "HAS_TAG", direction: IN)
  }

  type Session {
    id: ID
    expires: DateTime
    sessionToken: String!
    userID: String!
  }

  type Account {
    id: ID
    userID: String!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String!
    access_token: String!
    expires_at: Int!
    token_type: String!
    scope: String!
    id_token: String!
    session_state: String!
    oauth_token_secret: String!
    oauth_token: String!
  }

  type VerificationToken {
    identifier: String!
    token: String!
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

const driver = neo4j.driver(
    'neo4j+s://3af1e591.databases.neo4j.io',
    neo4j.auth.basic('neo4j', 'E-r9PlqZMgSwO4JKRwwr5o7nhntIkAK9w3L8dhdoAcU')
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

export default neoSchema.getSchema().then((schema: any) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen()
    // .then(({ url }) => {
    //     console.log(`🚀 Server ready at ${url}`);
    // });
  })