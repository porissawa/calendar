import PropTypes from 'prop-types';

import * as S from './styles'

const Button = ({
  backgroundColor,
  isDisabled,
  label,
  onClick,
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
      isDisabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          console.log(isDisabled)
          onClick()
        }
      }}
      {...props}
    >
      {label}
    </S.Button>
  )
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  isDisabled: PropTypes.bool,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Button