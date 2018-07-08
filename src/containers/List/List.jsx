import React from "react";
import { request } from "../../utils";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./List.css";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isFetching: false,
      searchTerm: "",
      currentSub: "popular",
      lastUpdated: "",
      limit: 25,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchPosts(this.state.currentSub, this.state.limit);
  }

  onChangeOption = ({ target: { value: limit } }) => {
    const { searchTerm, currentSub } = this.state;
    this.setState({ limit });
    this.fetchPosts(searchTerm || currentSub, limit);
  };

  onChangeQuery = ({ target: { value: searchTerm } }) => {
    this.setState({ searchTerm });
  };

  handleOnClick = e => {
    e.preventDefault();
    const { searchTerm, currentSub, limit } = this.state;
    this.fetchPosts(searchTerm || currentSub, limit);
  };

  fetchPosts = (searchTerm, limit) => {
    this.setState({ isFetching: true });
    request(`${searchTerm || "all"}.json?limit=${limit}`)
      .then(({ error, data }) => {
        if (error) {
          console.log("error:", error);
          this.setState({ error });
        } else {
          this.setState({
            posts: data.children,
            lastUpdated: Date.now(),
            error: ""
          });
        }
      })
      .then(() => this.setState({ isFetching: false }));
  };

  render() {
    const { limit, isFetching, posts, error, lastUpdated } = this.state;
    // if (isFetching) {
    //   return (
    //     <div>
    //       <h2 style={{ textAlign: "center" }}>Loading...</h2>
    //     </div>
    //   );
    // }
    return (
      <React.Fragment>
        <h1>Listing...</h1>
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
              onChange={this.onChangeOption}
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
        {error && <p>We didn't find any results</p>}

        {/* {isFetching && <h1>Fetching Posts ....</h1>} */}
        <div className="container">
          {posts.map((post, i) => <Card subreddit={post.data} key={i} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
