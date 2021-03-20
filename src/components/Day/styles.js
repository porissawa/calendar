import styled, { css } from 'styled-components'

const wrapperModifiers = {
  isOutsideMonth: ({ theme }) => css`
    background-color: ${theme.colors.lightGray};
    color: ${theme.colors.gray};
  `
}

export const Wrapper = styled.span`
 ${({ theme, isOutsideMonth }) => css `
    border-right: 1px solid ${theme.colors.darkGray};
    border-bottom: 1px solid ${theme.colors.darkGray};
    flex: 1;

    ${!!isOutsideMonth && wrapperModifiers.isOutsideMonth}
  `}
`