const winston = require("winston")
const { createLogger, format, transports } = require("winston")
const { combine, timestamp, label, prettyPrint } = format

module.exports = function (app: any) {
  const myWinstonOptions = {
    format: combine(timestamp(), winston.format.json(), prettyPrint()),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  }
  const logger = new winston.createLogger(myWinstonOptions)

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
