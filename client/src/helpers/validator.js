export const emailValidator = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
    return {
      isEmailValid: false,
      msg: "Please enter a valid email address",
    };
  }
  return {
    isEmailValid: true,
  };
};

export const fieldValidation = (collectionOfFields) => {
  const fields = Object.keys(collectionOfFields);
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const fieldValue = collectionOfFields[field];
    if (field === "email") {
      const { isEmailValid, msg } = emailValidator(fieldValue);
      if (!isEmailValid) {
        return {
          isDataValid: false,
          field,
          msg,
        };
      }
    }
    if (fieldValue.length === 0) {
      return {
        isDataValid: false,
        field,
        msg: `please provide a valid ${field}`,
      };
    }
    if (field === "password" && fields.includes("confirmPassword")) {
      if (fieldValue !== collectionOfFields["confirmPassword"]) {
        return {
          isDataValid: false,
          field,
          msg: `password and confirm password field does not match`,
        };
      }
    }
  }
  return {
    isDataValid: true,
  };
};

export const isEqualStrings = (strings) => {
  for (let itr1 = 0; itr1 < strings.length; itr1++) {
    for (let itr2 = itr1 + 1; itr2 < strings.length; itr2++) {
      const str1 = strings[itr1];
      const str2 = strings[itr2];
      if (str1.localeCompare(str2) !== 0) {
        return false;
      }
    }
  }
  return true;
};
