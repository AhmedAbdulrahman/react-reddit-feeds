import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import Container from "./components/Container";
import List from "./containers/List";
import Post from "./containers/Post";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const App = () => (
  <Container>
    <Switch>
      <Route exact path="/" component={List} />
      <Route path="/r/:sub/comments/:author/:title" component={Post} />
    </Switch>
  </Container>
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

registerServiceWorker();
