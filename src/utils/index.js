const REDDIT = "https://www.reddit.com";

// format Subreddit score
export const formatScore = num =>
  num > 999 ? (num / 1000).toFixed(1) + "k" : num;

// Returns a list of posts from a subredd.
export const getSubreddits = async (
  subreddit = "",
  subredditID = "",
  limit = 25,
  offset = "all"
) => {
  let url;
  console.log(subreddit);
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
  try {
    const res = await fetch(url);
    const result = await res.json();
    const { after, children } = result.data;
    return { after, posts: children };
  } catch (exception) {
    console.error(`Failed to retrieve subreddit information: (${exception})`);
  }
};

// Returns single post from subreddit.
