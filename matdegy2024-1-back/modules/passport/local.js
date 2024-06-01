const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("../mysql2");
const logger = require("../logger");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "nickname",
        passwordField: "code",
      },
      async (nickname, code, done) => {
        try {
          const user = await getUser({ nickname, code });
          if (user.uid) {
            logger.info("Login from: ", { message: nickname });
            return done(null, { nickname: nickname, uid: user.uid });
          } else {
            return done(null, false, { message: "Incorrect nickname or code" });
          }
        } catch (e) {
          logger.error(e);
          return done(e);
        }
      }
    )
  );
};
