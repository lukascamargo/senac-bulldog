import { AppProps } from 'next/app'
import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LightTheme from '../styles/themes/light';
import { ThemeProvider } from 'styled-components';

function App({ Component, pageProps }: AppProps) {
  return (
  <React.StrictMode>
    <StylesProvider injectFirst>
      <CssBaseline />
      <MuiThemeProvider theme={LightTheme}>
        <ThemeProvider theme={LightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </React.StrictMode>
  );
}

export default App