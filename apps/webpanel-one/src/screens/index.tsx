import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthenticationStatus } from '../redux/reducers/auth';
import { OnlyWith } from '../components';
import { ForgotPassword, Login, ResetPassword } from './auth';
import { routes } from '../utils';
import Profile from './profile';
import Dashboard from "./dashboard";

const redirectToRoot = () => <Redirect to={routes.dashboard.root} />
const redirectToLogin = () => <Redirect to={routes.login} />

const Screens: React.FC = () => (
  <>
    <OnlyWith status={AuthenticationStatus.AUTHENTICATED}>
      <Switch>
        <Route component={redirectToRoot} />
      </Switch>
    </OnlyWith>
    <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
      <Switch>
        <Route path={routes.login} component={Login} />
        <Route path={routes.forgotPassword} component={ForgotPassword} />
        <Route path={routes.resetPassword} component={ResetPassword} />
        <Route path={routes.profile} component={Profile} />
        <Route path={routes.dashboard.root} component={Dashboard} />
        <Route component={redirectToLogin} />
      </Switch>
    </OnlyWith>
  </>
);

export default Screens;
