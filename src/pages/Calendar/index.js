import { useState, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import closestIndexTo from 'date-fns/closestIndexTo'
import formatISO from 'date-fns/formatISO'
import parseISO from 'date-fns/parseISO'

import * as S from './styles'
import Calendar from '../../components/Calendar'
import ReminderModal from '../../components/ReminderModal'
import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from '../../store/reducers/reminders'
import { fetchForecast } from '../../store/reducers/forecast'
import { isDateInApiRange } from '../../helpers/date'

const CalendarView = () => {
  const dispatch = useDispatch()
  const { reminders } = useSelector(state => state.reminders)
  const { forecast } = useSelector(state => state.forecast)

  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(undefined)
  const [selectedReminder, setSelectedReminder] = useState(undefined)

  const addReminder = ({ date, time, text, city, color }) => {
    dispatch({
      type: ADD_REMINDER,
      payload: { date, time, text, city, color },
    })
  }

  const updateReminder = ({ date, time, text, city, color }) => {
    dispatch({
      type: UPDATE_REMINDER,
      payload: { date, time, text, city, color },
    })
  }

  const deleteReminder = ({ id, date }) => {
    dispatch({
      type: DELETE_REMINDER,
      payload: { id, date }
    })
  }

  const forecastForReminder = useMemo(() => {
    if (selectedReminder && forecast) {
      const forecastsForCity = forecast.find(el => el.city === selectedReminder.city)
      const reminderDateInApiRange = isDateInApiRange(selectedReminder.date)
  
      if (forecastsForCity && reminderDateInApiRange) {
        const weatherIndex = closestIndexTo(parseISO(selectedReminder.date), forecastsForCity.weather.map(el => parseISO(el.date)))
        return forecastsForCity.weather[weatherIndex].weather
      }

      if (!reminderDateInApiRange) {
        return 'Forecast is available only for the next five days from today.'
      }

      if (!selectedReminder.city) {
        return 'No city was registered'
      }

      if (reminderDateInApiRange && !forecastsForCity) {
        return 'Forecast unavailable for this city'
      }

      return 'loading...'
    }
  }, [forecast, selectedReminder])


  const handleOpenModal = (date, reminder) => {
    if (reminder && reminder.city) {
      dispatch(fetchForecast({city: reminder.city, date: reminder.date}))
    }
    
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
        forecastForReminder={forecastForReminder}
      />}
    </S.Wrapper>
  )
}

export default CalendarView