/* eslint-disable react/prop-types */
import "./input.css";

const Input = ({ type, label, state, setState, placeholder }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
