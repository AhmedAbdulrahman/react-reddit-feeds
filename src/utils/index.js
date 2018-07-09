const REDDIT = "https://www.reddit.com";

// format Subreddit score
export const formatScore = num =>
  num > 999 ? (num / 1000).toFixed(1) + "k" : num;

// Returns a list of posts from a subredd.
export const getSubreddits = async ({
  subreddit = "",
  subredditID = "",
  limit = 25,
  offset = "all"
}) => {
  let url;
  switch (offset) {
    case "next":
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}&after=${subredditID}`;
      break;
    case "prev":
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}&before=${subredditID}`;
      break;
    default:
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}`;
      break;
  }
  const res = await fetch(url);
  const result = await res.json();
  const { after, children } = result.data;
  return { after, posts: children };
};

// Returns single post from subreddit.
export const getSubredditDetails = async params => {
  const res = await fetch(
    `${REDDIT}/r/${params.sub}/comments/${params.author}/${params.title}.json`
  );
  const result = await res.json();
  const comments = result[1].data.children.map(obj => obj.data);
  return {
    content: result[0].data.children[0].data,
    comments
  };
};
