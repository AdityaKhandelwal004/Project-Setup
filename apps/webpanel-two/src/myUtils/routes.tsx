export const createResourceRoutes = (resource: string) => ({
  root: `/${resource}`,
  create: `/${resource}/create`,
  view: `/${resource}/view/:id`,
});

export const routes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  logout: "/logout",
  dashboard: createResourceRoutes("dashboard"),
  profile: '/profile',

  // Module-specific routes with dynamic parameters
  moduleRoute: "/:module/:subModule?",

};


export default routes;
