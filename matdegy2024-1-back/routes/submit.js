const express = require("express");
const router = express.Router();
const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");
require("dotenv").config();

const logger = require("../modules/logger");

const {
  compareAnswer,
  checkSolve,
  addSolve,
  getMsg,
  getPID,
  addLoginToUser,
  checkLogin,
  getAnswer,
  makeSQLInjection,
} = require("../modules/mysql2");

const { getSimilarity, guessWord } = require("../modules/kkomantle");

const { codeforces } = require("../modules/codeforces");

const title_naive_list = [
  "symbol",
  "heights",
  "mountain",
  "guess",
  "sequence1",
  "sequence2",
  "sequence3",
  "sequence4",
  "sequence5",
  "word1",
  "word2",
  "word3",
  "word4",
  "word5",
  "word6",
  "word7",
  "word8",
  "word9",
  "word10",
  "word11",
  "word",
  "sequence",
  "iqtest",
  "road",
];

const title_list = [
  "login",
  "hidden",
  "symbol",
  "heights",
  "sequence",
  "word",
  "birthday",
  "probability",
  "iqtest",
  "mountain",
  "attack",
  "guess",
  "sponsorship",
  "codeforces",
  "sequence1",
  "sequence2",
  "sequence3",
  "sequence4",
  "sequence5",
  "word1",
  "word2",
  "word3",
  "word4",
  "word5",
  "word6",
  "word7",
  "word8",
  "word9",
  "word10",
  "word11",
  "road",
  "final",
];

router.get("/:title", async function (req, res, next) {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }
  const title = req.params.title;
  if (!title || !title_list.includes(title)) {
    res.status(404).send("Not Found");
    return;
  }
  try {
    const { pid } = await getPID({ title });
    if (!pid) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const uid = req.user.uid;
    const ischeck = await checkSolve({ uid, pid });
    if (ischeck) {
      res.status(200).json({
        correct: true,
        message: "이미 푼 문제입니다.",
      });
      return;
    }
    if (title_naive_list.includes(title)) {
      const answer = req.query.answer;
      if (!answer) {
        res.status(400).send("Bad Request");
        return;
      }
      try {
        const result = await compareAnswer({ title, answer });
        if (result.error) {
          res.status(500).send("Internal Server Error");
          return;
        } else if (result.correct) {
          const time = await addSolve({ uid, pid });
          if (time.error) {
            res.status(500).send("Internal Server Error");
            return;
          }
          const msg = await getMsg({ pid });
          if (msg.error) {
            res.status(500).send("Internal Server Error");
            return;
          }
          res.status(200).json({
            correct: true,
            message: msg.message || "",
          });
          return;
        } else {
          res.status(200).json({ correct: false });
          return;
        }
      } catch (e) {
        logger.error({ message: e });
        res.status(500).send("Internal Server Error");
        return;
      }
    } else {
      if (title === "login") {
        const answer = req.query.answer;
        const coord = req.query.coord;
        if (!answer || !coord) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const result = await compareAnswer({ title, answer });
          if (result.error) {
            res.status(500).send("Internal Server Error");
            return;
          } else if (result.correct) {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            await addLoginToUser({ uid, login: coord });
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else {
            res.status(200).json({ correct: false });
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "hidden") {
        const answer = req.query.answer;
        if (!answer) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const result = await checkLogin({ uid, login: answer });
          if (result) {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else {
            res.status(200).json({ correct: false });
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "birthday") {
        const answer = req.query.answer;
        if (!answer) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const realAnswer = await getAnswer({ pid });
          if (!realAnswer.answer) {
            res.status(500).send("Internal Server Error");
            return;
          } else {
            const realAnswerTime = new Date(realAnswer.answer);
            const answerTime = new Date(answer);
            console.log(realAnswerTime, answerTime);
            console.log(realAnswerTime === answerTime);
            if (realAnswerTime < answerTime) {
              res.status(200).json({
                correct: false,
                message: "정답보다 느린 시간입니다.",
              });
              return;
            } else if (realAnswerTime > answerTime) {
              res.status(200).json({
                correct: false,
                message: "정답보다 빠른 시간입니다.",
              });
              return;
            } else {
              const time = await addSolve({ uid, pid });
              if (time.error) {
                res.status(500).send("Internal Server Error");
                return;
              }
              const msg = await getMsg({ pid });
              if (msg.error) {
                res.status(500).send("Internal Server Error");
                return;
              }
              res.status(200).json({
                correct: true,
                message: msg.message || "",
              });
            }
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "probability") {
        const submissionID = req.query.submissionID;
        if (!submissionID) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const { result } = await codeforces({
            submissionID,
            title: "A - Probability",
          });
          if (result === "success") {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else if (result === "Not Accepted") {
            res.status(200).json({
              correct: false,
              message: "Not Accepted",
            });
            return;
          } else if (result === "Not that Problem") {
            res.status(200).json({
              correct: false,
              message: "Not that Problem",
            });
            return;
          } else if (result === "Wrong submissionID or try again") {
            res.status(200).json({
              correct: false,
              message: "Wrong submissionID or try again",
            });
            return;
          } else {
            res.status(500).send("Internal Server Error");
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "attack") {
        try {
          const query = req.query.query;
          if (!query) {
            res.status(400).json({ message: "Bad Request" });
            return;
          }
          const result = await makeSQLInjection({ query, pid });
          if (!result) {
            res.status(200).json({
              message: "Wrong! Invalid Query",
            });
          } else {
            if (result.length > 1) {
              res.status(200).json({
                correct: false,
                message: "틀렸습니다! 하나보다 많은 문제를 불러왔습니다.",
              });
            } else if (result.length === 1) {
              await addSolve({ uid, pid });
              const msg = await getMsg({ pid });
              res.status(200).json({
                correct: true,
                message: msg.message || "",
              });
            } else {
              res.status(200).json({
                correct: false,
                message: "틀렸습니다!",
              });
            }
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "sponsorship") {
        const submissionID = req.query.submissionID;
        if (!submissionID) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const { result } = await codeforces({
            submissionID,
            title: "B - Sponsorship",
          });
          if (result === "success") {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else if (result === "Not Accepted") {
            res.status(200).json({
              correct: false,
              message: "Not Accepted",
            });
            return;
          } else if (result === "Not that Problem") {
            res.status(200).json({
              correct: false,
              message: "Not that Problem",
            });
            return;
          } else if (result === "Wrong submissionID or try again") {
            res.status(200).json({
              correct: false,
              message: "Wrong submissionID or try again",
            });
            return;
          } else {
            res.status(500).send("Internal Server Error");
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "codeforces") {
        const submissionID = req.query.submissionID;
        if (!submissionID) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const { result } = await codeforces({
            submissionID,
            title: "C - Codeforces",
          });
          if (result === "success") {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else if (result === "Not Accepted") {
            res.status(200).json({
              correct: false,
              message: "Not Accepted",
            });
            return;
          } else if (result === "Not that Problem") {
            res.status(200).json({
              correct: false,
              message: "Not that Problem",
            });
            return;
          } else if (result === "Wrong submissionID or try again") {
            res.status(200).json({
              correct: false,
              message: "Wrong submissionID or try again",
            });
            return;
          } else {
            res.status(500).send("Internal Server Error");
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else if (title === "final") {
        const submissionID = req.query.submissionID;
        if (!submissionID) {
          res.status(400).send("Bad Request");
          return;
        }
        try {
          const { result } = await codeforces({
            submissionID,
            title: "D - Final",
          });
          if (result === "success") {
            const time = await addSolve({ uid, pid });
            if (time.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            const msg = await getMsg({ pid });
            if (msg.error) {
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(200).json({
              correct: true,
              message: msg.message || "",
            });
            return;
          } else if (result === "Not Accepted") {
            res.status(200).json({
              correct: false,
              message: "Not Accepted",
            });
            return;
          } else if (result === "Not that Problem") {
            res.status(200).json({
              correct: false,
              message: "Not that Problem",
            });
            return;
          } else if (result === "Wrong submissionID or try again") {
            res.status(200).json({
              correct: false,
              message: "Wrong submissionID or try again",
            });
            return;
          } else {
            res.status(500).send("Internal Server Error");
            return;
          }
        } catch (e) {
          logger.error({ message: e });
          res.status(500).send("Internal Server Error");
          return;
        }
      } else res.status(200).send("Wrong Title");
      return;
    }
  } catch (e) {
    logger.error({ message: e });
    res.status(500).send("Internal Server Error");
    return;
  }
});

router.get("/heights", async function (req, res, next) {
  const answer = req.query.answer;
  if (!answer) {
    res.status(400).send("Bad Request");
    return;
  } else if (answer === "273372") {
    res.status(200).json({
      lcm_correct: true,
      message: "LCM을 구할 때는 항상 overflow를 주의해야 합니다.",
    });
    return;
  } else {
    res.status(200).json({ lcm_correct: false });
  }
});

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const url = "https://codeforces.com/gym/526848/submission/263011572";
    const codeforcesID = process.env.CODEFORCES_ID;
    const codeforcesPW = process.env.CODEFORCES_PW;
    const browser = await puppeteer.launch({ headless: true });
    try {
      console.log("browser opened");
      const page = await browser.newPage();
      console.log("page opened");
      await page.goto(url);
      await page.click("#handleOrEmail");
      await page.keyboard.type(codeforcesID);
      await page.click("#password");
      await page.keyboard.type(codeforcesPW);
      await page.click("#remember");
      await page.click(".submit");
      await page.waitForNavigation();
      if (page.url() === url) {
        const source = await page.content();
        const root = parse(source);
        const result = root.querySelector(".verdict-accepted");
        const problem = root.querySelector('a[title="B - Breeding Bugs"]');
        if (problem && result) {
          console.log("Solved Problem: ", problem.text);
          console.log("Result: ", result.text);
        } else if (problem) {
          browser.close();
          throw new Error("Result Wrong");
        } else {
          browser.close();
          throw new Error("Problem Wrong");
        }
      } else {
        throw new Error("Login Failed");
      }
      await browser.close();
    } catch (error) {
      console.error(error);
      await browser.close();
    }
  } catch (error) {
    console.error(error);
  } finally {
    res.send("respond with a resource");
  }
});

module.exports = router;
