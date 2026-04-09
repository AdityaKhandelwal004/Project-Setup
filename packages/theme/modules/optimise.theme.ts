// =============================================================================
// OBIEMONEY - OPTIMISE MODULE THEME
// =============================================================================

import { borderRadius, spacing } from '../style.layout.ts';
import { brand, primitiveColors } from '../style.palette.ts';
import { fontSize, fontWeight, fontFamilies, lineHeight, letterSpacing } from '../style.typography.ts';

// =============================================================================
// OPTIMISE MODULE COLORS
// =============================================================================

export const optimiseColors = {
  // Primary colors for Optimise module
  primary: primitiveColors.purple600,    
  primaryHover: primitiveColors.purple700, 
  primaryLight: primitiveColors.purple100,
  
  // Accent colors
  accent: primitiveColors.orange500,       // #FF4B00 - Orange accent
  accentBgLight: brand.commonBackground,       // #FF4B00 - Orange accent
  accentHover: primitiveColors.orange600,  // Darker orange for hover
  accentLight: primitiveColors.orange100, // Light orange for backgrounds
  
  // Success colors (for positive financial actions)
  success: primitiveColors.green500,      // #10B981
  successHover: primitiveColors.green600,
  successLight: primitiveColors.green100,
  
  // Warning colors (for alerts and cautions)
  warning: primitiveColors.orange400,     // #F59E0B
  warningHover: primitiveColors.orange500,
  warningLight: primitiveColors.orange50,
  
  // Error colors (for negative actions)
  error: primitiveColors.red500,          // #EF4444
  errorHover: primitiveColors.red600,
  errorLight: primitiveColors.red100,
  
  // Neutral colors
  background: primitiveColors.neutral0,    // White
  cardBackground: primitiveColors.neutral1, // Off white for cards
  surface: primitiveColors.neutral50,     // Light grey
  border: '#FFC7B0',                      // Custom light orange border
  stepCardBorder: '#D0BCF8',           
  text: primitiveColors.neutral900,       // Dark text
  textSecondary: primitiveColors.neutral600, // Secondary text
  cardTitleColor: '#FF4B00',          
  cardSubtitleColor: '#2D2D2D',          
  headingColor:primitiveColors.purple800,
} as const;

// =============================================================================
// OPTIMISE MODULE COMPONENTS
// =============================================================================

export const optimiseComponents = {
  // Header styling for optimise module steps
  header: {
    primary: {
      fontFamily: fontFamilies.primary,    // Nohemi
      fontSize: fontSize.h2,               // 28px
      fontWeight: fontWeight.semiBold,     // 600
      lineHeight: lineHeight.none,         // 100%
      letterSpacing: letterSpacing.normal, // 0%
      color: optimiseColors.accent,        // Orange color
      marginBottom: spacing[4],            // 16px
    },
    subtitle: {
      fontFamily: fontFamilies.secondary,  // DM Sans
      fontSize: fontSize.textMd,           // 16px
      fontWeight: fontWeight.medium,       // 500
      lineHeight: lineHeight.relaxed,      // 1.6
      letterSpacing: letterSpacing.normal, // 0%
      color: optimiseColors.textSecondary, // Gray color
    },
  },

  // Card styling for optimise module
  card: {
    borderRadius: borderRadius.lg,         // 12px
    padding: spacing[6],                   // 24px
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${optimiseColors.border}`,
    background: optimiseColors.cardBackground,
  },
} as const;

// =============================================================================
// OPTIMISE INTRO SCREEN COMPONENTS
// =============================================================================

export const optimiseIntroComponents = {
  stepCard: {
    gap: '14px',
    paddingTop: '20px',
    paddingRight: '24px',
    paddingBottom: '20px',
    paddingLeft: '24px',
    borderRadius: '21px',
    borderWidth: '1px',
    border: `1px solid ${optimiseColors.stepCardBorder}`,
    background: optimiseColors.background,
    shadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
  },

  stepCardTitle: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeight.medium,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: optimiseColors.cardTitleColor,
  },

  stepCardSubtitle: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeight.semiBold,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0%',
    color: optimiseColors.cardSubtitleColor,
  },

  optimiseTitle: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeight.bold,
    fontSize: '45px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: optimiseColors.cardTitleColor,
  },
} as const;

// =============================================================================
// OPTIMISE MODULE THEME EXPORT
// =============================================================================

export const optimiseTheme = {
  colors: optimiseColors,
  components: optimiseComponents,
  screens: {
    optimiseIntro: optimiseIntroComponents,
  },

  // Module metadata
  meta: {
    name: 'optimise',
    displayName: 'Optimise',
    description: 'Theme configuration for the Optimise module including Budget, Safety Net, Debt, and Savings',
    version: '1.0.0',
  },
} as const;

export type OptimiseTheme = typeof optimiseTheme;
