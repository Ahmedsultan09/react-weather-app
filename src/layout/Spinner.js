import React from "react";
import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div>
      <span className={classes.loader}></span>
    </div>
  );
}

export default Spinner;
