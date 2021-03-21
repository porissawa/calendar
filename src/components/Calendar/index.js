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
          backgroundColor='primary'
          onClick={() => handlePreviousMonthClick()}
        />
        <div>{currentMonth}</div>
        <Button
          label='&gt;'
          backgroundColor='primary'
          onClick={() => handleNextMonthClick()}
        />
      </S.Header>
      <S.Calendar>
        {addFlexLineBreaks(daysArray).map((el, i) => {
          return el.type === 'day'
            ? (
              <Day
                key={el.dayInMonth}
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

export default Container(Calendar)