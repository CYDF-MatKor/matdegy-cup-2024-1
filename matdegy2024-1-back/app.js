var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const submitRouter = require("./routes/submit");
const logger = require("./modules/logger");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  // console.log("Request URL: ", req.originalUrl);
  // console.log("Request Type: ", req.method);
  // console.log("Request Body: ", req.body);
  // console.log("Request Query: ", req.query);
  // console.log("Request Params: ", req.params);
  // console.log("Request Files: ", req.files);
  // console.log("Request Headers: ", req.headers);
  // console.log("Request User: ", req.user);
  logger.info("New Requseted From: ", { message: req.ip || req.ips });
  logger.info("Request URL: ", { message: req.originalUrl });
  logger.info("Request Type: ", { message: req.method });
  logger.info("Request Body: ", req.body);
  logger.info("Request Query: ", req.query);
  logger.info("Request Params: ", req.params);
  logger.info("Request Files: ", req.files);
  logger.info("Request Headers: ", req.headers);
  logger.info("Request User: ", req.user);

  // for form-data
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/submit", submitRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

