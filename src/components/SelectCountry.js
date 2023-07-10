import React, { useEffect, useRef, useState } from "react";
import classes from "./SelectCountry.module.css";
import Capitals from "../countries.json";
import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../store/layoutSlice";
import { degreeActions } from "../store/degreeSlice";

function SelectCountry() {
  // Contants and variables
  const [searchText, setSearchText] = useState("");
  const [filteredCapitals, setFilteredCapitals] = useState([]);
  const [choosenCountry, setChoosenCountry] = useState("");
  const [toggleChoices, setToggleChoices] = useState(false);
  const [isEmpty, setIsEmpty] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const currentCapital = useSelector(
    (state) => state.degree.currentData.currentCapital
  );
  const capitals = Capitals.map((cap) => cap.capital);
  const dispatch = useDispatch();
  const containerSearch = useRef(null);

  // List rendering
  const searchList = filteredCapitals.map((cap, index) => {
    return (
      <li
        className={`${classes.item} flex justify-center items-center`}
        key={`${cap} + ${index}`}
        onClick={handleClick}
      >
        {cap}
      </li>
    );
  });

  // Events handling
  function handleChange(e) {
    const value = e.target.value;
    setSearchText(value);
  }

  function handleClick(e) {
    const value = e.target.innerText;
    setChoosenCountry(value);
    setToggleChoices(false);
  }

  // The code below used for layout anmiations and switching between choosing capital and viewing data

  const handleDataPanel = () => {
    setTimeout(() => {
      dispatch(layoutActions.setDataPanel());
    }, [500]);
    containerSearch.current.classList.add(classes.slideRight);
  };

  const handleCheckResults = () => {
    dispatch(degreeActions.clearForecastData());
    dispatch(degreeActions.setCurrentCapital(choosenCountry));
    dispatch(degreeActions.setIsLoadingTrue());
    handleDataPanel();
  };

  // Side effects
  useEffect(() => {
    if (choosenCountry.toLowerCase() === currentCapital.toLowerCase()) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [choosenCountry, currentCapital]);

  useEffect(() => {
    const newCaps = capitals.filter((cap) =>
      cap.toLowerCase().startsWith(searchText.toLowerCase())
    );
    if (searchText.length > 0) {
      setFilteredCapitals(newCaps);
      setToggleChoices(true);
      setIsEmpty(false);
    } else {
      setFilteredCapitals([]);
      setIsEmpty(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className={`${classes.container}`} ref={containerSearch}>
      {/* Search input */}
      <div
        className={`${classes.inputContainer} flex justify-between items-center`}
      >
        <i
          className={`${classes.arrow} fa-solid fa-arrow-left text-white`}
          onClick={handleDataPanel}
        ></i>{" "}
        <input
          type="text"
          className={`${classes.cssInput}`}
          placeholder="Search for a capital"
          onChange={handleChange}
        />
      </div>

      {/* Separator */}

      {/* List of capitals rendered on demand */}

      {toggleChoices && !isEmpty ? (
        <ul
          className={`${classes.selections} flex flex-col justify-start items-center`}
        >
          {searchList}
        </ul>
      ) : (
        <div className={classes.choosen}>
          {isEmpty ? (
            <div>Try to discover more!</div>
          ) : (
            <div className={classes.choosen}>
              <p>{choosenCountry}</p>
              <i className={`${classes.checkMark} fa-solid fa-check`}></i>
            </div>
          )}
        </div>
      )}
      {disabled && (
        <div className="text-white font-bold">
          Try to find another Capital !
        </div>
      )}

      {/* Separator */}

      {/* cCheck results button */}
      <div className={classes.btnContainer}>
        <button
          className={classes.btn}
          disabled={disabled}
          onClick={handleCheckResults}
        ></button>
      </div>
    </div>
  );
}

export default SelectCountry;
