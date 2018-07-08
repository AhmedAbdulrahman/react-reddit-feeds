import React from "react";
import PropTypes from "prop-types";

import "./Input.css";
const Input = ({ className, type, disabled, ...props }) => (
  <input
    type={type}
    className={`input
        ${disabled && ".disabled"}
        ${className}`}
    disabled={disabled}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

Input.defaultProps = {
  className: "",
  type: "text",
  disabled: false
};

export default Input;
