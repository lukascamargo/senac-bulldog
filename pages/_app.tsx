import { AppProps } from 'next/app'
import React from 'react';

// Bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';

//FontAwesome import
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/brands.css'
import '@fortawesome/fontawesome-free/css/solid.css'

//Own import
import '../styles/styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default App