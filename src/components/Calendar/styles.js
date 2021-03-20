import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Header = styled.div`
  ${({ theme }) => css`
    height: ${theme.spacings.small};
    width: 100%;
    margin-bottom: ${theme.spacings.xsmall};
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`

export const Calendar = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border-left: 1px solid ${theme.colors.black};
    border-radius: ${theme.border.radius.round};
  `}
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;