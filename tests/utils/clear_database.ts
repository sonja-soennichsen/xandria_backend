const neo4j = require("neo4j-driver")
require("dotenv").config()

export async function clear_database() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI_TEST,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD_TEST)
  )
  const session = driver.session()

  try {
    const result = await session.writeTransaction((tx: any) =>
      tx.run(
        "MATCH (n) OPTIONAL MATCH (n)-[r]-() WITH n,r LIMIT 50000 DELETE n,r "
      )
    )
  } finally {
    await session.close()
  }

  // on application exit:
  await driver.close()
}
