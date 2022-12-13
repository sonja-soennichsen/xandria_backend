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
    "https://xandria.vercel.app",
    "https://xandria-web-joshuaknauber.vercel.app",
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
        "https://xandria.vercel.app",
        "https://xandria-web-joshuaknauber.vercel.app",
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

export interface ScraperData {
  headline: string
  description: string
  url: string
  imageURL: string
  rootSite: string
  author: string
  tags: [String]
}

export interface CreateInput {
  [key: string]: any
}

export interface UpdateInput {
  [key: string]: any
}

export interface UserType {
  id: string
  username: string
  password: string
  salt: string
  name: string
  role: string
  email: string
  createdAt: string
  updatedAt: string | null
}

export interface JWT {
  sub: string
  username: string
  iat: number
}

export const mostCommonPasswords = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "12345",
  "1234",
  "111111",
  "1234567",
  "dragon",
  "123123",
  "baseball",
  "abc123",
  "football",
  "monkey",
  "letmein",
  "696969",
  "shadow",
  "master",
  "666666",
  "qwertyuiop",
  "123321",
  "mustang",
  "1234567890",
  "michael",
  "654321",
  "pussy",
  "superman",
  "1qaz2wsx",
  "7777777",
  "fuckyou",
  "121212",
  "000000",
  "qazwsx",
  "123qwe",
  "killer",
  "trustno1",
  "jordan",
  "jennifer",
  "zxcvbnm",
  "asdfgh",
  "hunter",
  "buster",
  "soccer",
  "harley",
  "batman",
  "andrew",
  "tigger",
  "sunshine",
  "iloveyou",
  "fuckme",
  "2000",
  "charlie",
  "robert",
  "thomas",
  "hockey",
  "ranger",
  "daniel",
  "Password1",
  "Nothing",
  "1qaz2wsx3edc",
  "Good123654",
]
