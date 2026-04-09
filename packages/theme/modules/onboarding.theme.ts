import { primitiveColors, brand } from '../style.palette.ts';
import { fontFamilies, fontWeight, lineHeight, letterSpacing } from '../style.typography.ts';

export const onboardingColors = {
  // Primary colors for Onboarding module
  primary: primitiveColors.purple600,    
  primaryHover: primitiveColors.purple700, 
  primaryLight: primitiveColors.purple100, 
  
  // Accent colors
  accent: primitiveColors.orange500,     
  accentHover: primitiveColors.orange600,
  accentLight: primitiveColors.orange100, 
  
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
  background: brand.commonBackground,  // #FFF6F2 - Cream background
  progressBackground: brand.progressBackground, // #FFEDE6 - Progress bar background
  surface: primitiveColors.neutral50,
  border: primitiveColors.neutral200,
  text: primitiveColors.neutral900,
  textSecondary: primitiveColors.neutral600,

  stepText: '#2D2D2D',       
  questionText: '#2D2D2D',    
  questionSubtext: '#5D5D5D',  
  optionText: '#2D2D2D',       
  optionSubtext: '#5D5D5D',  
} as const;

// =============================================================================
// ONBOARDING MODULE TEXT STYLES
// =============================================================================

export const onboardingTextStyles = {
  // Main header style
  header: {
    fontFamily: fontFamilies.primary,    
    fontSize: '32px',         
    fontWeight: fontWeight.semiBold,    
    lineHeight: lineHeight.none,         
    letterSpacing: letterSpacing.normal, 
    color: onboardingColors.accent,     
  },

  stepTitle: {
    fontFamily: fontFamilies.secondary,  
    fontSize: '14px',                    
    fontWeight: fontWeight.medium,       
    lineHeight: '20px',                  
    letterSpacing: letterSpacing.normal,
    color: onboardingColors.stepText,    
  },

  stepDescription: {
    fontFamily: fontFamilies.secondary,  
    fontSize: '14px',                 
    fontWeight: fontWeight.medium,       
    lineHeight: '20px',               
    letterSpacing: letterSpacing.normal, 
    color: onboardingColors.stepText,   
  },

  // Question title style
  questionTitle: {
    fontFamily: fontFamilies.primary,
    fontSize: '24px',
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    color: onboardingColors.questionText,
  },

  // Question subtitle style
  questionSubtitle: {
    fontFamily: fontFamilies.secondary,  
    fontSize: '16px',                 
    fontWeight: fontWeight.regular,    
    lineHeight: '24px',                
    letterSpacing: letterSpacing.normal, 
    color: onboardingColors.questionSubtext, 
  },

  // Option title style
  optionTitle: {
    fontFamily: fontFamilies.secondary,  
    fontSize: '18px',                  
    fontWeight: fontWeight.bold,    
    lineHeight: '26px',             
    letterSpacing: letterSpacing.normal,
    color: onboardingColors.optionText,  
  },

  // Option subtitle style
  optionSubtitle: {
    fontFamily: fontFamilies.secondary,
    fontSize: '14px',                   
    fontWeight: fontWeight.regular,    
    lineHeight: '20px',                 
    letterSpacing: letterSpacing.normal,
    color: onboardingColors.optionSubtext, 
  },
} as const;

// =============================================================================
// ONBOARDING MODULE COMPONENTS
// =============================================================================

export const onboardingComponents = {
  // Text component styling for onboarding module
  text: {
    header: onboardingTextStyles.header,
    stepTitle: onboardingTextStyles.stepTitle,
    stepDescription: onboardingTextStyles.stepDescription,
    questionTitle: onboardingTextStyles.questionTitle,
    questionSubtitle: onboardingTextStyles.questionSubtitle,
    optionTitle: onboardingTextStyles.optionTitle,
    optionSubtitle: onboardingTextStyles.optionSubtitle,
  },
} as const;

// =============================================================================
// ONBOARDING MODULE THEME EXPORT
// =============================================================================

export const onboardingTheme = {
  colors: onboardingColors,
  textStyles: onboardingTextStyles,
  components: onboardingComponents,

  // Module metadata
  meta: {
    name: 'onboarding',
    displayName: 'Onboarding',
    description: 'Theme configuration for the Onboarding module including welcome screens and setup flows',
    version: '1.0.0',
  },
} as const;

export type OnboardingTheme = typeof onboardingTheme;
