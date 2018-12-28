import React from "react";
import ReactDOM from "react-dom";

import Scroller from "./components/Scroller/Scroller";

class App extends React.Component {
  render() {
    return (
      <Scroller />
    );
  }
}

const el = document.querySelector("#app");

ReactDOM.render(<App />,el);
