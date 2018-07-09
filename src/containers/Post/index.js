import React from "react";
import Image from "../../components/Image";
import Comment from "../../components/Comment";

import { getSubredditDetails } from "../../utils";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
      comments: []
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    const { content, comments } = await getSubredditDetails(params);
    this.setState({
      content,
      comments
    });
  }

  render() {
    const { content, comments } = this.state;
    return (
      <div className="post">
        <h1>{content.title}</h1>
        {content.selftext && <div>{content.selftext}</div>}
        <Image
          title={content.title}
          src={content.thumbnail}
          wrapperClassName="post-thumnail"
        />
        <h3>Comments: ({content.num_comments})</h3>
        <Comment comments={comments} />
      </div>
    );
  }
}

export default Post;
