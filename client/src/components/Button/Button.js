import "./Button.css";

const Button = ({ type, text, onClickEvent, className}) => {
  const classes = "app-button-component" + " " + className;
  return (
    <button type={type} className={classes} onClick={onClickEvent}>
      {text}
    </button>
  );
};

export default Button;
