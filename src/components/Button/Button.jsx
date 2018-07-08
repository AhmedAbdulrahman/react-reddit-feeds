import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({
  className,
  children,
  type,
  onClick,
  htmlType,
  disabled,
  ...props
}) => {
  const finalClassName = `
    button
    ${`type-${type}`}
    ${disabled ? "disabled" : "interactive"}
    ${className}
  `;

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string
};

Button.defaultProps = {
  children: "",
  className: "",
  onClick: () => {},
  type: "normal",
  disabled: false,
  htmlType: "button"
};

export default Button;
