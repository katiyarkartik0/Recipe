const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../service/token");
const { Validator } = require("../helpers/validator");

const getUser = async (email, { attempt }) => {
  const user = await User.findOne({ email });
  if (user) {
    if (attempt === "logIn") {
      return {
        isNewUserEntry: false,
        userData: user,
        msg: "user exists, we are good to login ",
      };
    } else if (attempt === "signup") {
      return {
        isNewUserEntry: false,
        userData: user,
        msg: "user with this email already exists, try signing in with some other email",
      };
    }
  } else {
    if (attempt === "logIn") {
      return {
        isNewUserEntry: true,
        userData: null,
        msg: "email not found, try signing-up first",
      };
    } else if (attempt === "signup") {
      return {
        isNewUserEntry: true,
        userData: user,
        msg: "email not in the database,we are good to signup",
      };
    }
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { inputValidation } = new Validator();
  const { isInputValid, msg: inputValidationErrorMsg } = inputValidation({
    name,
    email,
    password,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationErrorMsg });
  }
  const { msg, isNewUserEntry } = await getUser(email, {
    attempt: "signup",
  });
  if (!isNewUserEntry) {
    return res.status(400).json({ msg });
  }
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password.toString(), 4),
  });

  try {
    await newUser.save();
    return res.status(200).json({ msg: "Account created Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  const { inputValidation } = new Validator();
  const { isInputValid, msg: inputValidationMessage } = inputValidation({
    email,
    password,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationMessage });
  }
  const { userData, msg, isNewUserEntry } = await getUser(email, {
    attempt: "logIn",
  });
  if (isNewUserEntry) {
    return res.status(400).json({ msg });
  }
  const isPasswordValid = bcrypt.compareSync(
    password.toString(),
    userData.password.toString()
  );
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "invalid password" });
  }

  try {
    const token = await generateToken({ userId: userData._id });
    userData.password = null;
    return res.status(200).json({
      userData,
      msg: "login successful",
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

module.exports = { registerUser, logInUser };
