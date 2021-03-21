import { combineReducers } from "redux"

import reminders from './reminders'
import forecast from './forecast'

const rootReducer = combineReducers({
  reminders,
  forecast,
})

export default rootReducer