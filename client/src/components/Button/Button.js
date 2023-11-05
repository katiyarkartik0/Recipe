import { Loader } from "utils/Loader/Loader";
import "./Button.css";

const Button = ({
  type,
  text,
  onClickEvent,
  className,
  disabled = false,
  isLoading = false,
}) => {
  const classes =
    "app-button-component" +
    " " +
    className +
    " " +
    (disabled === true ? "isDisabled" : "");
  return (
    <button
      type={type}
      className={classes}
      onClick={onClickEvent}
      disabled={disabled}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
};

export default Button;
