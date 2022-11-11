const neo4j = require("neo4j-driver")
require("dotenv").config()

export async function clearDatabase() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI_TEST,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD_TEST)
  )
  const session = driver.session()

  try {
    const result = await session.writeTransaction((tx: any) =>
      tx.run("match (a) delete a")
    )
  } finally {
    await session.close()
  }

  // on application exit:
  await driver.close()
}
