import React from "react";
import timeago from "timeago.js";

import "./Description.css";

const Description = ({ children, date, author, category }) => (
  <div className="description">
    <h1 className="title">{children}</h1>
    <div className="meta">
      <span className="date">
        submitted {timeago().format(date * 1000)} by {""}
      </span>
      <span className="author">{author}</span>
      <span className="category">{category}</span>
    </div>
  </div>
);

export default Description;
