import classes from "./ForeCast.module.css";
import { useSelector } from "react-redux";
function ForeCast({ newDate, rTempmax, rTempmin, icon }) {
  const isFehrenhite = useSelector((state) => state.degree.isFehrenhite);
  const isCelsius = useSelector((state) => state.degree.isCelsius);

  return (
    <div
      className={`${classes.forecast} lg:w-1/6 md:w-1/3 sm:w-70 vs:w-60 h-36`}
    >
      <div
        className={`${classes.date} w-full h-1/5 text-white flex flex-row justify-center`}
      >
        {newDate}
      </div>
      <div
        className={`${classes.icon} w-full h-3/5 flex flex-row justify-center items-center`}
      >
        {" "}
        {icon && (
          <img
            src={require(`../assets/weather-icons/${icon}.png`)}
            alt="forecasted weather icon"
            className={`${classes.mood}`}
          />
        )}
      </div>
      <div className={`${classes.temp} w-full h-1/5 text-white `}>
        {isFehrenhite && (
          <div
            className={`w-full flex flex-row justify-between items-center px-2`}
          >
            <span>{rTempmax}°F</span>
            <span className={`opacity-50 text-xs`}>{rTempmin}°F</span>
          </div>
        )}{" "}
        {isCelsius && (
          <div
            className={`w-full flex flex-row justify-between items-center px-2`}
          >
            <span>{rTempmax}°C</span>
            <span className={`opacity-50 text-xs`}>{rTempmin}°C</span>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default ForeCast;
