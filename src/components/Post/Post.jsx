import React from "react";
import Image from "../Image";

import "./Post.css";

const Post = ({ renderComments, comments, title, selftext, thumbnail }) => (
  <div>
    <h1>{title}</h1>
    {selftext && <div>{selftext}</div>}
    <Image title={title} src={thumbnail} wrapperClassName="post-thumnail" />
    <h3>comments:</h3>

    {comments.map((comment, i) => {
      return (
        <div key={i}>
          <span>{comment.data.score}</span>
          <p>{comment.data.body}</p>
          {renderComments(comment)}
        </div>
      );
    })}
  </div>
);

export default Post;
