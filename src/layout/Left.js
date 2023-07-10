import React from "react";
import classes from "./Left.module.css";
function Left(props) {
  return (
    <div
      className={`${classes.left} flex justify-center items-center lg:w-1/4 md:w-full sm:w-full vs:w-full lg:h-full md:h-full sm:h-full vs:h-full relative`}
    >
      {props.children}
    </div>
  );
}

export default Left;
