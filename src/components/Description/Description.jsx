import React from "react";
import TimeAgo from "react-timeago";

import "./Description.css";

const timestampToDate = function(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

const Description = ({ children, date, author, category }) => (
  <div className="description">
    <h1 className="title">{children}</h1>
    <div className="meta">
      <span className="date">
        submitted <TimeAgo date={timestampToDate(date)} /> by {""}
      </span>
      <span className="author">{author}</span>
      <span className="category">{category}</span>
    </div>
  </div>
);

export default Description;
