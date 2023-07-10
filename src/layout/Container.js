import React from "react";
import DataPanel from "../components/DataPanel";
import RightPanel from "../components/RightPanel";
import classes from "./Container.module.css";
import Left from "./Left";
import Right from "./Right";
import SelectCountry from "../components/SelectCountry";
import { useSelector } from "react-redux";
function Container(props) {
  const isForecast = useSelector((state) => state.layout.isForecast);
  return (
    <div
      className={`${classes.container} flex lg:flex-row md:flex-col sm:flex-col vs:flex-col`}
    >
      <Left>{isForecast ? <DataPanel /> : <SelectCountry />}</Left>
      <Right>
        <RightPanel />
      </Right>
    </div>
  );
}

export default Container;
