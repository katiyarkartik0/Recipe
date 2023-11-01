const User = require("../models/user");

class Validator {
  constructor() {}
  inputValidation(inputs) {
    const arrayOfInputs = Object.keys(inputs);
    for (let i = 0; i < arrayOfInputs.length; i++) {
      const inputKey = arrayOfInputs[i];
      const input = inputs[inputKey];
      if (!input) {
        return {
          isInputValid: false,
          msg: `${inputKey} field cannot be empty`,
        };
      }
      if (inputKey === "email") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input) == false
        ) {
          return {
            isInputValid: false,
            msg: "email address entered is not valid",
          };
        }
      }
    }
    return {
      isInputValid: true,
    };
  }
}

module.exports = { Validator };