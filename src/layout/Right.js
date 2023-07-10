import React from "react";
import classes from "./Right.module.css";
function Right(props) {
  return (
    <div
      className={`${classes.right} flex justify-center items-center lg:w-3/4 md:w-full sm:w-full vs:w-full lg:h-full md:h-3/5 sm:h-3/5 vs:h-3/5 `}
    >
      {props.children}
    </div>
  );
}

export default Right;
