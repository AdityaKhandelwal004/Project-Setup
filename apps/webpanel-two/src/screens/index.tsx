import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OnlyWith from '../onlyWith';
import { AuthenticationStatus } from '@mono/redux-global/src/reducers';
import { ForgotPassword } from './auth';
import { routes } from '../myUtils';
import Dashboard from './dashboard';
import { Helmet } from "react-helmet-async";
import { LoginWrapper } from './auth/LoginWrapper';
import { ResetPassword } from './auth/resetPassword';
import ProfileSection from './profile/profileSection';

const redirectToDashboard = () => <Redirect to={routes.dashboard.root} />;
const redirectToLogin = () => <Redirect to={routes.login} />;

/**
 * Simplified webpanel-two with only:
 * - Login screen
 * - Dashboard (empty state)
 * - Profile
 */
const Screens: React.FC = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="../assets/images/favicon.png" />
      </Helmet>
      <OnlyWith
        status={AuthenticationStatus.AUTHENTICATED}
      >
        <Switch>
          <Route exact path={routes.dashboard.root} component={Dashboard} />
          <Route exact path={routes.profile} component={ProfileSection} />
          <Route component={redirectToDashboard} />
        </Switch>
      </OnlyWith>
      <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
        <Switch>
          <Route path={routes.login} component={LoginWrapper} />
          <Route path={routes.forgotPassword} component={ForgotPassword} />
          <Route path={routes.resetPassword} component={ResetPassword} />
          <Route component={redirectToLogin} />
        </Switch>
      </OnlyWith>
    </>
  );
};

export default Screens;
