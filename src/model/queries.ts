import { gql } from "apollo-server-express"

export const queries = gql`
  type Query {
    me: User
      @cypher(
        statement: """
        MATCH (user:User {id: $auth.jwt.sub})
        RETURN user
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    getResourceByID(resourceID: String!): Resource
      @cypher(
        statement: """
        MATCH (res:Resource {id: $resourceID})
        RETURN res
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
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
      @auth(rules: [{ isAuthenticated: true }])
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
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    resources: [Resource!]
  }
`
