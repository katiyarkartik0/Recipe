import React, { useState } from "react";

import Button from "components/Button/Button";
import LoginForm from "pages/auth/login/LoginForm";
import SignupForm from "pages/auth/signup/SignupForm";

import "./authentication.css";

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="form-box">
        <div className="form-container">
          <div className="button-box">
            <Button
              type="click"
              onClickEvent={() => setIsLogin(true)}
              className={isLogin ? "active-button" : "inactive-button"}
              text="Already have an account"
            />
            <Button
              type="click"
              onClickEvent={() => setIsLogin(false)}
              className={isLogin ? "inactive-button" : "active-button"}
              text="Register"
            />
          </div>
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
