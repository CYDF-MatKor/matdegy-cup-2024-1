const passport = require("passport");
const local = require("./local");

module.exports = () => {
  passport.serializeUser(async (user, done) => {
    const { uid, nickname } = user;
    if (uid) {
      done(null, { uid, nickname });
    } else {
      done(null, false);
    }
  });

  passport.deserializeUser(async (user, done) => {
    if (user.uid) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
  local();
};
