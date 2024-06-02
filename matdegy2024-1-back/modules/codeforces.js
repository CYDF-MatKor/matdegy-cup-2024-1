const puppeteer = require("puppeteer");
const { parse } = require("node-html-parser");
const logger = require("./logger");

const codeforces = async ({ submissionID, title }) => {
  try {
    const url = `https://codeforces.com/gym/527699/submission/${submissionID}`;
    const codeforcesID = process.env.CODEFORCES_ID;
    const codeforcesPW = process.env.CODEFORCES_PW;
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
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
        const problem = root.querySelector('a[title="' + title + '"]');
        if (problem && result) {
          browser.close();
          return { result: "success" };
        } else if (problem) {
          browser.close();
          return { result: "Not Accepted" };
        } else {
          browser.close();
          return { result: "Not that Problem" };
        }
      } else {
        return { result: "Wrong submissionID or try again" };
      }
    } catch (error) {
      logger.error(error);
      browser.close();
      return { result: "error" };
    }
  } catch (error) {
    logger.error(error);
    return { result: "error" };
  }
};

module.exports = { codeforces };
