import React from "react";
import PropTypes from "prop-types";

import "./Image.css";

const Image = ({ thumbnail, title }) => (
  <img
    className="thumbnail"
    src={thumbnail}
    alt={title}
    onError={e => {
      e.target.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    }}
  />
);

Image.propTypes = {
  className: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string
};

Image.defaultProps = {
  className: "",
  thumbnail: "",
  title: ""
};

export default Image;
