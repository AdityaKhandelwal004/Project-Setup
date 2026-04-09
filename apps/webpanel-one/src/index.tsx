import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Slide, ToastContainer } from 'react-toastify';
import Screens from './screens';
import theme from './theme';
import { GlobalStyle } from './theme/style.global';
import store, { history } from './redux/store';
import { fetchBaseData } from './redux/actions';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/loader';

store.dispatch(fetchBaseData());

const App = () => (
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ConnectedRouter history={history}>
        <React.StrictMode>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Screens />
          </ThemeProvider>
          <ToastContainer
            hideProgressBar
            position="top-right"
            closeButton={false}
            autoClose={3000}
            draggable={false}
            transition={Slide}
          />
          <Loader />
        </React.StrictMode>
      </ConnectedRouter>
    </LocalizationProvider>
  </Provider>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
