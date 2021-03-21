import styled, { css } from 'styled-components'


export const Wrapper = styled.section`
 ${({ theme }) => css `
    width: 100%;
    height: 100%;
    padding: ${theme.spacings.small};
  `}
`