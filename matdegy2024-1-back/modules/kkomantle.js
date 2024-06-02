const axios = require("axios");
const logger = require("./logger");

const startKkomantle = async () => {
  try {
    const response = await axios.get("https://koo.bfy.kr/start");
    if (response.data.sess) {
      return { error: false, sess: response.data.sess };
    }
    return { error: false, sess: null };
  } catch (error) {
    console.log(error);
    logger.error({ message: error });
    return { error: true, sess: null };
  }
};

const getSimilarity = async ({ sess }) => {
  try {
    const response = await axios.get(`https://koo.bfy.kr/similarity`, {
      headers: {
        "word-sess": sess,
      },
    });
    if (response.data) {
      return { error: false, similarity: response.data };
    }
    return { error: false, similarity: null };
  } catch (error) {
    console.log(error);
    logger.error({ message: error });
    return { error: true, similarity: null };
  }
};

const guessWord = async ({ sess, word }) => {
  try {
    console.log(sess);
    console.log(word);
    const response = await axios.get(`https://koo.bfy.kr/guess?word=${word}`, {
      headers: {
        "word-sess": sess,
      },
      timeout: 10000,
    });
    if (response.data) {
      return { error: false, data: response.data };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    logger.error({ message: error });
    return { error: true, data: null };
  }
};

module.exports = { startKkomantle, getSimilarity, guessWord };
