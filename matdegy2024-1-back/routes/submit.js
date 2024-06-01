const express = require("express");
const router = express.Router();
const { parse } = require("node-html-parser");
const puppeteer = require("puppeteer");
require("dotenv").config();

const title_naive_list = [
  "symbol",
  "heights",
  "sequence1",
  "sequence2",
  "sequence3",
  "sequence4",
  "sequence5",
  "word",
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
  "iqtest",
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
];

router.get("/:title", async function (req, res, next) {
  const title = req.params.title;
  if (!title_list.includes(title)) {
    res.status(404).send("Not Found");
    return;
  }
  if (title_naive_list.includes(title)) {
    const answer = req.query.answer;
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
