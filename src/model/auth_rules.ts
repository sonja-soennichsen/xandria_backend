const { gql } = require("apollo-server")

export const auth_rules = gql`
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
        { operations: [READ], isAuthenticated: true }
        {
          operations: [UPDATE, DELETE, READ]
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
`
