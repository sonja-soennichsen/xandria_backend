import { get_duration_in_milliseconds } from "../utils/logger_helper"
import { loggerOptions } from "./static"
const { createLogger } = require("winston")
export const logger = new createLogger(loggerOptions)

module.exports = function (app: any) {
  app.use((err: any, req: any, res: any, next: any) => {
    logger.error({ err })
    next()
  })

  app.use((req: any, res: any, next: any) => {
    const start = process.hrtime()

    res.on("close", () => {
      const durationInMilliseconds = get_duration_in_milliseconds(start)
      logger.info(
        `[Method]${req.method} [URL]${
          req.originalUrl
        } [Duration]${durationInMilliseconds.toLocaleString()} ms`
      )
    })
    next()
  })
}
