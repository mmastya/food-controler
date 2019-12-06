import React from "react";
import { Router, Switch, Route } from "react-router";
import { createBrowserHistory } from "history";
import { Home } from "../Home/Home";
import "./App.css";
import { CalculationPage } from "../CalculationPage/CalculationPage";
import { ProductPage } from "../ProductPage/ProductPage";
import { MealPage } from "../MealPage/MealPage";

export const browserHistory = createBrowserHistory();

export const App = (): JSX.Element => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product" component={ProductPage} />
        <Route path="/meal" component={MealPage} />
        <Route path="/calculation" component={CalculationPage} />
      </Switch>
    </Router>
  );
};
