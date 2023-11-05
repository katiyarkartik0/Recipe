import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "store/slices/auth";

import { userLogin } from "api/auth";

import Button from "components/Button/Button";

import { Loader } from "utils/Loader/Loader";
import { fieldValidation } from "helpers/validator";

import "./LoginForm.css";
import { setToast } from "store/slices/toast";

import "utils/icons/icon.css";

const defaultUserCredentials = {
  email: "",
  password: "",
};

const defaultError = {};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState(
    defaultUserCredentials
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmail = (e) => {
    setUserCredentials((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setUserCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const { isDataValid, field, msg } = fieldValidation(userCredentials);
    if (!isDataValid) {
      setErrors({ [field]: msg });
      return;
    }
    setIsLoading(true);
    await userLogin(userCredentials)
      .then(async (res) => {
        if (res.ok) {
          const { userData, accessToken, msg } = await res.json();
          dispatch(setLogin({ accessToken, userData }));
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate("/home");
          return;
        }
        if (!res.ok) {
          const { msg } = await res.json();
          dispatch(setToast({ status: "failure", displayMessage: msg }));
        }
      })
      .catch((error) => {
        dispatch(
          setToast({ status: "failure", displayMessage: JSON.stringify(error) })
        );
      });
    setErrors(defaultError);
    setIsLoading(false);
  };

  return (
    <form className="form" onSubmit={hanldeSubmit}>
      <div className="field-box">
        <label for="email" className="input-label">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={userCredentials.email}
          onChange={handleEmail}
          className={`input-field ${errors.email ? "error-box" : ""}`}
          placeholder="Email"
        />
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      <div className="password-container field-box">
        <label for="password" className="input-label">
          Password
        </label>
        <input
          id="password"
          onChange={handlePassword}
          type={showPassword ? "text" : "password"}
          className={`input-field ${errors.password ? "error-box" : ""}`}
          placeholder="Password"
          value={userCredentials.password}
        />
        <span
          className={`sign-in-pass ${errors.password ? "error-icon" : ""} ${
            showPassword ? "icon-eye" : "icon-eye-slash"
          }`}
          onClick={togglePasswordVisibility}
        ></span>
        {errors.password && (
          <span className="input-error">{errors.password}</span>
        )}
      </div>
      <Button
        type="button"
        onClickEvent={() =>
          setUserCredentials({
            email: "katiyarkartik0@gmail.com",
            password: "qwerty",
          })
        }
        className="common-button field-box"
        text="Generate Sample User Credentials"
      />

      {!isLoading && (
        <Button
          type="submit"
          text="Log In"
          className="common-button field-box"
        />
      )}
      {isLoading && <Loader />}
    </form>
  );
};

export default LoginForm;
