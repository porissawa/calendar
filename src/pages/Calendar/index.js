import { useState } from 'react'

import formatISO from 'date-fns/formatISO'
import { v4 as uuid } from 'uuid'

import * as S from './styles'
import Calendar from '../../components/Calendar'
import ReminderModal from '../../components/ReminderModal'
import { splitDate } from '../../helpers/date'

const CalendarView = () => {
  const [reminders, setReminders] = useState({})
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedReminder, setSelectedReminder] = useState(undefined)

  const addReminder = ({ date, time, text, city, color }) => {
    const { currentDay, currentMonth, currentYear } = splitDate(date)
    let remindersCopy = {...reminders}
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
     
    setReminders(remindersCopy)
  }

  const updateReminder = ({ id, date, time, text, city, color }) => {
    const { currentDay, currentMonth, currentYear } = splitDate(date)
    let remindersCopy = {...reminders}
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

  const deleteReminder = ({ id, date }) => {
    const { currentDay, currentMonth, currentYear } = splitDate(date)
    let remindersCopy = {...reminders}
    remindersCopy[currentYear][currentMonth][currentDay] = remindersCopy[currentYear][currentMonth][currentDay].filter(el => el.id !== id)
    return setReminders(remindersCopy)
  }

  const handleOpenModal = (date, reminder) => {
    setSelectedReminder(reminder)
    setSelectedDate(formatISO(date, { representation: 'date' }))
    setShowReminderModal(true)
  }

  const handleModalConfirmClick = ({ id, date, time, text, city, color }) => {
    selectedReminder?.id === id
      ? updateReminder({ id, date, time, text, city, color })
      : addReminder({ date, time, text, city, color })
    handleCloseModal()
  }

  const handleModalDeleteClick = ({ id, date }) => {
    deleteReminder({ id, date })
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setShowReminderModal(false)
    setSelectedDate(undefined)
    setSelectedReminder(undefined)
  }

  return (
    <S.Wrapper>
      <Calendar
        reminders={reminders}
        handleOpenModal={(date, reminderId) => handleOpenModal(date, reminderId)}
      />
      {showReminderModal && <ReminderModal
        isOpen={showReminderModal}
        handleCloseModal={() => handleCloseModal()}
        handleConfirmClick={reminder => handleModalConfirmClick(reminder)}
        handleDeleteReminderClick={reminder => handleModalDeleteClick(reminder)}
        selectedDate={selectedDate}
        selectedReminder={selectedReminder}
      />}
    </S.Wrapper>
  )
}

export default CalendarView