/* eslint-disable react/prop-types */
import "./button.css";
const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <div
      onClick={onClick}
      disabled={disabled}
      className={blue ? "btn btn-blue" : "btn"}
    >
      {text}
    </div>
  );
};

export default Button;
