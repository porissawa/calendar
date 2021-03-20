import styled, { css } from 'styled-components'

export const Wrapper = styled.span`
 ${({ isFirstDay }) => css `
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    flex: 1;
  `}
`