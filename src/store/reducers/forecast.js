import axios from "axios"

import { isDateInApiRange } from '../../helpers/date'

export const FETCH_FORECAST = "forecast/fetchForecast"
export const ADD_FORECAST = "forecast/addForecast"
export const FETCH_FAILED = "forecast/fetchFailed"

const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

const initialState = {
  forecast: [],
  currentCity: null,
  currentDate: null,
  isFetching: false,
  error: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FORECAST:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case ADD_FORECAST:
      return {
        ...state,
        forecast: state.forecast.length === 0
          ? [processWeatherData(action.payload)]
          : [...state.forecast, processWeatherData(action.payload)],
        isFetching: true,
      }
    case FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: "Data in unavailable for this city",
      }
    default:
      return state
  }
}

export const fetchForecast = ({ city, date }) => {
  return async (dispatch, getState) => {
    const state = getState()
    
    const stateIncludesCity =
      state.forecast.length > 0 &&
      state.forecast.includes((el) => el.city === city)
    const reminderDateInApiRange = isDateInApiRange(date)
  
    if (stateIncludesCity || !reminderDateInApiRange) {
      return
    }

    dispatch({
      type: FETCH_FORECAST,
    })
  
    try {
      const urlCity = capitalizeAndEncode(city)
      const { data } = await axios.get(
        `${BASE_URL}?q=${urlCity}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
  
      dispatch({
        type: ADD_FORECAST,
        payload: data,
      })
    } catch (e) {
      dispatch({
        type: FETCH_FAILED,
      })
    }
  }
}


const processWeatherData = (data) => {
  const weather = data.list.map((el) => ({
    date: el.dt_txt,
    weather: el.weather[0].main,
  }))
  return {
    city: data.city.name,
    weather 
  }
}

const capitalizeFirstLetters = (words) => {
  if (!words) return
  const wordArray = words.split(" ")
  return wordArray
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")
}

const uriEncodeWord = (word) => {
  if (!word) return
  return encodeURIComponent(word)
}

const capitalizeAndEncode = (words) =>
  uriEncodeWord(capitalizeFirstLetters(words))
