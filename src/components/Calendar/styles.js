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

export const Weekdays = styled.div`
  ${({ theme }) => css`
    height: ${theme.spacings.small};
    width: 100%;
    margin-bottom: ${theme.spacings.xxsmall};
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-weight: ${theme.font.bold};
  `}
`

export const Calendar = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border: 1px solid ${theme.colors.black};
    border-radius: ${theme.border.radius.round};

    &:nth-child(7n) {
      border-right: 0;
    }
  `}
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;
