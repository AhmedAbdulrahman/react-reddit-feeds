const REDDIT = "https://www.reddit.com";

/**
 * @param  {number} score Post score
 * @returns  Returns formated score numbers as 8.4K
 */
export const formatScore = num =>
  num > 999 ? (num / 1000).toFixed(1) + "k" : num;

/**
 * @param  {string} url Post URL
 * @returns  Replace .gifv with .gif images extension
 */
export const converGifvToGif = url => {
  return `${url.replace(".gifv", ".gif")}`;
};

/**
 * @param  {string} subreddit Forum name
 * @param  {string} subredditID Use if more posts wanted.
 * @param  {number} limit Maximum number of items to return in this slice of the listing
 * @param  {string} offset Use to check pagination type
 * @returns  Returns a list of posts from a subreddit
 */
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

/**
 * @param  {string} sub Forum name
 * @param  {string} author  Authored by name
 * @param  {number} title Post title
 * @returns  Returns single post from subreddit.
 */
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
