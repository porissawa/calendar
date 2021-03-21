import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${({ theme }) => css`
    html {
      font-size: 62, 5%;
      height: 100%;
    }

    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes};
      height: 100%;
    }

    #root {
      height: 100%;
    }
  `}
`

export default GlobalStyles
