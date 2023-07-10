import React from "react";
import BigCard from "../layout/BigCard";
import SmallCard from "../layout/SmallCard";
import classes from "./Details.module.css";
import { useSelector } from "react-redux";
function Details() {
  const windSpeed = useSelector((state) => state.degree.currentData.windSpeed);
  const visibility = useSelector(
    (state) => state.degree.currentData.visibility
  );
  const airPressure = useSelector(
    (state) => state.degree.currentData.airPressure
  );
  const humidity = useSelector((state) => state.degree.currentData.humidity);
  return (
    <div className={`${classes.details} w-full flex flex-col gap-5 py-2`}>
      <div className="w-full flex justify-around lg:flex-row md:flex-row sm:flex-row vs:flex-col vs:items-center">
        {" "}
        <BigCard>
          <div className="h-full flex justify-between p-6 text-white items-center flex-col ">
            <h3 className="opacity-50 text-white">Wind Speed</h3>
            <p className="text-3xl">
              <b>{windSpeed}</b> <span>Mph</span>
            </p>
          </div>
        </BigCard>
        <BigCard>
          {" "}
          <div className="h-full flex justify-between p-6 text-white items-center flex-col ">
            <h3 className="opacity-50 text-white">Humidity</h3>
            <p className="text-3xl">
              <b>{humidity}</b> <span>%</span>
            </p>
          </div>
        </BigCard>
      </div>
      <div className="w-full flex justify-around lg:flex-row md:flex-row sm:flex-row vs:flex-col vs:items-center">
        {" "}
        <SmallCard>
          {" "}
          <div className="h-full flex justify-between p-6 text-white items-center flex-col">
            <h3 className="opacity-50 text-white">Visibility</h3>
            <p className="text-3xl">
              <b>{visibility}</b> <span>Miles</span>
            </p>
          </div>
        </SmallCard>
        <SmallCard>
          {" "}
          <div className="h-full flex justify-between p-6 text-white items-center flex-col">
            <h3 className="opacity-50 text-white">Air Pressure</h3>
            <p className="text-3xl">
              <b>{airPressure}</b> <span>Mb</span>
            </p>
          </div>
        </SmallCard>
      </div>
    </div>
  );
}

export default Details;
