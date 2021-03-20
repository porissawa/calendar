import * as S from './styles'
import Container from './calendarContainer'
import Button from '../Button'
import Day from '../Day'

const Calendar = ({
  currentMonth,
  daysArray = [],
  handleNextMonthClick,
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
        {addFlexLineBreaks(daysArray).map(el => {
          return el.type === 'day'
            ? <Day dayInMonth={el.dayInMonth} isOutsideMonth={el.isOutsideMonth} />
            : <S.Break />
        })}
      </S.Calendar>
    </S.Wrapper>
  )
}

export default Container(Calendar)