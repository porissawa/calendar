import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import parseISO from 'date-fns/parseISO'
import addDate from "date-fns/add"
import isAfterDate from "date-fns/isAfter"
import isBeforeDate from "date-fns/isBefore"

export const splitDate = date => {
  const parsedDate = parseISO(date)
  const currentYear = getYear(parsedDate)
  const currentMonth = getMonth(parsedDate)
  const currentDay = getDate(parsedDate)
  return {
    currentYear,
    currentMonth,
    currentDay
  }
}

export const isDateInApiRange = date => {
  const parsedDate = parseISO(date)
  
  return isBeforeDate(parsedDate, addDate(new Date(), { days: 5 }))
    && isAfterDate(parsedDate, new Date())
}
      