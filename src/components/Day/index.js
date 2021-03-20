import PropTypes from 'prop-types'

import getDate from 'date-fns/getDate'

import * as S from './styles'
import Reminder from '../Reminder'

const Day = ({
  dayInMonth,
  handleDayClick = () => {},
  handleEventClick = () => {},
  isOutsideMonth,
  reminders = [],
}) => {
  return (
    <S.Wrapper
      onClick={e => handleDayClick(e)}
      isOutsideMonth={isOutsideMonth}
    >
      {getDate(dayInMonth)}
      {reminders.map(el => (
        <Reminder
          handleReminderClick={e => handleEventClick(e)}
          data={el}
        />
      ))}
    </S.Wrapper>
  )
}

Day.propTypes = {
  dayInMonth: PropTypes.number,
  isOutsideMonth: PropTypes.bool,
  reminders: PropTypes.array,
}

export default Day