import styled, { css } from "styled-components";
import media from 'styled-media-query'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    margin-bottom: ${theme.spacings.small};
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css `
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: baseline;
      margin-bottom: ${theme.spacings.xxsmall};
  `}
`

export const Input = styled.input``

export const Label = styled.label``

export const Select = styled.select``

export const Option = styled.option`
  ${({ theme, color }) => css`
    background-color: ${theme.colors[color]};
  `}
`

export const ModalButtonsContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    bottom: ${theme.spacings.small};
    width: 100%;
    padding: 0 ${theme.spacings.small};
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    ${media.lessThan('small')`
      button {
        width: 100%;
      }
    `}
  `}
`

export const CancelButtonContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.spacings.small};
    width: 100%;
    padding: 0 ${theme.spacings.small};
    display: flex;
    justify-content: center;
  `}
`

export const SpacerSmall = styled.span`
 ${({ theme }) => css`
    display: block;
    margin-right: ${theme.spacings.xsmall};
    margin-bottom: ${theme.spacings.xsmall};
    ${media.lessThan('small')`
      width: 100%;
    `}
  `}
`