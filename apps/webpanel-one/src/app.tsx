import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@mono/theme";
import { GlobalStyle } from "@mono/theme/style.global";
import { GlobalStyles } from "@mui/material";
import { fontFamilies } from "@mono/theme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Slide, ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import store, { history } from "./redux/store";
import Screen from "./screens";
import { suppressResizeObserverErrors } from "./utils/resizeObserverErrorHandler";

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
                {/* Global font-family for validation error messages */}
                <GlobalStyles
                  styles={{
                    ".MuiFormHelperText-root": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiFormHelperText-root.Mui-error": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiFormLabel-root.Mui-error": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiInputLabel-root.Mui-error": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiTypography-root.Mui-error": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiFormControl-root .Mui-error": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiFormControl-root .MuiTypography-root": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                    ".MuiTextField-root .MuiTypography-root": {
                      fontFamily: `${fontFamilies.secondary} !important`,
                    },
                  }}
                />
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
            </React.StrictMode>
          </ConnectedRouter>
        </LocalizationProvider>
      </Provider>
    </HelmetProvider>
  );
}
export default App;
