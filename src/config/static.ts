// sameSite needs to be set to False -> "none" allows for CSRF Attacks
// CSRF -> Cross-Site Request Forgery: Let's another website use the auth cookie to send a request on your behalf

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
