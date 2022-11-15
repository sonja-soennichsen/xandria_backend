const { gql } = require("apollo-server")

export const mutations = gql`
  type Mutation {
    makeBookmark(resourceId: String!): String
    removeBookmark(resourceId: String!): String
    makeBookmarkToNewResource(
      resourceId: String!
      resourceUrl: String
      headline: String!
    ): String
  }

  type Mutation {
    addComment(resourceId: String!, text: String!): String
  }

  type Mutation {
    addNote(resourceId: String!, text: String!): String
    updateNote(noteId: String!, text: String!): String
  }
  type Mutation {
    addTagToResource(resourceId: String!, tagName: String!): String
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