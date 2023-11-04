const Token = require("../models/accessToken");

const isTokenPresent = async ({ token }) => !!(await Token.findOne({ token }));

const verifyToken = async (req, res, next) => {
  let token = req.header("authorization");

  if (token && token.split(" ")[0] === "OAT") {
    const accessToken = token.split(" ")[1];
    if (await isTokenPresent({ token: accessToken })) {
      const userId = token.split(" ")[2];
      req.id = userId;
      req.verified = true;
      next();
    } else {
      req.verified = false;
      req.msg = "invalid JWT token";
      next();
      return;
    }
  } else {
    req.verified = false;
    req.msg = "Authorization header not found";
    next();
  }
};

module.exports = { verifyToken };
