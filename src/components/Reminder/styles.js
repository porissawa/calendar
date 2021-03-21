import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme, color }) => css`
    background-color: ${theme.colors[color]};
    border-radius: ${theme.border.radius.lightRound};
    padding-left:  ${theme.spacings.xxsmall};
    overflow: hidden;
    white-space: nowrap;
  `}
`