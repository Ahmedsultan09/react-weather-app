import axios from "axios";
import { useEffect } from "react";
import classes from "./App.module.css";
import "./index.css";
import Container from "./layout/Container";
import { degreeActions } from "./store/degreeSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./layout/Spinner";

function App() {
  const dispatch = useDispatch();
  const currentCapital = useSelector(
    (state) => state.degree.currentData.currentCapital
  );
  const isLoading = useSelector((state) => state.degree.isLoading);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentCapital}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Ccurrent&key=UH84B5CKUWE4E5ZKBE346H34S&options=beta&contentType=json&iconSet=icons2`;
  useEffect(() => {
    axios.get(url).then((res) => {
      dispatch(
        degreeActions.setCurrentData({
          currentDegree: res.data.currentConditions.temp,
          currentCondition: res.data.currentConditions.conditions,
          currentIcon: res.data.currentConditions.icon,
          renderedDegree: res.data.currentConditions.temp,
          windSpeed: res.data.currentConditions.windspeed,
          airPressure: res.data.currentConditions.pressure,
          humidity: res.data.currentConditions.humidity,
          visibility: res.data.currentConditions.visibility,
        })
      );
      for (let i = 1; i < 6; i++) {
        dispatch(
          degreeActions.setForecastData({
            date: res.data.days[i].datetimeEpoch,
            temp: res.data.days[i].temp,
            tempmax: res.data.days[i].tempmax,
            tempmin: res.data.days[i].tempmin,
            rTempmax: res.data.days[i].tempmax,
            rTempmin: res.data.days[i].tempmin,
            icon: res.data.days[i].icon,
            id: i,
          })
        );
      }
      dispatch(degreeActions.setIsLoadingFalse());
    });
  }, [dispatch, url, currentCapital]);
  useEffect(() => {
    dispatch(degreeActions.setIsLoadingTrue());
  }, [dispatch]);
  return (
    <div className={`${classes.app} flex justify-center items-center`}>
      {isLoading ? <Spinner /> : <Container />}
    </div>
  );
}

export default App;
