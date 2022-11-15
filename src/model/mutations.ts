const { gql } = require("apollo-server")

export const mutations = gql`
  type Mutation {
    makeBookmark(resourceURL: String!): String
    removeBookmark(resourceURL: String!): String
    makeBookmarkToNewResource(resourceURL: String!, headline: String!): String
  }

  type Mutation {
    addComment(resourceURL: String!, text: String!): String
    addNote(resourceURL: String!, text: String!): String
  }
  type Mutation {
    addTagToResource(resourceURL: String!, tagName: String!): String
    relateTag(tag1: String!, tag2: String!): String
  }
  type Mutation {
    updateUserData(newUsername: String!, name: String!, email: String!): String
    changePassword(oldPassword: String!, newPassword: String!): String
  }

  type Mutation {
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
`
