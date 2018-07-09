import React from "react";
import { getSubredditDetails } from "../../utils";

import SinglePost from "../../components/Post";

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

  getCommentChildren = comment => {
    let { replies } = comment.data;
    if (typeof replies === "object") {
      return replies.data.children.map((comment, i) => {
        return (
          <div key={i}>
            <span>{comment.data.score}</span>
            <p>{comment.data.body}</p>
            {this.getCommentChildren(comment)}
          </div>
        );
      });
    }
  };

  render() {
    var { content, comments } = this.state;
    return (
      <SinglePost
        title={content.title}
        selftext={content.selftext}
        comments={comments}
        renderComments={this.getCommentChildren}
        thumbnail={content.thumbnail}
      />
    );
  }
}

export default Post;
