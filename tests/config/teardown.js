import { clear_database } from "../utils/clear_database"
require("dotenv").config()

module.exports = async function (globalConfig, projectConfig) {
  clear_database()
}
