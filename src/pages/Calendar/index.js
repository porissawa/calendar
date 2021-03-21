import { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import formatISO from 'date-fns/formatISO'
import { v4 as uuid } from 'uuid'

import * as S from './styles'
import Calendar from '../../components/Calendar'
import ReminderModal from '../../components/ReminderModal'
import { splitDate } from '../../helpers/date'
import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from '../../store/reducers/reminders'

const CalendarView = () => {
  const dispatch = useDispatch()
  const { reminders } = useSelector(state => state.reminders)
  // const [reminders, setReminders] = useState({})
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedReminder, setSelectedReminder] = useState(undefined)

  const addReminder = ({ date, time, text, city, color }) => {
    dispatch({
      type: ADD_REMINDER,
      payload: { date, time, text, city, color }
    })
  }

  const updateReminder = ({ date, time, text, city, color }) => {
    dispatch({
      type: UPDATE_REMINDER,
      payload: { date, time, text, city, color }
    })
  }

  const deleteReminder = ({ id, date }) => {
    dispatch({
      type: DELETE_REMINDER,
      payload: { id, date }
    })
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