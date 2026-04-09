export const createResourceRoutes = (resource: string) => ({
  root: `/${resource}`,
  create: `/${resource}/create`,
  view: `/${resource}/view/:id`,
});

export const routes = {
  root: '/',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
  dashboard: createResourceRoutes(`dashboard`),
  profile: '/profile',
  test: createResourceRoutes('test'),
};

export default routes;
