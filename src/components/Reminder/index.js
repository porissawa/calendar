import PropTypes from 'prop-types'

import * as S from './styles.js'

const Reminder = ({ id, color, text, city, forecast, handleClick, ...props }) => {
  return (
    <S.Wrapper
      color={color}
      onClick={() => handleClick(id)}
      {...props}  
    >
      {text}
    </S.Wrapper>
  )
}

Reminder.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  city: PropTypes.string,
  forecast: PropTypes.string,
}

export default Reminder