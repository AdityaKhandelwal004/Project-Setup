import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import OnlyWith from "../onlyWith";
import { AuthenticationStatus } from "@mono/redux-global/src/reducers";
import { ForgotPassword } from "./auth";
import { ResetPassword } from "./auth/resetPassword";
import { routes } from "../myUtils";
import { Helmet } from "react-helmet-async";
import { LoginWrapper } from "./auth/LoginWrapper";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { useSelector } from "react-redux";
import {
  endSession,
  startSession,
  updateAuthState,
} from "../utils/mixpanel/sessionManager";

const redirectToLogin = () => <Redirect to={routes.login} />;

const Screens: React.FC = () => {
  const authState = useSelector((state: any) => state?.auth);

  useEffect(() => {
    const isLoggedIn =
      authState?.status === AuthenticationStatus.AUTHENTICATED &&
      !!authState?.token;

    updateAuthState(isLoggedIn);

    if (isLoggedIn) {
      startSession("login_or_token_available");
    } else {
      endSession();
    }
  }, [authState?.status, authState?.token]);

  return (
    <>
      {/* <OnlyWith
        status={AuthenticationStatus.AUTHENTICATED}
      >
        <AuthenticatedRoutes />
      </OnlyWith> */}
      <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
        <Switch>
          
          <Route path={routes.login} component={LoginWrapper} />
          <Route path={routes.forgotPassword} component={ForgotPassword} />
          <Route path={routes.resetPassword} component={ResetPassword} />
          <AuthenticatedRoutes />
          <Route component={redirectToLogin} />
        </Switch>
      </OnlyWith>
    </>
  );
};

export default Screens;
