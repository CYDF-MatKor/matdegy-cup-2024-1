require("dotenv").config();
const logger = require("./logger");
module.exports = (dbtype) => {
  console.log("dbtype", dbtype);
  const dbconfig = {
    client: dbtype,

    debug: true,

    connection: {
      host: process.env[`${dbtype}_HOST`],
      port: process.env[`${dbtype}_PORT`],
      user: process.env[`${dbtype}_USER`],
      password: process.env[`${dbtype}_PASSWORD`],
      database: process.env[`${dbtype}_DATABASE`],
    },

    asyncStackTraces: true,

    pool: {
      min: 0,
      max: 100,
    },
    afterCreate: (conn, done) => {
      conn.query("SET time_zone='+09:00';", (err) => {
        if (err) {
          done(err, conn);
        } else {
          conn.query("SET NAMES utf8mb4;", (err) => {
            done(err, conn);
          });
        }
      });
    },

    acquireConnectionTimeout: 60 * 1000,

    log: {
      warn(message) {
        console.warn(message);
        logger.warn(message);
      },
      error(message) {
        console.error(message);
        logger.error(message);
      },
      deprecate(message) {
        console.log(message);
        logger.warn(message);
      },
      debug(message) {
        console.log(message);
        logger.debug(message);
      },
    },
  };

  logger.info("dbconfig: ", dbconfig);

  return require("knex")(dbconfig);
};
