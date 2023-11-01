const express = require("express");
const accessTokenRoutes = express.Router();
const bodyParser = require("body-parser");
const { destroyAccessToken } = require("../controllers/accessToken");

accessTokenRoutes.use(bodyParser.urlencoded({ extended: false }));
accessTokenRoutes.use(bodyParser.json());

accessTokenRoutes.delete("/destroy",destroyAccessToken)

module.exports = { accessTokenRoutes };