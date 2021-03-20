import React, { useState } from 'react'

import addDate from 'date-fns/add'
import getDay from 'date-fns/getDay'
import getMonth from 'date-fns/getMonth'
import isSameMonth from 'date-fns/isSameMonth'
import subDate from 'date-fns/sub'

const withContainer = WrappedComponent => {
  return function Component() {
    const DISPLAYED_DAYS = 42
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const firstDayInMonth = (month, year) => {
      return new Date(year, month, 1)
    }

    const getFirstDayOffset = (month, year) => {
      return getDay(firstDayInMonth(month, year)) % 7
    }

    const handleNextMonthClick = () => {
      const nextMonthUTC = addDate(firstDayInMonth(currentMonth, currentYear), { months: 1 })
      setCurrentMonth(getMonth(nextMonthUTC))
    }

    const handlePreviousMonthClick = () => {
      const previousMonthUTC = subDate(firstDayInMonth(currentMonth, currentYear), { months: 1 })
      setCurrentMonth(getMonth(previousMonthUTC))
    }

    const createDaysArray = (month, year) => {
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
    }

    const assignEventsToDays = eventsObject => {}

    return (
      <WrappedComponent
        currentMonth={MONTHS[currentMonth]}
        daysArray={createDaysArray(currentMonth, currentYear)}
        handleNextMonthClick={() => handleNextMonthClick()}
        handlePreviousMonthClick={() => handlePreviousMonthClick()}
      />
    )

  }
}

export default withContainer