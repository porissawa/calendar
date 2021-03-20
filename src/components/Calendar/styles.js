import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    border-left: 1px solid ${theme.colors.black};
    border-radius: ${theme.border.radius.round};
  `}
`;

export const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;
