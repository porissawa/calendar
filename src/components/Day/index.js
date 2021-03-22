import PropTypes from 'prop-types'

import getDate from 'date-fns/getDate'

import * as S from './styles'
import Reminder from '../Reminder'

const Day = ({
  dayInMonth,
  handleOpenModal,
  isOutsideMonth,
  isToday,
  reminders = [],
}) => {
  return (
    <S.Wrapper
      onClick={() => handleOpenModal(dayInMonth)}
      isOutsideMonth={isOutsideMonth}
      isToday={isToday}
      data-testid={isToday ? 'today-cell' : null}
    >
      <S.DateWrapper>{getDate(dayInMonth)}</S.DateWrapper>
      <S.RemindersWrapper>
        {reminders.map((el, i) => (
          <Reminder
            key={`${el.id}-i`}
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
  isToday: PropTypes.bool,
  reminders: PropTypes.array,
}

export default Day