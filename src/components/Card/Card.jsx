import React from "react";

import Image from "../Image";
import Description from "../Description";
import Permalink from "../Description/Permalink";

import { formatScore } from "../../utils";
import fallBackImage from "../../reddit-icon.png";
import "./Card.css";

class Card extends React.Component {
  render() {
    const { subreddit } = this.props;

    return (
      <div className="item">
        <Image
          src={subreddit.thumbnail}
          title={subreddit.title}
          fallbackSrc={fallBackImage}
        />
        <Description
          author={subreddit.author}
          date={subreddit.created}
          category={subreddit.subreddit}
        >
          <Permalink
            isSelf={subreddit.is_self}
            title={subreddit.title}
            href={subreddit.url}
            permalink={subreddit.permalink}
          />
        </Description>
        <div className="score">
          <h2 className="count">{formatScore(subreddit.score)}</h2>
        </div>
      </div>
    );
  }
}

export default Card;
