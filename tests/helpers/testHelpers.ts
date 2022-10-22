import { server } from "./initializeMockServer"
import { startStandaloneServer } from "@apollo/server/standalone"

type Config = { url: string }

export const getConfig = () => {
  let config: any = {}

  beforeAll(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    })
    config.url = url
    return config
  })

  afterAll(async () => {
    await server.stop()
  })

  return config as Config
}
