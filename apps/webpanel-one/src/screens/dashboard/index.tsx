import type { JSX } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../../myUtils';
import Dashboard from './dashboard';

const DashboardRoutes = (): JSX.Element => (
  <Switch>
    <Route exact key="dashboard" path={routes.dashboard.root} component={Dashboard} />
  </Switch>
);

export default DashboardRoutes;
