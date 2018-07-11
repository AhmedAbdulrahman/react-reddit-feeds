import React from "react";

import Media from "../../components/Media";
import Comment from "../../components/Comment";
import Spinner from "../../components/Spinner";

import { getSubredditDetails } from "../../utils";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: false,
      comments: [],
      isFetching: false,
      isError: false
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = async () => {
    const { params } = this.props.match;
    try {
      this.setState({ isFetching: true });
      const { content, comments } = await getSubredditDetails(params);
      this.setState({
        comments,
        content
      });
    } catch (e) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  renderContent = () => {
    const { content, comments } = this.state;
    if (content) {
      return (
        <div className="post">
          <Media {...content} />
          <Comment comments={comments} totalComments={content.num_comments} />
        </div>
      );
    }
    return null;
  };

  render() {
    const { isFetching } = this.state;

    if (isFetching) {
      return <Spinner width="65px" height="65px" />;
    } else {
      return this.renderContent();
    }
  }
}

export default Post;
