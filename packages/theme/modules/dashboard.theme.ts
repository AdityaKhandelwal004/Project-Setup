// =============================================================================
// OBIEMONEY - DASHBOARD MODULE THEME
// =============================================================================

import { primitiveColors } from '../style.palette.ts';

// =============================================================================
// DASHBOARD MODULE COLORS
// =============================================================================

export const dashboardColors = {
  // Primary colors for Dashboard module
  primary: primitiveColors.neutral700,
  primaryHover: primitiveColors.neutral800,
  primaryLight: primitiveColors.neutral100,

  // Accent colors
  accent: primitiveColors.blue500,
  accentHover: primitiveColors.blue600,
  accentLight: primitiveColors.blue100,

  // Success colors
  success: primitiveColors.green500,
  successHover: primitiveColors.green600,
  successLight: primitiveColors.green100,

  // Warning colors
  warning: primitiveColors.yellow500,
  warningHover: primitiveColors.yellow600,
  warningLight: primitiveColors.yellow100,

  // Error colors
  error: primitiveColors.red500,
  errorHover: primitiveColors.red600,
  errorLight: primitiveColors.red100,
  
  // Neutral colors
  background: primitiveColors.neutral0,    
  surface: primitiveColors.neutral50,     
  border: primitiveColors.neutral200,     
  text: primitiveColors.neutral900,      
  textSecondary: primitiveColors.neutral600,
} as const;

// =============================================================================
// DASHBOARD MODULE THEME EXPORT
// =============================================================================

export const dashboardTheme = {
  colors: dashboardColors,

  // Module metadata
  meta: {
    name: 'dashboard',
    displayName: 'Dashboard',
    description: 'Theme configuration for the Dashboard module including overview and analytics',
    version: '1.0.0',
  },
} as const;

export type DashboardTheme = typeof dashboardTheme;
