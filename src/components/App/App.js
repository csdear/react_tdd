import styles from "./styles.module.css";
import React from "react"; // dunno why but had to add else react is not defined..
import { App2 } from "../App2/App2";
import { Date } from "../Date/Date";

export const App = () => {
  const date = "2020-01-01";
  return (
    <div className={styles.main}>
      <h2>Welcome to react_tdd</h2>
      <Date dateString={date} />
    </div>
  );
};
