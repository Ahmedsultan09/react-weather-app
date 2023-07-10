import React, { useRef } from "react";
import classes from "./DataPanel.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../store/layoutSlice";
import axios from "axios";
import { degreeActions } from "../store/degreeSlice";
function LeftPanel(props) {
  // constant and variales
  const [disabled, setDisabled] = useState(null);
  const isCelsius = useSelector((state) => state.degree.isCelsius);
  const isFehrenhite = useSelector((state) => state.degree.isFehrenhite);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const renderedDegree = useSelector(
    (state) => state.degree.currentData.renderedDegree
  );
  const currentCapital = useSelector(
    (state) => state.degree.currentData.currentCapital
  );
  const currentCondition = useSelector(
    (state) => state.degree.currentData.currentCondition
  );
  const currentIcon = useSelector(
    (state) => state.degree.currentData.currentIcon
  );

  // setting current date
  const date = new Date(Date.now());
  const convertDate = (date) => {
    const dateArray = date.toDateString().split(" ");
    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}`;
  };

  // Handeling events
  const handleSearch = () => {
    setTimeout(() => {
      dispatch(layoutActions.setSearch());
    }, 500);
    containerRef.current.classList.add(classes.slideLeft);
  };

  // Getting user location
  const handleLocationSuccess = (position) => {
    // Retrieve latitude and longitude from the position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const fetchCityData = async (latitude, longitude) => {
      const apiKey = "2aad992d9e0e41e5a853e3176da8e49d";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results && results.length > 0) {
          const city = results[0].components.city;
          // Poreventing setting current capital to the same value to avoid crashes
          if (city === currentCapital) {
            setDisabled(true);
          } else {
            setDisabled(false);
            dispatch(degreeActions.clearForecastData());
            dispatch(degreeActions.setCurrentCapital(city));
            dispatch(degreeActions.setIsLoadingTrue());
          }
        }
      } catch (error) {
        console.log("Error fetching city data:", error);
      }
    };
    setDisabled(true);
    fetchCityData(latitude, longitude);
  };

  const handleLocationButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      // Geolocation is not supported by the browser
      console.log("Geolocation is not supported");
    }
  };

  const handleLocationError = (error) => {
    // Handle geolocation error
    console.log("Geolocation error:", error.message);
  };

  return (
    <div
      className={`${classes.leftContainer} flex flex-col `}
      ref={containerRef}
    >
      {/* ------------ SEPARATOR ----------- */}
      <div
        className={`${classes.control} h-11 flex justify-between p-2 items-center w-full`}
      >
        <button
          className={`w-32 h-15 text-sm text-white bg-slate-500`}
          onClick={handleSearch}
        >
          Search for places
        </button>

        <button disabled={disabled} onClick={handleLocationButtonClick}>
          <i className="fa-solid fa-location-crosshairs rounded-full w-6 h-6 flex justify-center items-center cursor-pointer text-white bg-slate-500"></i>
        </button>
      </div>
      {/* ------------ SEPARATOR ----------- */}
      <div className={`${classes.icon} w-full h-2/6 relative overflow-hidden`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className={`${classes.image} `}></div>
          {currentIcon && (
            <img
              src={require(`../assets/weather-icons/${currentIcon}.png`)}
              alt="current weather icon"
              className={`${classes.mood}`}
            />
          )}
        </div>
      </div>
      {/* ------------ SEPARATOR ----------- */}
      <div
        className={`${classes.degree} w-full flex justify-center items-center flex-col h-2/6 text-6xl text-white m-0 text-center`}
      >
        <div className={`flex flex-row items-center justify-center`}>
          {" "}
          {renderedDegree}
          {isCelsius && <span className="text-2xl opacity-50">°C</span>}
          {isFehrenhite && <span className="text-2xl opacity-50">°F</span>}
        </div>
      </div>
      {/* ------------ SEPARATOR ----------- */}
      <div className="text-xl h-1/6 flex items-center justify-center opacity-50 text-white">
        {currentCondition}
      </div>

      {/* ------------ SEPARATOR ----------- */}
      <div
        className={`${classes.time} h-1/6 flex justify-center flex-col items-center text-white text-sm opacity-60`}
      >
        {`Today . ${convertDate(date)}`}
        <div>
          <i className="fa-solid fa-location-dot mx-2 text-xs"></i>
          {currentCapital}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
