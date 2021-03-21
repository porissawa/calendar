import PropTypes from 'prop-types'

import getDate from 'date-fns/getDate'

import * as S from './styles'
import Reminder from '../Reminder'

const Day = ({
  dayInMonth,
  handleOpenModal,
  isOutsideMonth,
  reminders = [],
}) => {
  return (
    <S.Wrapper
      onClick={() => handleOpenModal(dayInMonth)}
      isOutsideMonth={isOutsideMonth}
    >
      <p>{getDate(dayInMonth)}</p>
      <S.RemindersWrapper>
        {reminders.map(el => (
          <Reminder
            key={el.id}
            handleClick={() => handleOpenModal(dayInMonth, el)}
            data={el}
          />
        ))}
      </S.RemindersWrapper>
    </S.Wrapper>
  )
}

Day.propTypes = {
  dayInMonth: PropTypes.instanceOf(Date),
  handleDayClick: PropTypes.func,
  handleEventClick: PropTypes.func,
  isOutsideMonth: PropTypes.bool,
  reminders: PropTypes.array,
}

export default Day