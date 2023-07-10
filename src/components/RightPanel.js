import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { degreeActions } from "../store/degreeSlice";
import Details from "./Details";
import ForeCast from "./ForeCast";
import classes from "./RightPanel.module.css";
import Spinner from "../layout/Spinner";
function RightPanel() {
  // Constants and Variables
  const isCelsius = useSelector((state) => state.degree.isCelsius);
  const isFehrenhite = useSelector((state) => state.degree.isFehrenhite);
  const dispatch = useDispatch();
  const cRef = useRef();
  const fRef = useRef();
  const forecastData = useSelector((state) => state.degree.forecast);
  const [isLoading, setIsLoading] = useState(true);

  const currentCapital = useSelector(
    (state) => state.degree.currentData.currentCapital
  );
  //

  // Handling changes
  const degree = useSelector((state) => state.degree.currentData.currentDegree);

  const celsiusHandler = () => {
    dispatch(degreeActions.setIsCelsius());
    dispatch(degreeActions.convertToC(degree));
  };
  const fehrenhiteHandler = () => {
    dispatch(degreeActions.setIsFehrenhite());
    dispatch(degreeActions.convertToF(degree));
  };

  const convertDate = (epoch) => {
    const newDate = new Date(epoch * 1000).toDateString().split(" ");

    return `${newDate[0]}, ${newDate[1]} ${newDate[2]}`;
  };
  //

  // Styling
  useEffect(() => {
    if (isCelsius) {
      cRef.current.classList.add(classes.active);
      fRef.current.classList.remove(classes.active);
    } else {
      cRef.current.classList.remove(classes.active);
      fRef.current.classList.add(classes.active);
    }
  }, [isCelsius, isFehrenhite]);

  useEffect(() => {
    if (forecastData.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [forecastData.length]);

  //

  return (
    <div className={`${classes.rightContainer} flex flex-col `}>
      <div
        className={`${classes.control} h-11 flex justify-end p-2 items-center w-full`}
      >
        <div className="text-white flex justify-end items-center gap-2">
          <span
            className="text-sm flex items-center justify-center font-bold text-center w-6 h-6 rounded-full bg-slate-500 cursor-pointer transition-all"
            onClick={celsiusHandler}
            ref={cRef}
          >
            °C
          </span>
          <span
            className="text-sm flex items-center justify-center font-bold text-center w-6 h-6 rounded-full bg-slate-500 cursor-pointer transition-all"
            onClick={fehrenhiteHandler}
            ref={fRef}
          >
            °F
          </span>
        </div>
      </div>
      {/* ------- SEPARATOR -------- */}
      {isLoading ? (
        <div
          className={`${classes.spinner} w-full flex justify-center items-center h-36`}
        >
          {" "}
          <Spinner />
        </div>
      ) : (
        <div
          className={`${classes.cards} w-full gap-2 flex items-center justify-around lg:flex-row md:flex-row md:flex-wrap sm:flex-col vs:flex-col`}
        >
          {forecastData.map((day, index) => {
            return (
              <ForeCast
                date={day.date}
                newDate={convertDate(day.date)}
                temp={day.temp}
                rTempmax={day.rTempmax}
                rTempmin={day.rTempmin}
                icon={day.icon}
                key={`${currentCapital} + ${index}`}
              />
            );
          })}
        </div>
      )}

      <div className="w-full flex justify-center items-center text-white text-2xl">
        <h1 className="my-1">Today's Highlights</h1>
      </div>
      <div className={`${classes.details}`}>
        <Details />
      </div>
      <div
        className={`${classes.copyright} w-full flex justify-center align-center text-white text-sm h-full`}
      >
        Created By <b className="mx-2">Ahmed Sultan</b>- devChallenges.io
      </div>
    </div>
  );
}

export default RightPanel;
