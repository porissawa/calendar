import { v4 as uuid } from 'uuid'

import { splitDate } from '../../helpers/date'

export const ADD_REMINDER = 'reminder/addReminder'
export const UPDATE_REMINDER = 'reminder/updateReminder'
export const DELETE_REMINDER = 'reminder/deleteReminder'

const initialState = {
  reminders: {}
}

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case ADD_REMINDER:
      return {
        ...state,
        reminders: addReminder(state, action.payload)
      }
    case UPDATE_REMINDER:
      return {
        ...state,
        reminders: updateReminder(state, action.payload)
      }
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: deleteReminder(state, action.payload)
      }
    default:
      return state
  }
}

// since redux-toolkit's createReducer is a wrapper around immer,
// it's not necessary to use its produce function here

const addReminder = (state, { date, time, text, city, color }) => {
  const { currentDay, currentMonth, currentYear } = splitDate(date)
  let remindersCopy = {...state.reminders}
  const yearHasReminder = remindersCopy[currentYear]
  const newReminder = {
    id: uuid(),
    date,
    time,
    text,
    city,
    color,
    forecast: null,
  }
  
  if (!yearHasReminder) {
    remindersCopy[currentYear] = {}
  }

  const monthHasReminder = remindersCopy[currentYear][currentMonth]

  if (!monthHasReminder) {
    remindersCopy[currentYear][currentMonth] = {}
  }

  const dayHasReminder = remindersCopy[currentYear][currentMonth][currentDay]

  if (!dayHasReminder) {
    // add reminder to new day index
    remindersCopy[currentYear][currentMonth][currentDay] = [newReminder]
  } else {
    // add reminder to existing day index
    remindersCopy[currentYear][currentMonth][currentDay] = [
      ...remindersCopy[currentYear][currentMonth][currentDay],
      newReminder
    ].sort((a, b) => a.time.localeCompare(b.time))
  }
   
  return remindersCopy
}

const updateReminder = (state, { id, date, time, text, city, color }) => {
  const { currentDay, currentMonth, currentYear } = splitDate(date)
  let remindersCopy = {...state.reminders}
  const reminderIndex = remindersCopy[currentYear][currentMonth][currentDay].findIndex(el => el.id === id)
  const reminderCopy = {...remindersCopy[currentYear][currentMonth][currentDay][reminderIndex]}
  const newReminder = {
    ...reminderCopy,
    time,
    text,
    city,
    color,
  }
  const remindersList = remindersCopy[currentYear][currentMonth][currentDay]
  remindersList.splice(reminderIndex, 1, newReminder)
  remindersCopy[currentYear][currentMonth][currentDay] = remindersList.sort((a, b) => a.time.localeCompare(b.time))
  return remindersCopy
}

const deleteReminder = (state, { id, date }) => {
  const { currentDay, currentMonth, currentYear } = splitDate(date)
  let remindersCopy = {...state.reminders}
  remindersCopy[currentYear][currentMonth][currentDay] = remindersCopy[currentYear][currentMonth][currentDay].filter(el => el.id !== id)
  return remindersCopy
}