import { clearDatabase } from "../utils/clearDatabase"
require("dotenv").config()

module.exports = async function (globalConfig, projectConfig) {
  clearDatabase()
}
