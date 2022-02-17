import ReactDOM from "react-dom";
import React from "react";
// import { App } from "../src/components/App";
import { App, App2 } from "./components";

// inline App
// const App = () => {
//   return <h1>react_tdd React APP</h1>;
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
    <App2 />
  </React.StrictMode>,
  document.getElementById("root")
);
