import "./Button.css";

const Button = ({ type, text, onClickEvent, className, disabled = false }) => {
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
      {text}
    </button>
  );
};

export default Button;
