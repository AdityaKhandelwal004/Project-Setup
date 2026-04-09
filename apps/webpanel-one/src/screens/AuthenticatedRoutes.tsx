import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "../myUtils";
import MyProfile from "./profile";
import Dashboard from "./dashboard";

const redirectToDashboard = () => <Redirect to={routes.overview} />;

/**
 * Simplified authenticated routes with only:
 * - Dashboard (empty state)
 * - Profile
 */
export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.overview} component={Dashboard} />
      <Route exact path={routes.profile} component={MyProfile} />
      {/* <Route component={redirectToDashboard} /> */}
    </Switch>
  );
};
