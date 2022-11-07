module.exports = function (app: any) {
  app.use("/login", require("./login"))
  app.use("/signup", require("./signup"))
  app.use("/signout", require("./signout"))
  app.use("/refresh", require("./refresh"))
}
