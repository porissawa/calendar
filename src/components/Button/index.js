import PropTypes from 'prop-types';

import * as S from './styles'

const Button = ({
  backgroundColor,
  label,
  primary,
  secondary,
  size = 'medium',
  ...props
}) => {
  return (
    <S.Button
      type="button"
      primary={primary}
      size={size}
      secondary={secondary}
      backgroundColor={backgroundColor}
      {...props}
    >
      {label}
    </S.Button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Button