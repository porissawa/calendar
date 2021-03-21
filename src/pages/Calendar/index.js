import { useState } from 'react'

import formatISO from 'date-fns/formatISO'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDate from 'date-fns/getDate'
import parseISO from 'date-fns/parseISO'
import { v4 as uuid } from 'uuid'

import * as S from './styles'
import Calendar from '../../components/Calendar'
import ReminderModal from '../../components/ReminderModal'

const CalendarView = () => {
  const [reminders, setReminders] = useState({})
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedReminderId, setSelectedReminderId] = useState(null)

  const addReminder = ({date, time, text, city, color}) => {
    console.log('addReminder', date, time, text, city, color)
    const parsedDate = parseISO(date)
    let remindersCopy = {...reminders}
    const newReminder = {
      id: uuid(),
      date,
      time,
      text,
      city,
      color,
      forecast: null,
    }
    const currentYear = getYear(parsedDate)
    const currentMonth = getMonth(parsedDate)
    const currentDay = getDate(parsedDate)
    const yearHasReminder = remindersCopy[currentYear]

    if (!yearHasReminder) {
      remindersCopy[currentYear] = {}
    }

    const monthHasReminder = remindersCopy[currentYear][currentMonth]

    if (!monthHasReminder) {
      remindersCopy[currentYear][currentMonth] = {}
    }

    const dayHasReminder = remindersCopy[currentYear][currentMonth][currentDay]

    if (!dayHasReminder) {
      remindersCopy[currentYear][currentMonth][currentDay] = [newReminder]
    } else {
      remindersCopy[currentYear][currentMonth][currentDay] = [
        ...remindersCopy[currentYear][currentMonth][currentDay],
        newReminder
      ]
    }
    console.log(remindersCopy)
    setReminders(remindersCopy)
  }

  const handleOpenModal = (date, reminderId) => {
    setShowReminderModal(true)
    setSelectedDate(formatISO(date, { representation: 'date' }))
    setSelectedReminderId(reminderId)
  }

  const handleModalConfirmClick = (date, time, text, city) => {
    addReminder(date, time, text, city)
    setShowReminderModal(false)
  }

  const handleCloseModal = () => {
    setShowReminderModal(false)
    setSelectedDate(null)
    setSelectedReminderId(null)
  }

  return (
    <S.Wrapper>
      <Calendar
        reminders={reminders}
        handleOpenModal={(date, reminderId) => handleOpenModal(date, reminderId)}
      />
      <ReminderModal
        isOpen={showReminderModal}
        handleCloseModal={() => handleCloseModal()}
        handleConfirmClick={reminder => handleModalConfirmClick(reminder)}
        selectedDate={selectedDate}
        selectedReminderId={selectedReminderId}
      />
    </S.Wrapper>
  )
}

export default CalendarView