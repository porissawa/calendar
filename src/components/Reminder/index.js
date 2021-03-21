import PropTypes from 'prop-types'

import * as S from './styles.js'

const Reminder = ({ data, handleClick, ...props }) => {
  const { color, text, date } = data
  return (
    <S.Wrapper
      color={color}
      onClick={e => {
        e.stopPropagation()
        handleClick(date, data)
      }}
      {...props}  
    >
      {text}
    </S.Wrapper>
  )
}

Reminder.propTypes = {
  color: PropTypes.oneOf(["red", "purple", "blue", "yellow"]),
  text: PropTypes.string,
  city: PropTypes.string,
  forecast: PropTypes.string,
}

export default Reminder