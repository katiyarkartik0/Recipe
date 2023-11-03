import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "store/slices/toast";

import { selectToastContent } from "helpers/selector";

import "./Toast.css";

function Toast() {
  const { toastStatus, toastMessage } = useSelector(selectToastContent);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (toastStatus && toastMessage) {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        dispatch(setToast({status:null,displayMessage:null}))
      }, 3000);
    }
  }, [toastStatus, toastMessage]);

  return (
    <div className={`toast-container ${showToast ? "show" : ""} ${toastStatus}`}>
      <div className={`toast `}>{toastMessage}</div>
    </div>
  );
}

export default Toast;
