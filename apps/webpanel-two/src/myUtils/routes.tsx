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
  twoFactorAuthentication: "/two-factor-authentication",
  dashboard: createResourceRoutes("dashboard"),
  customers: '/customers',
  learningResources: '/learning-resources',
  partners: '/partners',
  profile: '/profile',
  learningResourcesTypes: '/learning-resources/types',
  learningResourcesTags: '/learning-resources/tags',
  learningResourceForm: '/learning-resources/form',
  learningResourceDetails: '/learning-resources/resource-details/:id',
  learningResourceEdit: '/learning-resources/edit/:id',
  partnersForm: '/partners/form',
  partnerDetails: '/partners/partner-details/:id',
  partnerEdit: '/partners/edit/:id',
  manageCategory: '/partners/manage-category',
  userDetails: "/user-details/:id",
  

  // Module-specific routes with dynamic parameters
  moduleRoute: "/:module/:subModule?",

};


export default routes;
