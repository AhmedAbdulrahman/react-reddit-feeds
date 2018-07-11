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
export const converGifvToGif = ({ url, domain }) => {
  let postURL;
  if (domain === "gfycat.com") {
    postURL = `${url.replace("gfycat", "thumbs.gfycat")}-size_restricted.gif`;
    return postURL;
  } else if (domain.includes("imgur")) {
    postURL = `${url.replace(".gifv", ".gif")}`;
    return postURL.substr(-4, 1) === "." ? postURL : `${postURL}.gif`;
  } else if (domain === "i.redd.it") {
    return url;
  } else {
    postURL = null;
    return postURL;
  }
};

/**
 * @param  {string} subreddit Forum name
 * @param  {string} postName Use if more posts wanted.
 * @param  {number} limit Maximum number of items to return in this slice of the listing
 * @param  {string} offset Use to check pagination type
 * @returns  Returns a list of posts from a subreddit
 */
export const getSubreddits = async ({
  subreddit = "popular",
  postName = "",
  limit = 25,
  offset = ""
}) => {
  let url;
  switch (offset) {
    case "next":
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}&after=${postName}`;
      break;
    case "prev":
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}&before=${postName}`;
      break;
    default:
      url = `${REDDIT}/r/${subreddit}.json?limit=${limit}`;
      break;
  }

  const res = await fetch(url);
  const json = await res.json();
  if (res.status !== 200) throw Error(json.message);

  const { after, children } = json.data;
  const posts = children.filter(post => {
    return !post.data.is_self && post.data.preview;
  });
  return { after, posts };
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
