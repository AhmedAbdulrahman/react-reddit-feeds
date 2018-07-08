import React from "react";
import PropTypes from "prop-types";

import "./Input.css";
const Input = ({ className, type, disabled, onChangeInput, ...props }) => (
  <input
    type={type}
    className={`input
        ${className}`}
    onChange={onChangeInput}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onChangeInput: PropTypes.func
};

Input.defaultProps = {
  className: "",
  type: "text",
  onChangeInput: () => {}
};

export default Input;
