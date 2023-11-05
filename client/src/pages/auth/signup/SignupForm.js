import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "store/slices/toast";

import { userSignup } from "api/auth";

import Button from "components/Button/Button";

import { fieldValidation } from "helpers/validator";
import { Loader } from "utils/Loader/Loader";

import "./SignupForm.css";

const defaultUserData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [errors, setErrors] = useState(defaultError);
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;

    const { isDataValid, msg, field } = fieldValidation(userData);

    if (!isDataValid) {
      setErrors({ [field]: msg });
      return;
    }
    setIsLoading(true);
    await userSignup({ name, email, password })
      .then(async (res) => {
        if (res.ok) {
          dispatch(
            setToast({
              status: "success",
              displayMessage:
                "congratulations! your account has been created. Try signing in",
            })
          );
          setUserData(defaultUserData);
        } else if (!res.ok) {
          const { msg } = await res.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
          return;
        }
      })
      .catch((err) =>
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(err) })
        )
      );
    setErrors(defaultError);
    setIsLoading(false);
  };
  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleUserData}>
      <div className="field-box">
        <label for="fullname" className="input-label">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          className={`input-field ${errors.name ? "error" : ""}`}
          placeholder="Full Name"
          name="name"
          value={userData.name}
        />
        {errors.name && <span className="input-error">{errors.name}</span>}
      </div>

      <div className="field-box">
        <label for="email" className="input-label">
          Email
        </label>
        <input
          id="email"
          type="text"
          className={`input-field ${errors.email ? "error" : ""}`}
          placeholder="Email"
          name="email"
          value={userData.email}
        />
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      <div className="password-container field-box">
        <label for="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className={`input-field ${errors.password ? "error" : ""}`}
          placeholder="Password"
          name="password"
          value={userData.password}
        />
        <span
          className={`show-hide-pass ${errors.password ? "error-pass" : ""} ${
            showPassword ? "icon-eye" : "icon-eye-slash"
          }`}
          onClick={togglePasswordVisibility}
        ></span>
        {errors.password && (
          <span className="input-error">{errors.password}</span>
        )}
      </div>

      <div className="password-container field-box">
        <label for="confirmPass" className="input-label">
          Confirm Password
        </label>
        <input
          id="confirmPass"
          type={showPassword ? "text" : "password"}
          className={`input-field ${errors.confirmPassword ? "error" : ""}`}
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          name="confirmPassword"
        />
        <span
          className={`show-hide-pass ${
            errors.confirmPassword ? "error-pass" : ""
          } ${showPassword ? "icon-eye" : "icon-eye-slash"}`}
          onClick={togglePasswordVisibility}
        ></span>
        {errors.confirmPassword && (
          <span className="input-error">{errors.confirmPassword}</span>
        )}
      </div>
      {!isLoading && (
        <Button
          type="submit"
          className="common-button field-box"
          text="Sign Up"
        />
      )}
      {isLoading && <Loader />}
    </form>
  );
};

export default SignupForm;
