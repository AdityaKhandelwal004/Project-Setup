// =============================================================================
// OBIEMONEY - PROTECT MODULE THEME
// =============================================================================

import { primitiveColors } from '../style.palette.ts';
import { spacing, borderRadius } from '../style.layout.ts';

// =============================================================================
// PROTECT MODULE COLORS
// =============================================================================

export const protectColors = {
  // Primary colors for Protect module
  primary: primitiveColors.blue600,
  primaryHover: primitiveColors.blue500,
  primaryLight: primitiveColors.blue100,

  // Accent colors
  accent: primitiveColors.purple500,
  accentHover: primitiveColors.purple600,
  accentLight: primitiveColors.purple100,

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
// PROTECT MODULE COMPONENTS
// =============================================================================

export const protectComponents = {
  // Card styling for protect module
  card: {
    borderRadius: borderRadius.lg,     
    padding: spacing[6],               
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${protectColors.border}`,
    background: protectColors.background,
  },
} as const;

// =============================================================================
// PROTECT MODULE THEME EXPORT
// =============================================================================

export const protectTheme = {
  colors: protectColors,
  components: protectComponents,
  
  // Module metadata
  meta: {
    name: 'protect',
    displayName: 'Protect',
    description: 'Theme configuration for the Protect module including Insurance, Asset Protection, and Estate Planning',
    version: '1.0.0',
  },
} as const;

export type ProtectTheme = typeof protectTheme;
