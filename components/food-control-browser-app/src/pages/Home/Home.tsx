import React from "react";
import { observer } from "mobx-react-lite";
import "./Home.css";
import { Navigation } from "../../components/Navigation/Navigation";

export const Home = observer(
  (): JSX.Element => {
    return (
      <div>
        <Navigation title="Home" />
      </div>
    );
  },
);
