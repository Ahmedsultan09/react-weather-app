import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCelsius: false,
  isFehrenhite: true,
  currentData: {
    currentCondition: "",
    currentDegree: null,
    currentIcon: "",
    renderedDegree: null,
    windSpeed: null,
    humidity: null,
    visibility: null,
    airPressure: null,
    currentCapital: "Moscow",
  },
  forecast: [],
  isLoading: true,
};

const degreeSlice = createSlice({
  name: "degree",
  initialState,
  reducers: {
    setIsCelsius(state, action) {
      state.isCelsius = true;
      state.isFehrenhite = false;
    },
    setIsFehrenhite(state, action) {
      state.isCelsius = false;
      state.isFehrenhite = true;
    },
    convertToC(state, action) {
      state.currentData.renderedDegree = Math.ceil(
        ((state.currentData.currentDegree - 32) * 5) / 9
      );
      for (let i = 0; i < 5; i++) {
        state.forecast[i].rTempmax = Math.ceil(
          ((state.forecast[i].tempmax - 32) * 5) / 9
        );
        state.forecast[i].rTempmin = Math.ceil(
          ((state.forecast[i].tempmin - 32) * 5) / 9
        );
      }
    },
    convertToF(state, action) {
      state.currentData.renderedDegree = state.currentData.currentDegree;
      for (let i = 0; i < 5; i++) {
        state.forecast[i].rTempmax = state.forecast[i].tempmax;
        state.forecast[i].rTempmin = state.forecast[i].tempmin;
      }
    },

    setCurrentData(state, action) {
      state.currentData.currentDegree = action.payload.currentDegree;
      state.currentData.currentCondition = action.payload.currentCondition;
      state.currentData.currentIcon = action.payload.currentIcon;
      state.currentData.renderedDegree = action.payload.renderedDegree;
      state.currentData.airPressure = action.payload.airPressure;
      state.currentData.windSpeed = action.payload.windSpeed;
      state.currentData.humidity = action.payload.humidity;
      state.currentData.visibility = action.payload.visibility;
    },
    setForecastData(state, action) {
      state.forecast = [
        ...state.forecast,
        {
          date: action.payload.date,
          temp: action.payload.temp,
          tempmax: action.payload.tempmax,
          rTempmax: action.payload.rTempmax,
          tempmin: action.payload.tempmin,
          rTempmin: action.payload.rTempmin,
          icon: action.payload.icon,
          id: action.payload.id,
        },
      ];
    },
    clearForecastData(state, action) {
      state.forecast = [];
    },
    setCurrentCapital(state, action) {
      state.currentData.currentCapital = action.payload;
    },
    setIsLoadingFalse(state, action) {
      state.isLoading = false;
    },
    setIsLoadingTrue(state, action) {
      state.isLoading = true;
    },
  },
});

export const degreeActions = degreeSlice.actions;

export default degreeSlice;
