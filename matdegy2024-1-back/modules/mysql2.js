const db = require("./dbconfig")("mysql2");
require("dotenv").config();
const bcrypt = require("bcrypt");

const nicknameDuplicateCheck = async (nickname) => {
  try {
    if (!nickname || nickname.length < 3 || nickname.length > 20)
      return { isdup: true };
    const result = await db("users").where({ nickname }).select("nickname");
    return { isdup: result.length > 0 };
  } catch (e) {
    console.error(e);
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
    console.error(e);
    return { error: true };
  }
};

module.exports = {
  nicknameDuplicateCheck,
  createUser,
};
