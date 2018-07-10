import React from "react";
import TreeView from "react-treeview";
import timeago from "timeago.js";

import { formatScore } from "../../utils";
import "react-treeview/react-treeview.css";

import "./Comment.css";

class Comment extends React.Component {
  renderReplies = c => {
    return c.replies
      ? c.replies.data.children.map(c => this.renderComment(c.data))
      : [];
  };

  renderComment = comment => {
    return (
      <TreeView key={comment.id} collapsed={false}>
        <div className="comment">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-score">{formatScore(comment.score)}</span>
          <span className="comment-date">
            {timeago().format(comment.created_utc * 1000)}
          </span>
          <div className="comment-details">
            <div className="comment.body">
              {comment.body}
              {this.renderReplies(comment)}
            </div>
          </div>
        </div>
      </TreeView>
    );
  };
  render() {
    const { comments } = this.props;

    return (
      <div className="comment-wrapper">
        {comments && comments.map(c => this.renderComment(c))}
      </div>
    );
  }
}

export default Comment;
