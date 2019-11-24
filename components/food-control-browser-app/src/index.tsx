import { configure } from "mobx";
import { App } from "pages/App/App";
import React from "react";
import ReactDOM from "react-dom";

configure({
  enforceActions: "always",
});

let container;

const render = (Root): void => {
  ReactDOM.render(<Root />, container);
};

document.addEventListener("DOMContentLoaded", () => {
  container = document.getElementById("root");

  render(App);
});

declare let module: any;

if (module.hot) {
  module.hot.accept("./pages/App/App", () => {
    render(App);
  });
}
