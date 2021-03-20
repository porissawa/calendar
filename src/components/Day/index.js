import getDate from 'date-fns/getDate'

import * as S from './styles'
import Reminder from '../Reminder'

export const DayProps = {
  dayInMonth: 0,
  reminders: [],
}

const Day = ({
  dayInMonth,
  reminders = [],
  handleDayClick = () => {},
  handleEventClick = () => {},
}) => {
  return (
    <S.Wrapper onClick={e => handleDayClick(e)}>
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

export default Day