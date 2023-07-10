import React from "react";
import classes from "./SmallCard.module.css";

function SmallCard(props) {
  return (
    <div
      className={`${classes.small} lg:w-1/3 h-24 md:w-2/5 sm:w-2/5 vs:w-4/5 flex flex-col jusify-between items-center sm:my-2 vs:my-2`}
    >
      {props.children}
    </div>
  );
}

export default SmallCard;
