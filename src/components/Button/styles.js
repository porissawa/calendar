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
  primary: ({ theme }) => css`
    background-color: ${theme.colors.primary};
  `,
  secondary: ({ theme }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGray};
    border: 1px solid ${theme.colors.darkGray};
  `,
  backgroundColor: ({ theme, backgroundColor }) => css`
    background-color: ${theme.colors[backgroundColor]};
    color: ${theme.colors.darkGray};
  `,
  isDisabled: ({ theme }) => css`
    background-color: ${theme.colors.gray};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.darkGray};
    cursor: default;
  `,
}

export const Button = styled.button`
  ${({ theme, primary, secondary, size, backgroundColor, isDisabled }) => css`
    border: 0;
    border-radius: ${theme.border.radius.veryRound};
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    color: ${theme.colors.white};

    ${!!size && buttonModifiers[size]}
    ${!!secondary && buttonModifiers.secondary}
    ${!!primary && buttonModifiers.primary}
    ${!!backgroundColor && buttonModifiers.backgroundColor({ theme, backgroundColor })}
    ${!!isDisabled && buttonModifiers.isDisabled({ theme })}
  `}
`;
