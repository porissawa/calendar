import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components'
import './index.css';
import GlobalStyles from './styles/global'
import theme from './styles/theme'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
