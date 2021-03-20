import React, { useState } from 'react'

import getDay from 'date-fns/getDay'
import addDays from 'date-fns/add'
import subDays from 'date-fns/sub'

import { DayProps } from '../Day/index'

const withContainer = WrappedComponent => {
  return function Component() {
    const WEEK_ROWS = 6
    const DISPLAYED_DAYS = 42

    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const firstDayInMonth = (month, year) => {
      return new Date(year, month, 1)
    }

    const getFirstDayOffset = (month, year) => {
      return getDay(firstDayInMonth(month, year)) % 7
    }

    const createDaysArray = (month, year) => {
      const days = []
      const firstDayOffset = getFirstDayOffset(month, year)
      const firstDay = firstDayInMonth(month, year)

      for (let i = 0; i < DISPLAYED_DAYS; i++) {
        const newDay = {...DayProps}
        newDay.reminders = []

        if (i < firstDayOffset) {
          const daysToSubtract = firstDayOffset - i
          newDay.dayInMonth = subDays(firstDay, { days: daysToSubtract })
        } else {
          const daysToAdd = i - firstDayOffset
          newDay.dayInMonth = addDays(firstDay, { days: daysToAdd })
        }
        days.push(newDay)
      }

      return days
    }

    const assignEventsToDays = eventsObject => {}

    console.log(createDaysArray(0, 2021))
    return (
      <WrappedComponent
        daysArray={createDaysArray(currentMonth, currentYear)}
      />
    )

  }
}

export default withContainer