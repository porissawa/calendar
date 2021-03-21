import { v4 as uuid } from 'uuid'

import { splitDate } from '../../helpers/date'

const ADD_REMINDER = 'reminder/addReminder'
const UPDATE_REMINDER = 'reminder/updateReminder'
const DELETE_REMINDER = 'reminder/deleteReminder'

const initialState = {
  reminders: {}
}

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case ADD_REMINDER:
      return {
        ...addReminder(state, action.payload)
      }
    case UPDATE_REMINDER:
      return {
        ...updateReminder(state, action.payload)
      }
    case DELETE_REMINDER:
      return {
        ...deleteReminder(state, action.payload)
      }
    default:
      return state
  }
}



const addReminder = (state, { date, time, text, city, color }) => {
  const { currentDay, currentMonth, currentYear } = splitDate(date)
  let remindersCopy = {...state}
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
  let remindersCopy = {...state}
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
  console.log(remindersList)
  return remindersList.sort((a, b) => a.time.localeCompare(b.time))
}

const deleteReminder = (state, { id, date }) => {
  const { currentDay, currentMonth, currentYear } = splitDate(date)
  let remindersCopy = {...state}
  remindersCopy[currentYear][currentMonth][currentDay] = remindersCopy[currentYear][currentMonth][currentDay].filter(el => el.id !== id)
  return remindersCopy
}