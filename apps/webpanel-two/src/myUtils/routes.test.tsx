import routes, { createResourceRoutes, mainModuleTabs, optimiseSubTabs } from './routes';

describe('createResourceRoutes', () => {
  it('should return the correct routes for a given resource', () => {
    const resourceRoutes = createResourceRoutes('example');

    expect(resourceRoutes.root).toBe('/example');
    expect(resourceRoutes.create).toBe('/example/create');
    expect(resourceRoutes.view).toBe('/example/view/:id');
  });

  it('should replace placeholders in the routes with actual values', () => {
    const resourceRoutes = createResourceRoutes('example');
    const viewRouteWithId = resourceRoutes.view.replace(':id', '123');

    expect(viewRouteWithId).toBe('/example/view/123');
  });
});

describe('routes', () => {
  it('should contain the correct static routes', () => {
    const { root, login, dashboard } = routes;

    expect(root).toBe('/');
    expect(login).toBe('/login');
    expect(dashboard.root).toBe('/dashboard');
  });

  it('should contain the correct authentication routes', () => {
    const { signup, forgotPassword, resetPassword } = routes;

    expect(signup).toBe('/signup');
    expect(forgotPassword).toBe('/forgot-password');
    expect(resetPassword).toBe('/reset-password/:token');
  });

  it('should contain the correct application flow routes', () => {
    const { welcome, onboarding, thankYouSetup, main } = routes;

    expect(welcome).toBe('/welcome');
    expect(onboarding).toBe('/onboarding');
    expect(thankYouSetup).toBe('/thank-you-setup');
    expect(main).toBe('/main');
  });

  it('should contain the correct financial module routes', () => {
    const { optimise, maximise, protect } = routes;

    expect(optimise).toBe('/optimise');
    expect(maximise).toBe('/maximise');
    expect(protect).toBe('/protect');
  });

  it('should contain the correct optimise sub-module routes', () => {
    const { budget, safetyNet, debt, savings } = routes;

    expect(budget).toBe('/budget');
    expect(safetyNet).toBe('/safety-net');
    expect(debt).toBe('/debt');
    expect(savings).toBe('/savings');
  });
});

describe('navigation constants', () => {
  it('should contain correct main module tabs', () => {
    expect(mainModuleTabs.optimize).toBe('optimize');
    expect(mainModuleTabs.maximise).toBe('maximise');
    expect(mainModuleTabs.protect).toBe('protect');
  });

  it('should contain correct optimise sub-tabs', () => {
    expect(optimiseSubTabs.budget).toBe('budget');
    expect(optimiseSubTabs.safetynet).toBe('safetynet');
    expect(optimiseSubTabs.debt).toBe('debt');
    expect(optimiseSubTabs.savings).toBe('savings');
  });
});
