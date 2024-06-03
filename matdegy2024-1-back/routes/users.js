var express = require("express");
var router = express.Router();
const {
  nicknameDuplicateCheck,
  createUser,
  getProblemsUserSolved,
  getUserTimeOffset,
} = require("../modules/mysql2");
const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");
const passport = require("passport");
const logger = require("../modules/logger");
require("dotenv").config();

router.get("/nicknamedup", async function (req, res, next) {
  const nickname = req.query.nickname;
  const result = await nicknameDuplicateCheck(nickname);
  if (result.error) {
    res
      .status(500)
      .json({ error: true, message: "Cannot check nickname duplication" });
  } else {
    return res.send(result);
  }
});

router.post("/signup", async function (req, res, next) {
  const nickname = req.body.nickname;
  const result = await nicknameDuplicateCheck(nickname);
  if (result.error) {
    res
      .status(500)
      .json({ error: true, message: "Cannot check nickname duplication" });
    return;
  }
  if (result.isdup) {
    res.status(403).json({ isdup: true });
    return;
  }
  const res2 = await createUser(nickname);
  if (res2.error || !res2.success) {
    res.status(500).json({ error: true, message: "Cannot create user" });
    return;
  }
  res.json({ code: res2.password });
});

router.get("/login", async function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Login Failed" });
    }
    return req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      logger.info("Login Success: ", { message: req.user.nickname });
      return res.json({ message: "Login Success" });
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  if (req.user) {
    logger.info("Logout: ", { message: req.user.nickname });
  } else {
    res.status(401).json({ message: "Not Logged In" });
    return;
  }
  res.clearCookie("connect.sid");
  req.logout((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Logout Failed" });
    }
    try {
      req.session.destroy();
      res.json({ message: "Logout Success" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Logout Failed" });
    }
  });
});

router.get("/solve", async function (req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: "Not Logged In" });
    return;
  }
  try {
    const uid = req.user.uid;
    const result = await getProblemsUserSolved({ uid });
    if (!result) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    const timeOffset = await getUserTimeOffset({ uid });
    result.forEach((element) => {
      element.elapsed_time += timeOffset;
    });
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
