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
      currentSubreddit: "popular",
      searchTerm: "",
      after: "",
      lastUpdated: "",
      limit: 25,
      isError: false,
      notFound: false,
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.fetchSubreddits({});
  }

  handleOnChangeOption = ({ target: { value: limit } }) => {
    this.setState({ limit }, () => this.fetchSubreddits({ limit }));
  };

  onChangeQuery = ({ target: { value: searchTerm } }) => {
    this.setState({ searchTerm });
  };

  handleOnClick = e => {
    e.preventDefault();
    const { limit, searchTerm } = this.state;
    if (searchTerm === "") return;
    this.fetchSubreddits({ limit, subreddit: searchTerm });
  };

  // goto next page
  getNextPage = () => {
    const { after, limit } = this.state;
    this.fetchSubreddits({
      limit,
      postName: after,
      offset: "next"
    });
  };

  // goback to previous page
  getPrevPage = () => {
    const { limit, posts } = this.state;
    if (!posts.length > -1) {
      const postName = posts[0].data.name;
      this.fetchSubreddits({
        postName,
        limit,
        offset: "prev"
      });
    }
  };

  fetchSubreddits = async ({ subreddit, postName, limit, offset }) => {
    try {
      this.setState({ isFetching: true, isError: false, notFound: false });

      const { after, posts } = await getSubreddits({
        subreddit,
        postName,
        limit,
        offset
      });
      this.setState({
        posts,
        after,
        lastUpdated: Date.now()
      });
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: error.message
      });
    } finally {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    const {
      limit,
      isFetching,
      posts,
      isError,
      errorMessage,
      lastUpdated,
      notFound
    } = this.state;
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
            Ayyyy, {errorMessage}
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
          <Button onClick={this.getPrevPage} disabled={isError || notFound}>
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
