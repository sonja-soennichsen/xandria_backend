const { ApolloServer } = require("apollo-server-express")
const serverConfig = require("../../src/config/serverConfig")
const neo4j = require("neo4j-driver")
require("dotenv").config()
import { initializeDatabase } from "../../src/config/intializeDatabase"

const driver = neo4j.driver(
  process.env.DATABASE_TEST_DB,
  neo4j.auth.basic("neo4j", "password")
)

const schema = initializeDatabase(driver)

// server config is the object you pass into the ApolloServer constructor
// { resolvers, typeDefs, schemaDirectives, context, ... }

// execute the context function to get the base context object
// optionally you can add a default req or res in this step
const baseContext = serverConfig.context({})

// create a test server subclass with the methods built in
class ApolloTestServer extends ApolloServer {
  constructor(config) {
    super(config)
    this.context = baseContext
  }

  setContext(newContext) {
    this.context = newContext
  }

  mergeContext(partialContext) {
    this.context = Object.assign({}, this.context, partialContext)
  }

  resetContext() {
    this.context = baseContext
  }
}

module.exports = {
  baseContext,
  testServer: new ApolloTestServer({ ...serverConfig, schema }),
}
