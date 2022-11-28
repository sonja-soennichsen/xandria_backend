const { format, transports } = require("winston")
const { combine, timestamp, prettyPrint } = format

export const cookieConfig: {} = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  path: "/",
  sameSite: "none",
  secure: true,
}

export const signoutConfig: { [key: string]: any } = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
}

export const corsOptions = {
  origin: [
    "https://studio.apollographql.com",
    "https://xandria-2jytui6ygq-ey.a.run.app",
    "https://xandria.vercel.app",
    "https://xandria-web-joshuaknauber.vercel.app",
    "http://localhost:3000",
    "http://localhost:4000",
    "https://xandria-web-git-main-joshuaknauber.vercel.app",
  ],
  credentials: true,
}

export const helmetOptions = {
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      "script-src": [
        "'self'",
        "https://studio.apollographql.com",
        "https://xandria-2jytui6ygq-ey.a.run.app",
        "https://xandria.vercel.app",
        "https://xandria-web-joshuaknauber.vercel.app",
        "http://localhost:3000",
        "http://localhost:4000",
        "https://xandria-web-git-main-joshuaknauber.vercel.app",
        "https://apollo-server-landing-page.cdn.apollographql.com",
      ],
    },
  },
}

export const loggerOptions = {
  format: combine(timestamp(), format.json(), prettyPrint()),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "info.log", level: "info" }),
    new transports.Console({ format: format.simple() }),
  ],
}

export interface tagInterface {
  where: {
    node: {
      name: string
    }
  }
  onCreate: {
    node: {
      name: string
    }
    edge: {
      name: string
    }
  }
}
