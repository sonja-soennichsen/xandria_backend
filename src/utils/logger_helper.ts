const { createLogger, format, transports } = require("winston")
const { combine, timestamp, prettyPrint } = format

export function create_logger() {
  const myWinstonOptions = {
    format: combine(timestamp(), format.json(), prettyPrint()),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "info.log", level: "info" }),
      new transports.Console({ format: format.simple() }),
    ],
  }
  return new createLogger(myWinstonOptions)
}

export function getDurationInMilliseconds(start: [number, number]) {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}
