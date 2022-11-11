import { clearDatabase } from "../helpers/clearDatabase"
require("dotenv").config()

module.exports = async function (globalConfig, projectConfig) {
  clearDatabase()
}
