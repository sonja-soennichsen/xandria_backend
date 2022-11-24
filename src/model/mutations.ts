const { gql } = require("apollo-server")

export const mutations = gql`
  type Mutation {
    makeBookmark(resourceId: String!, userAddedTags: [String]!): Boolean
    removeBookmark(resourceId: String!): Boolean
    makeBookmarkFromUrl(resourceUrl: String!): Boolean
  }

  type Mutation {
    addComment(resourceId: String!, text: String!): Boolean
    deleteComment(commentId: String!): Boolean
  }

  type Mutation {
    addNote(resourceId: String!, text: String!): Boolean
    updateNote(noteId: String!, text: String!): Boolean
    deleteNote(noteId: String!): Boolean
  }
  type Mutation {
    addTagToResource(resourceId: String!, tagName: String!): Boolean
    relateTag(tag1: String!, tag2: String!): Boolean
  }
  type Mutation {
    updateUserData(newUsername: String!, name: String!, email: String!): Boolean
    changePassword(oldPassword: String!, newPassword: String!): Boolean
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
    ): Boolean
  }
`
