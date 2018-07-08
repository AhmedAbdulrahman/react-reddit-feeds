// Helper functions

// format Subreddit score
export const formatScore = num =>
  num > 999 ? (num / 1000).toFixed(1) + "k" : num;

const parse = response =>
  new Promise(resolve => {
    response
      .json()
      .then(data => resolve(data))
      .catch(() => resolve());
  });

// Helper on top of fetch.
export const request = (url, options) =>
  fetch(`https://www.reddit.com/r/${url}`, {
    ...options
  }).then(parse);
