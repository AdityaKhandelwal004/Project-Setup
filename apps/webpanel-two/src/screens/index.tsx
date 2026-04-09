import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OnlyWith from '../onlyWith';
import { AuthenticationStatus } from '@mono/redux-global/src/reducers';
import { Right } from '@mono/redux-global/src/reducers/auth';
import { ForgotPassword } from './auth';
import { routes } from '../myUtils';
import Dashboard from './dashboard';
import { isApplicableFeatureLevel } from '../config';
import { Helmet } from "react-helmet-async";
import { LoginWrapper } from './auth/LoginWrapper';
import { SignupWrapper } from './auth/SignupWrapper';
import ProfileSection from './profile/profileSection';
import { ResetPassword } from './auth/resetPassword';

const redirectToRoot = () => <Redirect to={routes.dashboard.root} />;
const redirectToLogin = () => <Redirect to={routes.login} />;

const modules = [
  {
    key: 'dashboard',
    right: Right.DASHBOARD,
    route: routes.dashboard.root,
    component: Dashboard,
  },
  {
    key: 'profile',
    right: Right.DASHBOARD,
    route: routes.profile,
    component: ProfileSection,
  },
];

const Screens: React.FC = () => (
  <>
    <Helmet>
        <link rel="icon" type="image/png" href="../assets/images/favicon.png" />
      </Helmet>
    <OnlyWith
      status={AuthenticationStatus.AUTHENTICATED}
      isApplicableFeatureLevel={isApplicableFeatureLevel}
    >
      <Switch>
        {/* {modules.map((module) => (
          <Route exact key={module.key} path={module.route} component={module.component} />
        ))} */}
        <Route component={redirectToRoot} />
      </Switch>
    </OnlyWith>
    <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
      <Switch>
        <Route path={routes.login} component={LoginWrapper} />
        <Route path={routes.signup} component={SignupWrapper} />
        <Route path={routes.forgotPassword} component={ForgotPassword} />
        <Route path={routes.resetPassword} component={ResetPassword} />
         {modules.map((module) => (
          <Route exact key={module.key} path={module.route} component={module.component} />
        ))}
        <Route component={redirectToLogin} />
      </Switch>
    </OnlyWith>
  </>
);

export default Screens;
