const db = require("./dbconfig")("mysql2");
require("dotenv").config();
const bcrypt = require("bcrypt");
const logger = require("./logger");

const nicknameDuplicateCheck = async (nickname) => {
  try {
    if (!nickname || nickname.length < 3 || nickname.length > 20)
      return { isdup: true };
    const result = await db("users").where({ nickname }).select("nickname");
    return { isdup: result.length > 0 };
  } catch (e) {
    logger.error({ message: e });
    return { error: true };
  }
};

const createUser = async (nickname) => {
  const password = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0");
  try {
    const result = await db("users").insert({ nickname, code: password });
    if (result) {
      return { success: true, password };
    } else {
      return { success: false };
    }
  } catch (e) {
    logger.error({ message: e });
    return { error: true };
  }
};

const getUser = async ({ nickname, code }) => {
  try {
    const result = await db("users").where({ nickname, code }).select("uid");
    if (result.length > 0) {
      return { uid: result[0].uid };
    } else {
      return { uid: null };
    }
  } catch (e) {
    logger.error({ message: e });
    return { uid: null };
  }
};

const compareAnswer = async ({ title, answer }) => {
  try {
    const result = await db("problems")
      .where({
        title,
        answer,
      })
      .select("pid");
    if (result.length > 0) {
      return { pid: result[0].pid, correct: true, error: false };
    } else {
      return { correct: false, error: false };
    }
  } catch (e) {
    logger.error({ message: e });
    return { correct: false, error: true };
  }
};

const getUserCreateTime = async ({ uid }) => {
  try {
    const result = await db("users").where({ uid }).select("created_at");
    if (result.length > 0) {
      return { created_at: result[0].created_at };
    } else {
      return { created_at: null };
    }
  } catch (e) {
    logger.error({ message: e });
    return { created_at: null };
  }
};

const checkSolve = async ({ uid, pid }) => {
  try {
    const result = await db("solve").where({ uid, pid }).select("time");
    return result.length > 0;
  } catch (e) {
    logger.error({ message: e });
    return false;
  }
};

const addSolve = async ({ uid, pid }) => {
  try {
    await db("solve").insert({ uid, pid });
    const solve = await db("solve").where({ uid, pid }).select("time");
    const user_create_time = await getUserCreateTime({ uid });
    console.log([user_create_time.created_at, solve[0].time]);
    const timediff = await db.raw(
      `SELECT ABS(TIMESTAMPDIFF(SECOND, ?, ?)) as timediff`,
      [user_create_time.created_at, solve[0].time]
    );
    const result = await db("solve")
      .where({ uid, pid })
      .update({ elapsed_time: timediff[0][0].timediff });
    if (result) {
      return { success: true, error: false };
    } else {
      return { success: false, error: false };
    }
  } catch (e) {
    logger.error({ message: e });
    return { success: false, error: true };
  }
};

const getMsg = async ({ pid }) => {
  try {
    const result = await db("problems").where({ pid }).select("message");
    if (result.length > 0) {
      return { message: result[0].message, error: false };
    } else {
      return { message: null, error: false };
    }
  } catch (e) {
    logger.error({ message: e });
    return { message: null, error: true };
  }
};

const getPID = async ({ title }) => {
  try {
    const result = await db("problems").where({ title }).select("pid");
    if (result.length > 0) {
      return { pid: result[0].pid };
    } else {
      return { pid: null };
    }
  } catch (e) {
    logger.error({ message: e });
    return { pid: null };
  }
};

const addLoginToUser = async ({ uid, login }) => {
  try {
    const result = await db("users").where({ uid }).update({ login: login });
    return result > 0;
  } catch (e) {
    logger.error({ message: e });
    return false;
  }
};

const checkLogin = async ({ uid, login }) => {
  try {
    const result = await db("users").where({ uid, login }).select("uid");
    return result.length > 0;
  } catch (e) {
    logger.error({ message: e });
    return false;
  }
};

const getAnswer = async ({ pid }) => {
  try {
    const result = await db("problems").where({ pid }).select("answer");
    if (result.length > 0) {
      return { answer: result[0].answer };
    } else {
      return { answer: null };
    }
  } catch (e) {
    logger.error({ message: e });
    return { answer: null };
  }
};

const makeSQLInjection = async ({ pid, query }) => {
  try {
    const result = await db("problems")
      .where({ pid })
      .whereRaw("`answer` = '" + query + "'");
    return result;
  } catch (e) {
    logger.error({ message: e });
    return null;
  }
};

const getProblemsUserSolved = async ({ uid }) => {
  try {
    const result = await db("solve")
      .where({ uid })
      .select("pid", "time", "elapsed_time");
    return result;
  } catch (e) {
    logger.error({ message: e });
    return null;
  }
};

const getUserTimeOffset = async ({ uid }) => {
  try {
    const standard = "2024-06-04 18:00:00";
    const user_create_time = await getUserCreateTime({ uid });
    const timediff = await db.raw(
      `SELECT TIMESTAMPDIFF(SECOND, ?, ?) as timediff`,
      [standard, user_create_time.created_at]
    );
    console.log(timediff);
    return Math.max(timediff[0][0].timediff, 0);
  } catch (e) {
    logger.error({ message: e });
    return null;
  }
};

module.exports = {
  nicknameDuplicateCheck,
  createUser,
  getUser,
  compareAnswer,
  addSolve,
  checkSolve,
  getMsg,
  getPID,
  addLoginToUser,
  checkLogin,
  getAnswer,
  makeSQLInjection,
  getProblemsUserSolved,
  getUserTimeOffset,
};
