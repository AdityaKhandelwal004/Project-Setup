import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@mono/theme';
import { GlobalStyle } from '@mono/theme/style.global';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Slide, ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import store, { history } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import Screen from './screens';
import { suppressResizeObserverErrors } from './utils/resizeObserverErrorHandler';
import CustomLoader from './myComponents/CustomLoader';

function App() {
  // Suppress ResizeObserver errors globally
  useEffect(() => {
    const cleanup = suppressResizeObserverErrors();
    return cleanup;
  }, []);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ConnectedRouter history={history}>
            <React.StrictMode>
              <GlobalStyle />
              <ThemeProvider theme={theme}>
                <Screen />
              </ThemeProvider>
              <ToastContainer
                hideProgressBar
                position="top-right"
                closeButton={false}
                autoClose={3000}
                draggable={false}
                transition={Slide}
              />
              <CustomLoader />
            </React.StrictMode>
          </ConnectedRouter>
        </LocalizationProvider>
      </Provider>
    </HelmetProvider>
  );
}
export default App;
