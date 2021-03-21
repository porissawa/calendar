import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import parseISO from 'date-fns/parseISO'

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