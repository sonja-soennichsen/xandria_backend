import { create_logger } from "../utils/create_logger"

module.exports = function (app: any) {
  const logger = create_logger()

  function logRequest(req: any, res: any, next: any) {
    logger.info(req.url)
    next()
  }

  function logError(err: any, req: any, res: any, next: any) {
    logger.error({ err })
    next()
  }

  app.use(logRequest)
  app.use(logError)
}
