var express = require("express");
var router = express.Router();
const { startKkomantle, getSimilarity } = require("../modules/kkomantle");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/start/kkomantle", async function (req, res, next) {
  try {
    const result = await startKkomantle();
    if (result.error || !result.sess) {
      res.status(500).send("Internal Server Error");
    } else {
      const sess = result.sess;
      const similarity = await getSimilarity({ sess });
      if (similarity.error || !similarity.similarity) {
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json({
          sess,
          similarity: similarity.similarity,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
