const neo4j = require("neo4j-driver")

export async function clearDatabase() {
  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
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
