import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles'

const Button = ({
  secondary,
  backgroundColor,
  size = 'medium',
  label,
  ...props
}) => {
  return (
    <S.Button
      type="button"
      backgroundColor={backgroundColor}
      size={size}
      secondary={secondary}
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