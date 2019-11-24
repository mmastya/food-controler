import React from "react";
import { Router, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "../Home/Home";
import "./App.css";

export const browserHistory = createBrowserHistory();

export const App = (): JSX.Element => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
