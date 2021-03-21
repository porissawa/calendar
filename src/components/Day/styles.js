import styled, { css } from 'styled-components'

const wrapperModifiers = {
  isOutsideMonth: ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray};
  `
}

export const Wrapper = styled.span`
 ${({ theme, isOutsideMonth }) => css `
    border-right: 1px solid ${theme.colors.darkGray};
    border-bottom: 1px solid ${theme.colors.darkGray};
    flex: 1;
    height: calc(100%/6);
    overflow: hidden;

    ${!!isOutsideMonth && wrapperModifiers.isOutsideMonth}
  `}
`

export const RemindersWrapper = styled.div`
  height: calc(100% - 1.2rem);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`