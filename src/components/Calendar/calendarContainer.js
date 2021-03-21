import { useState, useMemo, useCallback } from 'react'

import addDate from 'date-fns/add'
import formatISO from 'date-fns/formatISO'
import getDay from 'date-fns/getDay'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import isSameMonth from 'date-fns/isSameMonth'
import subDate from 'date-fns/sub'

import { splitDate } from '../../helpers/date'

const withContainer = WrappedComponent => {
  return function Component({
    handleOpenModal,
    reminders,
  }) {
    const DISPLAYED_DAYS = 42
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const firstDayInMonth = (month, year) => {
      return new Date(year, month, 1)
    }

    const getFirstDayOffset = useCallback((month, year) => {
      return getDay(firstDayInMonth(month, year)) % 7
    }, [])

    const handleNextMonthClick = () => {
      const nextMonthUTC = addDate(firstDayInMonth(currentMonth, currentYear), { months: 1 })
      const nextMonthUTCYear = getYear(nextMonthUTC)
      if (nextMonthUTCYear > currentYear) {
        setCurrentYear(nextMonthUTCYear)
      }
      setCurrentMonth(getMonth(nextMonthUTC))
    }

    const handlePreviousMonthClick = () => {
      const previousMonthUTC = subDate(firstDayInMonth(currentMonth, currentYear), { months: 1 })
      const previousMonthUTCYear = getYear(previousMonthUTC)
      if (previousMonthUTCYear < currentYear) {
        setCurrentYear(previousMonthUTCYear)
      }
      setCurrentMonth(getMonth(previousMonthUTC))
    }

    const createDaysArray = useCallback((month, year) => {
      const days = []
      const firstDayOffset = getFirstDayOffset(month, year)
      const firstDay = firstDayInMonth(month, year)

      for (let i = 0; i < DISPLAYED_DAYS; i++) {
        const newDay = {}
        newDay.reminders = []

        if (i < firstDayOffset) {
          const daysToSubtract = firstDayOffset - i
          newDay.dayInMonth = subDate(firstDay, { days: daysToSubtract })
          newDay.isOutsideMonth = true
        } else {
          const daysToAdd = i - firstDayOffset
          const currentDay = addDate(firstDay, { days: daysToAdd })
          newDay.dayInMonth = currentDay
          newDay.isOutsideMonth = !isSameMonth(currentDay, firstDay)
        }
        days.push(newDay)
      }

      return days
    }, [getFirstDayOffset])

    const enrichDaysWithReminders = (daysArray, remindersObject) => {
      return daysArray.map(date => {
        const { currentYear, currentMonth, currentDay } = splitDate(formatISO(date.dayInMonth))
        if (remindersObject?.[currentYear]?.[currentMonth]?.[currentDay]) {
          date.reminders = remindersObject[currentYear][currentMonth][currentDay]
        }
        return date
      })
    }
    
    const daysArray = useMemo(() => {
      const daysArray = createDaysArray(currentMonth, currentYear)
      return enrichDaysWithReminders(daysArray, reminders)
    }, [currentMonth, currentYear, createDaysArray, reminders]) 

    return (
      <WrappedComponent
        currentMonth={MONTHS[currentMonth]}
        daysArray={daysArray}
        handleNextMonthClick={() => handleNextMonthClick()}
        handlePreviousMonthClick={() => handlePreviousMonthClick()}
        handleOpenModal={handleOpenModal}
      />
    )

  }
}

export default withContainer