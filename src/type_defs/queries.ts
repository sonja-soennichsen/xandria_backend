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
        UNWIND $tags as tag
        MATCH (node:Resource )-[t:HAS_TAG]-() WHERE t.name = toLower(tag)
        RETURN node
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    getResourceByTitle(searchterm: String!): [Resource]
      @cypher(
        statement: """
        CALL db.index.fulltext.queryNodes(\\"fulltext_titlesAndDescriptions\\", searchterm) YIELD node, score
        RETURN node, score
        """
      )
      @auth(rules: [{ isAuthenticated: true }])
  }

  type Query {
    getResourceByTagsAndTitle(searchterm: String, tags: [String]): [Resource]
      @cypher(
        statement: """
        CALL db.index.fulltext.queryNodes(\\"fulltext_titlesAndDescriptions\\", searchterm) YIELD node, score
        RETURN node  ORDER BY score DESC
        UNION
        UNWIND $tags as tag
        MATCH (node:Resource )-[t:HAS_TAG]-() WHERE t.name = toLower(tag)
        RETURN node
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
    resourceQuery: [Resource]
  }
`
