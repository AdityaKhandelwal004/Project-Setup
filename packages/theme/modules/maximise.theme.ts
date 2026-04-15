// =============================================================================
// TEMPLATE- MAXIMISE MODULE THEME
// =============================================================================


import { borderRadius, spacing } from "../style.layout.ts";
import { primitiveColors } from "../style.palette.ts";
import { fontSize, fontWeight } from "../style.typography.ts";

// =============================================================================
// MAXIMISE MODULE COLORS
// =============================================================================

export const maximiseColors = {
  // Primary c
  // primary: primitiveColors.green600,     
  // primaryHover: primitiveColors.green700,  
  // primaryLight: primitiveColors.green100, 

    primary: primitiveColors.purple600,    
    primaryHover: primitiveColors.purple700, 
    primaryLight: primitiveColors.purple100,
  

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
  border: primitiveColors.purple450,     
  text: primitiveColors.neutral900,     
  textSecondary: primitiveColors.neutral600, 
  
  // Module-specific colors
  superannuation: {
    primary: primitiveColors.green600,     
    secondary: primitiveColors.green100,
    accent: primitiveColors.green500,
  },
  
  investments: {
    primary: primitiveColors.blue600,      
    secondary: primitiveColors.blue100,
    accent: primitiveColors.blue500,
  },
} as const;

// =============================================================================
// MAXIMISE MODULE COMPONENTS
// =============================================================================

export const maximiseComponents = {
  // Card styling for maximise module
  card: {
    borderRadius: borderRadius.lg,         
    padding: spacing[6],                   
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${maximiseColors.border}`,
    background: maximiseColors.background,
  },
} as const;

// =============================================================================
// MAXIMISE MODULE THEME EXPORT
// =============================================================================

export const maximiseTheme = {
  colors: maximiseColors,
  components: maximiseComponents,
  
  // Module metadata
  meta: {
    name: 'maximise',
    displayName: 'Maximise',
    description: 'Theme configuration for the Maximise module including Superannuation and Investments',
    version: '1.0.0',
  },
} as const;

export type MaximiseTheme = typeof maximiseTheme;
