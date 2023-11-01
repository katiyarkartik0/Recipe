const { v4: uuidv4 } = require("uuid");
const Token = require("../models/accessToken");

const injectUserIdInToken = ({ token, userId }) => token + " " + userId;

const generateToken = async ({ userId = "" }) => {
  const token = uuidv4();
  const newToken = new Token({ token, user: userId });
  await newToken.save();
  const injectedToken = injectUserIdInToken({ token, userId });
  return injectedToken;
};

module.exports = { generateToken };
