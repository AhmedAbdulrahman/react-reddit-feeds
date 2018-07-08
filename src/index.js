import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import Container from "./components/Container";
import List from "./containers/List";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const App = () => (
  <Container>
    <Switch>
      <Route exact path="/" component={List} />
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
