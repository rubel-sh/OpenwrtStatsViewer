import React from "react";
import css from "./myCss.module.css";
const Uptime = (props) => {
  let time = props.latestTime.slice(0, -1);
  return <div className={css.uptimeParent}>Uptime: {time}</div>;
};

export default Uptime;
