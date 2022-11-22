import {
  create_logger,
  getDurationInMilliseconds,
} from "../utils/logger_helper"

module.exports = function (app: any) {
  const logger = create_logger()

  app.use((err: any, req: any, res: any, next: any) => {
    logger.error({ err })
    next()
  })

  app.use((req: any, res: any, next: any) => {
    const start = process.hrtime()

    res.on("close", () => {
      const durationInMilliseconds = getDurationInMilliseconds(start)
      logger.info(
        `[Method]${req.method} [URL]${
          req.originalUrl
        } [Duration]${durationInMilliseconds.toLocaleString()} ms`
      )
    })
    next()
  })
}
