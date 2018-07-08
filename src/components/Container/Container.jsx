import React from "react";
import PropTypes from "prop-types";

import "./Container.css";

const Container = ({ children }) => (
  <div className="wrapper">
    <div className="wrapperContainer">{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node
};

Container.defaultProps = {
  children: null
};

export default Container;
