const AccessToken = require("../models/accessToken");

const destroyAccessToken = async (req, res) => {
  if (req.verified === false) {
    return res.status(403).json({ msg: req.msg });
  }
  const userId = req.id;
  try {
    await AccessToken.deleteOne({ user: userId });
    return res.status(200).json({ msg: "access token destroyed successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { destroyAccessToken };
