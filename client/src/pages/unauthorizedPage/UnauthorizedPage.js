import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";

import "./UnauthorizedPage.css";

const style = {
  width: "50%",
  padding: "10px",
  "margin-top": "20px",
  border: "none",
  outline: "none",
  "font-size": "16px",
  // color: #fff;
  // background-color: #5f27cd;
  "border-radius": "5px",
};

const UnauthorizedPage = ({ path = "/", displayMessage = "" }) => {
  const navigate = useNavigate();
  return (
    <div className="unauthorized-page">
      <h1 className="display-status">Unauthorized Access</h1>
      <p className="prompt-text">{displayMessage}</p>
      <Button
        text={"Go Back"}
        onClickEvent={() => navigate(path)}
        style={style}
      />
    </div>
  );
};

export default UnauthorizedPage;
