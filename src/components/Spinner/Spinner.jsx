import React from "react";

import "./Spinner.css";

const Spinner = ({ className, ...props }) => (
  <div className="spinner-wrapper">
    <svg
      className="spinner"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        className="path"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
);

export default Spinner;
