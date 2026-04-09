import { primitiveColors } from '../style.palette.ts';
import { spacing, borderRadius } from '../style.layout.ts';
import { fontFamilies, fontSize, fontWeight, lineHeight, letterSpacing } from '../style.typography.ts';
import { colors } from '../style.palette.ts';

// =============================================================================
// AUTH MODULE COLORS
// =============================================================================

export const authColors = {
  // Primary colors for Auth module
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
  
  forestTeal: '#064345',

  // Neutral colors
  background: primitiveColors.neutral0,    
  surface: primitiveColors.neutral50,      
  border: primitiveColors.neutral200,      
  text: primitiveColors.neutral900,
  textSecondary: primitiveColors.neutral600,
  heading: '#100937',                  
  subheading: '#6828E8',                
  inputLabel: '#403A5F',              
  link: '#100937',                 
  buttonText: '#FFFFFF',              
  checkboxBackground: '#E7E6EB',       
  checkboxBorder: '#100937',          
  checkboxTick: '#100937',             

  // Auth-specific colors
  form: {
    background: primitiveColors.neutral0,
    border: primitiveColors.neutral200,
    shadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
  },
  
  divider: {
    color: primitiveColors.neutral300,   
    text: primitiveColors.neutral500,    
  },
} as const;

// =============================================================================
// AUTH MODULE TEXT STYLES
// =============================================================================

// Auth-specific text styles
export const authTextStyles = {
  heading: {
    fontFamily: fontFamilies.primary,    // Nohemi
    fontSize: '28px',                    // 28px
    fontWeight: fontWeight.medium,       // 500
    lineHeight: lineHeight.none,         // 100%
    letterSpacing: letterSpacing.normal, // 0%
  },
  subheading: {
    fontFamily: fontFamilies.secondary,  // DM Sans
    fontSize: fontSize.textMd,           // 16px
    fontWeight: fontWeight.regular,      // 400
    lineHeight: '24px',                  // 24px
    letterSpacing: letterSpacing.normal, // 0%
  },
  fieldLabel: {
    fontFamily: fontFamilies.secondary,  // DM Sans
    fontSize: fontSize.textSm,           // 14px
    fontWeight: fontWeight.semiBold,     // 600
    lineHeight: '20px',                  // 20px
    letterSpacing: letterSpacing.normal, // 0%
    color: '#403A5F',                    // Custom field label color
  },
  inputPlaceholder: {
    fontFamily: fontFamilies.secondary,  // DM Sans
    fontSize: '14px',                    // 14px
    fontWeight: fontWeight.medium,       // 500
    lineHeight: '20px',                  // 20px
    letterSpacing: letterSpacing.normal, // 0%
    color: '#B5B3C1',                    // Custom placeholder color
  },
  link: {
    fontFamily: fontFamilies.secondary,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },

  navLink: {
    fontFamily: fontFamilies.secondary,  
    fontSize: fontSize.textSm,          
    fontWeight: 700,                   
    lineHeight: '20px',                
    letterSpacing: letterSpacing.normal
  },
  button: {
    fontFamily: fontFamilies.primary,
    fontSize: '18px',               
    fontWeight: fontWeight.medium,   
    lineHeight: lineHeight.none,       
    letterSpacing: letterSpacing.normal, 
  },

  // Terms and conditions checkbox text styling
  checkboxLabel: {
    fontFamily: fontFamilies.secondary,  
    fontSize: fontSize.textSm,        
    fontWeight: fontWeight.regular,    
    lineHeight: lineHeight.tight,      
    letterSpacing: letterSpacing.normal, 
  },
} as const;

// =============================================================================
// AUTH MODULE COMPONENTS
// =============================================================================

export const authComponents = {
  // Form container styling for auth module
  form: {
    borderRadius: borderRadius.xl,
    padding: spacing[10],
    shadow: authColors.form.shadow,
    border: `1px solid ${authColors.form.border}`,
    background: authColors.form.background,
    maxWidth: '700px',
  },
  
  // Button styling for auth module
  button: {
    primary: {
      background: authColors.primary,
      color: primitiveColors.neutral0,
      borderRadius: borderRadius.lg,      
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: fontSize.textLg,
      fontWeight: fontWeight.semiBold,
      width: '100%',
      hover: {
        background: authColors.primaryHover,
      },
    },
    
    secondary: {
      background: 'transparent',
      color: authColors.primary,
      border: `2px solid ${authColors.primary}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: fontSize.textLg,
      fontWeight: fontWeight.semiBold,
      width: '100%',
      hover: {
        background: authColors.primaryLight,
      },
    },
    
    social: {
      background: primitiveColors.neutral0,
      color: authColors.text,
      border: `1px solid ${authColors.border}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: fontSize.textMd,
      fontWeight: fontWeight.medium,
      width: '100%',
      hover: {
        background: authColors.surface,
      },
    },
  },
  
  // Input styling for auth module
  input: {
    borderRadius: borderRadius.lg,        
    padding: `${spacing[4]} ${spacing[5]}`, 
    border: `2px solid ${authColors.border}`,
    fontSize: fontSize.textLg,
    background: authColors.background,
    width: '100%',
    focus: {
      borderColor: authColors.accent,
      boxShadow: `0 0 0 4px ${authColors.accent}20`,
    },
    error: {
      borderColor: authColors.error,
      boxShadow: `0 0 0 4px ${authColors.error}20`,
    },
  },
  
  // Link styling for auth module
  link: {
    fontFamily: fontFamilies.secondary,  // DM Sans
    fontSize: fontSize.textSm,           // 14px
    fontWeight: fontWeight.medium,       // 500
    lineHeight: lineHeight.tight,        // 20px
    letterSpacing: letterSpacing.normal, // 0%
  },

  // Checkbox styling for auth module
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    borderWidth: '1px',
    backgroundColor: authColors.checkboxBackground,
    borderColor: authColors.checkboxBorder,
    '&.Mui-checked': {
      backgroundColor: authColors.checkboxBackground,
      borderColor: authColors.checkboxBorder,
      color: authColors.checkboxTick,
    },
    '&:hover': {
      backgroundColor: authColors.checkboxBackground,
    },
  },
  
  // Divider styling for auth module
  divider: {
    color: authColors.divider.color,
    text: {
      color: authColors.divider.text,
      fontSize: fontSize.textSm,
      fontWeight: fontWeight.medium,
      background: authColors.background,
      padding: `0 ${spacing[4]}`,
    },
  },
  
  // Error message styling
  errorMessage: {
    color: authColors.error,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.medium,
    padding: `${spacing[2]} 0`,
  },

  // Success message styling
  successMessage: {
    color: authColors.success,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.medium,
    padding: `${spacing[2]} 0`,
  },
} as const;

// =============================================================================
// AUTH MODULE THEME EXPORT
// =============================================================================

export const authTheme = {
  colors: authColors,
  textStyles: authTextStyles,
  components: authComponents,

  // Module metadata
  meta: {
    name: 'auth',
    displayName: 'Authentication',
    description: 'Theme configuration for the Authentication module including login, register, and password reset',
    version: '1.0.0',
  },
} as const;

export type AuthTheme = typeof authTheme;
