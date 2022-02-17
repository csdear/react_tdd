import { parseISO, format } from "date-fns";
import React from "react";
import dateStyles from "./date.module.css";

// failed to render, warning with error message :
// export 'Date' (imported as 'Date') was not found in '../Date/Date' (possible exports: default)
// for format :
// export default function Date({ dateString }) {
// Corrected to :
// export const App2 = () => {
export const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <time className={dateStyles.main} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
};
