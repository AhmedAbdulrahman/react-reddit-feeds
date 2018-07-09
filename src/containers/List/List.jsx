import React from "react";
import { getSubreddits } from "../../utils";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import "./List.css";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isFetching: false,
      subreddit: "popular",
      searchTerm: "",
      after: "",
      lastUpdated: "",
      limit: 25,
      isError: false
    };
  }

  componentDidMount() {
    const { subreddit, limit } = this.state;
    if (!localStorage.getItem("subreddit-data")) {
      this.fetchSubreddits(subreddit, limit);
    } else {
      this.setState({
        posts: JSON.parse(localStorage.getItem("subreddit-data"))
      });
    }
  }

  handleOnChangeOption = ({ target: { value: limit } }) => {
    const { subreddit, searchTerm } = this.state;
    this.setState({ limit }, () =>
      this.fetchSubreddits(searchTerm || subreddit, limit)
    );
  };

  onChangeQuery = ({ target: { value: searchTerm } }) => {
    this.setState({ searchTerm });
  };

  handleOnClick = e => {
    e.preventDefault();
    const { limit, searchTerm, subreddit } = this.state;
    if (searchTerm === "") return;
    this.fetchSubreddits(searchTerm || subreddit, limit);
  };

  getNextPage = () => {
    const { subreddit, after, limit, searchTerm } = this.state;
    this.fetchSubreddits(searchTerm || subreddit, limit, after, "next");
  };

  getPrevPage = () => {
    const { subreddit, limit, posts, searchTerm } = this.state;
    if (!posts.length > -1) {
      const firstItem = posts[0].data.name;
      this.fetchSubreddits(searchTerm || subreddit, limit, firstItem, "prev");
    }
  };

  fetchSubreddits = async (subreddit, subredditID, limit, offset) => {
    try {
      this.setState({ isFetching: true, isError: false });
      const lists = await getSubreddits(subreddit, limit, subredditID, offset);
      const { after, posts } = lists;
      this.setState({
        posts,
        after,
        lastUpdated: Date.now()
      });
      localStorage.setItem("subreddit-data", JSON.stringify(posts));
    } catch (e) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  render() {
    const { limit, isFetching, posts, isError, lastUpdated } = this.state;
    return (
      <React.Fragment>
        <h1>Reddit Feed Client</h1>
        <form className="form" onSubmit={e => e.preventDefault()}>
          <div className="form-control">
            <Input
              type="text"
              value={this.state.searchTerm}
              placeholder="Search for Subreddit..."
              onChangeInput={this.onChangeQuery}
            />
            <Button htmlType="submit" onClick={this.handleOnClick}>
              Search
            </Button>
          </div>
          <div className="options-wrapper">
            <select
              className="subreddit-limit"
              value={limit}
              onChange={this.handleOnChangeOption}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>

            <span className="lastupdate">
              Last updated at{" "}
              {lastUpdated && new Date(lastUpdated).toLocaleTimeString()}
            </span>
          </div>
        </form>
        {isError && (
          <p>
            Ayyyy, subreddit not found{" "}
            <span role="img" aria-label="sad">
              😿
            </span>
          </p>
        )}

        <div className="container">
          {isFetching && <Spinner width="65px" height="65px" />}
          {posts.map((post, i) => <Card subreddit={post.data} key={i} />)}
        </div>
        <div className="pagination">
          <Button onClick={this.getPrevPage} disabled={isError && true}>
            Prev
          </Button>
          <Button onClick={this.getNextPage} disabled={isError && true}>
            Next
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
