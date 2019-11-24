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

declare let process;

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
}
