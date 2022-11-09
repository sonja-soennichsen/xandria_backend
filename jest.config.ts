import type { Config } from "@jest/types"
import "./tests/config/teardown"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/tests/config/setup",
  globalTeardown: "<rootDir>/tests/config/teardown",
}

export default config
