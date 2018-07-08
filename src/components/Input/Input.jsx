import React from "react";
import PropTypes from "prop-types";

import "./Input.css";
const Input = ({ className, type, disabled, onChangeInput, ...props }) => (
  <input
    type={type}
    className={`input
        ${disabled && ".disabled"}
        ${className}`}
    disabled={disabled}
    onClick={onChangeInput}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeInput: PropTypes.func
};

Input.defaultProps = {
  className: "",
  type: "text",
  disabled: false,
  onChangeInput: () => {}
};

export default Input;
