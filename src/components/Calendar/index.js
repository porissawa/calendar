import * as S from './styles'
import Container from './calendarContainer'
import Day from '../Day'

const Calendar = ({ daysArray = [] }) => {
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
      {addFlexLineBreaks(daysArray).map(el => {
        return el.type === 'day' ? <Day dayInMonth={el.dayInMonth} /> : <S.Break />
      })}
    </S.Wrapper>
  )
}

export default Container(Calendar)