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
    getResourceById(resourceId: String!): Resource
      @cypher(
        statement: """
        MATCH (res:Resource {id: $resourceId})
        RETURN res
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    getResourcesByTags(tags: [String]!): [Resource]
      @cypher(
        statement: """
        MATCH (n:Resource )-[:HAS_TAG]-(t:Tag)
        WHERE t.name IN tags
        RETURN n
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    getResourceByTitle(searchterm: String!): [Resource]
      @cypher(
        statement: """
        MATCH (r:Resource)
        WHERE  r.headline CONTAINS searchterm OR r.description CONTAINS searchterm
        RETURN r
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
