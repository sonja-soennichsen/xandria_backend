//import { makeExecutableSchema } from "@graphql-tools/schema"
const { addMocksToSchema } = require("@graphql-tools/mock")
import { graphql } from "graphql"
import { typeDefs } from "../../src/types"
import resolvers from "../../src/mutations"

const { makeExecutableSchema } = require("@graphql-tools/schema")

// const typeDefs = /* GraphQL */ `
//   type Query {
//     movie(id: ID): Movie
//     actor(id: ID): Actor
//   }

//   type Actor {
//     id: String!
//     name: String!
//     age: Int
//     movies: Movie
//   }

//   type Movie {
//     id: String
//     name: String!
//     genre: String
//     actor: Actor
//   }

//   type Movies {
//     movies: [Movie]
//   }

//   type Actors {
//     actor: [Actors]
//   }
// `

const query = /* GraphQL */ `
  query Resources {
    resources {
      id
      headline
      description
    }
  }
`

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({
  typeDefs,
})

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema })

graphql({ schema: schemaWithMocks, source: query }).then((result) =>
  console.log("Got result", result)
)
