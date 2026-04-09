export * from './optimise.theme.ts';
export * from './maximise.theme.ts';
export * from './protect.theme.ts';
export * from './onboarding.theme.ts';
export * from './dashboard.theme.ts';
export * from './auth.theme.ts';

// Module theme registry
import { optimiseTheme } from './optimise.theme.ts';
import { maximiseTheme } from './maximise.theme.ts';
import { protectTheme } from './protect.theme.ts';
import { onboardingTheme } from './onboarding.theme.ts';
import { dashboardTheme } from './dashboard.theme.ts';
import { authTheme } from './auth.theme.ts';

// =============================================================================
// MODULE THEME REGISTRY
// =============================================================================

export const moduleThemes = {
  optimise: optimiseTheme,
  maximise: maximiseTheme,
  protect: protectTheme,
  onboarding: onboardingTheme,
  dashboard: dashboardTheme,
  auth: authTheme,
} as const;

export type ModuleName = keyof typeof moduleThemes;

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Get theme for a specific module
 * @param moduleName - Name of the module
 * @returns Module-specific theme configuration
 */
export const getModuleTheme = (moduleName: ModuleName) => {
  const theme = moduleThemes[moduleName];
  if (!theme) {
    console.warn(`Module theme not found for: ${moduleName}. Falling back to optimise theme.`);
    return moduleThemes.optimise;
  }
  return theme;
};


