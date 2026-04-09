export interface FontFamilies {
  primary: string;
  secondary: string;
}

export const fontFamilies: FontFamilies = {
  primary: '"Nohemi", sans-serif',
  secondary: '"DM Sans", sans-serif',
};

// Legacy support
export const baseFontFamily: string = fontFamilies.primary;
export const baseFontSize: string = '16px';

// =============================================================================
// FONT WEIGHTS
// =============================================================================

export interface FontWeight {
  thin: number;
  light: number;
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
  extraBold: number;
  black: number;
}

export const fontWeight: FontWeight = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

// =============================================================================
// FONT SIZES (Design System Scale)
// =============================================================================

export interface FontSize {
  // Display Sizes (for large headings and hero text)
  display2xl: string;  // 72px
  displayXl: string;   // 60px
  displayLg: string;   // 48px
  displayMd: string;   // 36px
  displaySm: string;   // 30px

  // Text Sizes (for body text and UI)
  textXl: string;      // 20px
  textLg: string;      // 18px
  textMd: string;      // 16px (base)
  textSm: string;      // 14px
  textXs: string;      // 12px

  // Legacy sizes (for backward compatibility)
  b0: string;
  b1: string;
  b2: string;
  b3: string;
  h5: string;
  h4: string;
  h3: string;
  h2: string;
  h1: string;
  subTitle: string;
  title: string;
  barText: string;
}

export const fontSize: FontSize = {
  // Display Sizes
  display2xl: '72px',
  displayXl: '60px', 
  displayLg: '48px', 
  displayMd: '36px', 
  displaySm: '30px', 

  // Text Sizes
  textXl: '20px',          
  textLg: '18px',          
  textMd: '16px',        
  textSm: '14px', 
  textXs: '12px', 
  // Legacy sizes
  b0: '18px',      
  b1: '14px',      
  b2: '12px',      
  b3: '10px',      
  h5: '16px',      
  h4: '20px',      
  h3: '24px',      
  h2: '28px',      
  h1: '32px', 
  subTitle: '40px',
  title: '47px',   
  barText: '26px'     
};

// =============================================================================
// LINE HEIGHTS
// =============================================================================

export interface LineHeight {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export const lineHeight: LineHeight = {
  none: '16px',
  tight: '20px',
  snug: '24px',
  normal: '28px',
  relaxed: '32px',
  loose: '40px',
};

// =============================================================================
// LETTER SPACING
// =============================================================================

export interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export const letterSpacing: LetterSpacing = {
  tighter: '-5%',
  tight: '-2.5%',
  normal: '0%',
  wide: '2.5%',
  wider: '5%',
  widest: '10%',
};

// =============================================================================
// TEXT STYLES (Complete typography definitions)
// =============================================================================

export interface TextStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing: string;
}

export interface TextStyles {
  // Display Styles
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;

  // Heading Styles
  headingLarge: TextStyle;
  headingMedium: TextStyle;
  headingSmall: TextStyle;

  // Body Styles
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;

  // Label Styles
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;

  // Caption Styles
  caption: TextStyle;
  overline: TextStyle;

  // Input Styles
  inputPlaceholder: TextStyle;
  inputLabel: TextStyle;
}

export const textStyles: TextStyles = {
  // Display Styles
  displayLarge: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize.displayLg,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize.displayMd,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: fontFamilies.display,
    fontSize: fontSize.displaySm,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },

  // Heading Styles
  headingLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.h1,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headingMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headingSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.h5,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textLg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textMd,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Label Styles
  labelLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textMd,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textXs,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },

  // Caption Styles
  caption: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textXs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSize.textXs,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.widest,
  },

  inputPlaceholder: {
    fontFamily: fontFamilies.secondary,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
  inputLabel: {
    fontFamily: fontFamilies.secondary,
    fontSize: fontSize.textSm,
    fontWeight: fontWeight.semiBold, 
    lineHeight: lineHeight.tight,    
    letterSpacing: letterSpacing.normal,
  },
};
