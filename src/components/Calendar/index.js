import PropTypes from 'prop-types'

import * as S from './styles'
import Container from './calendarContainer'
import Button from '../Button'
import Day from '../Day'

const Calendar = ({
  currentMonth,
  daysArray = [],
  handleNextMonthClick,
  handleOpenModal,
  handlePreviousMonthClick,
}) => {
  const addFlexLineBreaks = dArray => {
    return dArray.reduce((acc, curr, i) => {
      if (i % 7 === 0) {
        acc.push({
          type: 'line-break'
        })
      }
      acc.push({...curr, type: 'day'})
      return acc
    }, [])
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Button
          label='&lt;'
          primary
          onClick={() => handlePreviousMonthClick()}
        />
        <div>{currentMonth}</div>
        <Button
          label='&gt;'
          primary
          onClick={() => handleNextMonthClick()}
        />
      </S.Header>
      <S.Weekdays>
        {[
          'S',
          'M',
          'T',
          'W',
          'T',
          'F',
          'S'
          ].map((el, i) => <span key={el + i}>{el}</span>)}
      </S.Weekdays>
      <S.Calendar>
        {addFlexLineBreaks(daysArray).map((el, i) => {
          return el.type === 'day'
            ? (
              <Day
                key={`${el.dayInMonth}-${i}`}
                dayInMonth={el.dayInMonth}
                isOutsideMonth={el.isOutsideMonth}
                reminders={el.reminders}
                handleOpenModal={handleOpenModal}
                isToday={el.isToday}
              />
            ) : (
              <S.Break key={`${i}-break`}/>
            )
        })}
      </S.Calendar>
    </S.Wrapper>
  )
}

Calendar.propTypes = {
  currentMonth: PropTypes.string,
  daysArray: PropTypes.array,
  handleNextMonthClick: PropTypes.func,
  handleOpenModal: PropTypes.func,
  handlePreviousMonthClick: PropTypes.func,
}

export default Container(Calendar)