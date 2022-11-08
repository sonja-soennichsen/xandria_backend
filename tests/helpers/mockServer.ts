import server from "../../src/index"
const neo4j = require("neo4j-driver")

export async function startServer() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  )
}
