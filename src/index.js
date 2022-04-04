import ReactDOM from "react-dom";
import React from "react";
import { App } from "../src/components/App";
// import { App, App2 } from "./components";
import './components/index.css'

// inline App
// const App = () => {
//   return <h1>react_tdd React APP</h1>;
// };

// removed <App2 />

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
