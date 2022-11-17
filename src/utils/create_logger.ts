const { createLogger, format, transports } = require("winston")
const { combine, timestamp, prettyPrint } = format

export function create_logger() {
  const myWinstonOptions = {
    format: combine(timestamp(), format.json(), prettyPrint()),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.Console({ format: format.simple() }),
    ],
  }
  return new createLogger(myWinstonOptions)
}
