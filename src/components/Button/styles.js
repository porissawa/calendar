import styled, { css } from "styled-components";

const buttonModifiers = {
  small: () => css`
    font-size: 1rem;
    padding: 0.6rem 1rem;
  `,
  medium: () => css`
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
  `,
  large: () => css`
    font-size: 1.4rem;
    padding: 1rem 1.4rem;
  `,
  secondary: ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGray};
  `
}

export const Button = styled.button`
  ${({ theme, backgroundColor, secondary, size }) => css`
    border: 0;
    border-radius: ${theme.border.radius.veryRound};
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    background-color: ${theme.colors[backgroundColor]};
    color: ${theme.colors.white};

    ${!!size && buttonModifiers[size]}
    ${!!secondary && buttonModifiers[secondary]}
  `}
`;
