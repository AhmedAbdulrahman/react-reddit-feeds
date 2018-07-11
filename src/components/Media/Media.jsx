import React from "react";
import ReactPlayer from "react-player";

import Image from "../../components/Image";

import { converGifvToGif } from "../../utils";
import redditIcon from "../../reddit-icon.png";

// Extract media link from Iframe
const extractMediaLink = mediaLink => {
  return mediaLink ? /src="(.*?)&/g.exec(mediaLink)[1] : null;
};

const Media = ({
  secure_media_embed: { content: media_content },
  url,
  domain,
  media,
  is_video,
  selftext,
  title
}) => {
  const mediaLink = extractMediaLink(media_content);
  // Convert gifv images
  let imgURL = converGifvToGif({ url, domain });
  if (imgURL === null) imgURL = redditIcon;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      {selftext && <div>{selftext}</div>}
      {!is_video ? (
        <Image
          title={title}
          src={imgURL}
          wrapperClassName="post-thumnail"
          fallback_url={redditIcon}
        />
      ) : null}
      {is_video ? (
        <ReactPlayer
          url={media ? media.reddit_video.fallback_url : mediaLink}
          width="100%"
          height="500px"
          playing={true}
          volume={0.8}
          muted={false}
          onReady={() => console.log("onReady")}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Media;
