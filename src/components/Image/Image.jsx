import React from "react";
import PropTypes from "prop-types";

import Icon from "../Icon";
import "./Image.css";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fallback = () => {
      if (this.props.fallbackSrc) {
        this.setState({ failed: true });
      }
    };
  }
  render() {
    const { title } = this.props;
    let image;
    if (this.state.failed) {
      image = (
        <img
          className="thumbnail fallback"
          alt={title}
          src={this.props.fallbackSrc}
        />
      );
    } else {
      image = (
        <img
          src={this.props.src}
          className="thumbnail"
          alt={title}
          onError={this.fallback}
        />
      );
    }
    return <div className="thumbnail-wrapper">{image}</div>;
  }
}

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
