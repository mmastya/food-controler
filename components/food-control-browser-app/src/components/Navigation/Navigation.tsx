import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export function Navigation(prop): JSX.Element {
  return (
    <div className={"nav-wrapper"}>
      <nav className={"nav-bar"}>
        <h1 className={"nav-bar-title"}>{prop.title}</h1>
        <ul className={"nav-bar-list"}>
          <li className={"nav-bar-list__item"}>
            <Link to="/" className={"nav-bar-list__item-link"}>
              Home
            </Link>
          </li>
          <li className={"nav-bar-list__item"}>
            <Link to="/product" className={"nav-bar-list__item-link"}>
              Product
            </Link>
          </li>
          <li className={"nav-bar-list__item"}>
            <Link to="/meal" className={"nav-bar-list__item-link"}>
              Meal
            </Link>
          </li>
          <li className={"nav-bar-list__item"}>
            <Link to="/recipe" className={"nav-bar-list__item-link"}>
              Recipe
            </Link>
          </li>
          <li className={"nav-bar-list__item"}>
            <Link to="/calculation" className={"nav-bar-list__item-link"}>
              Calculation
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
