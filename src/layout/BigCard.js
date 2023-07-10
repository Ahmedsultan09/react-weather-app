import React from "react";
import classes from "./BigCard.module.css";

function BigCard(props) {
  return (
    <div
      className={`${classes.big} lg:w-1/3 h-32 md:w-2/5 sm:w-1/5 vs:w-4/5 flex flex-col justify-between md:my-2 sm:my-2 vs:my-2 items-center`}
    >
      {props.children}
    </div>
  );
}

export default BigCard;
