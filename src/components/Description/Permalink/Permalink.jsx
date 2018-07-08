import React from "react";
import { Link } from "react-router-dom";

const Permalink = ({ isSelf, href, permalink, title }) => {
  if (isSelf)
    return (
      <a href={href} target="_blank" style={{ flex: "1" }}>
        {title}
      </a>
    );
  return (
    <Link to={permalink} style={{ flex: "1" }}>
      {title}
    </Link>
  );
};

export default Permalink;
