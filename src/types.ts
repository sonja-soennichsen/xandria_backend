// sameSite needs to be set to False -> "none" allows for CSRF Attacks
// CSRF -> Cross-Site Request Forgery: Let's another website use the auth cookie to send a request on your behalf

export const cookieConfig: {} = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  path: "/",
  sameSite: "none",
  secure: true,
}

export const signoutConfig: {} = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
}
