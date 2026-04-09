
export interface Breakpoints {
  phone: number;
  tablet: number;
  desktop: number;
}

export const breakpoints: Breakpoints = {
  phone: 767,
  tablet: 1023,
  desktop: 1199,
};

export interface RespondTo {
  smOnly: string;
  smUp: string;
  mdUp: string;
  mdDown: string;
  lgUp: string;
  lgDown: string;
  screenDown: (sizeInPixel: number) => string;
  screenUp: (sizeInPixel: number) => string;
  screenRange: (sizeInPixelL: number, sizeInPixelH: number) => string;
  screenHight: (sizeInPixel: number) => string;
}

export const respondTo: RespondTo = {
  smOnly: `@media only screen and (max-width: ${breakpoints.phone}px)`,
  smUp: `@media only screen and (min-width: ${breakpoints.phone + 1}px)`,
  mdUp: `@media only screen and (min-width: ${breakpoints.tablet + 1}px)`,
  mdDown: `@media only screen and (max-width: ${breakpoints.tablet}px)`,
  lgUp: `@media only screen and (min-width: ${breakpoints.desktop + 1}px)`,
  lgDown: `@media only screen and (max-width: ${breakpoints.desktop}px)`,
  screenDown: (sizeInPixel: number) =>
    `@media only screen and (max-width: ${sizeInPixel}px)`,
  screenUp: (sizeInPixel: number) =>
    `@media only screen and (min-width: ${sizeInPixel}px)`,
  screenRange: (sizeInPixelL: number, sizeInPixelH: number) =>
    `@media only screen and (min-width: ${sizeInPixelL}px) and (max-width: ${sizeInPixelH}px)`,
  screenHight: (sizeInPixel: number) =>
    `@media only screen and (max-height: ${sizeInPixel}px)`,
};

// =============================================================================
// DESIGN SYSTEM SPACING (8px base grid)
// =============================================================================

export interface Spacing {
  0: string;
  1: string;    
  2: string;      
  3: string;    
  4: string;    
  5: string;    
  6: string;    
  7: string;    
  8: string;    
  9: string;    
  10: string;   
  11: string;   
  12: string;   
  14: string;   
  16: string;   
  20: string;   
  24: string;   
  28: string;   
  32: string;   
  36: string;   
  40: string;   
  44: string;   
  48: string;   
  52: string;   
  56: string;   
  60: string;   
  64: string;   
  72: string;   
  80: string;   
  96: string;   
}

export const spacing: Spacing = {
  0: '0',
  1: '4px',       
  2: '8px',      
  3: '12px',      
  4: '16px',      
  5: '20px',     
  6: '24px',     
  7: '28px',     
  8: '32px',     
  9: '36px',     
  10: '40px',    
  11: '44px',    
  12: '48px',    
  14: '56px',    
  16: '64px',    
  20: '80px',    
  24: '96px',    
  28: '112px', 
  32: '128px', 
  36: '144px', 
  40: '160px', 
  44: '176px', 
  48: '192px', 
  52: '208px', 
  56: '224px', 
  60: '240px', 
  64: '256px', 
  72: '288px', 
  80: '320px', 
  96: '384px', 
};

// =============================================================================
// BORDER RADIUS SYSTEM
// =============================================================================

export interface BorderRadius {
  none: string;
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export const borderRadius: BorderRadius = {
  none: '0',
  xs: '2px',        
  sm: '4px',        
  base: '6px',      
  md: '8px',        
  lg: '12px',       
  xl: '16px',       
  '2xl': '24px',    
  '3xl': '32px',    
  full: '9999px',
};

export interface ModernBreakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export const modernBreakpoints: ModernBreakpoints = {
  xs: '0px',        // Mobile (default)
  sm: '640px',      // Small tablets
  md: '768px',      // Tablets
  lg: '1024px',     // Small laptops
  xl: '1280px',     // Laptops
  '2xl': '1536px',  // Large screens
};

// =============================================================================
// Z-INDEX SYSTEM
// =============================================================================

export interface ZIndex {
  hide: number;
  auto: number;
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

export const zIndex: ZIndex = {
  hide: -1,
  auto: 0,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// =============================================================================
// SHADOW SYSTEM
// =============================================================================

export interface Shadows {
  none: string;
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export const shadows: Shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export interface Animation {
  duration: {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    slower: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    bounce: string;
  };
}

export const animation: Animation = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// =============================================================================
// INPUT SIZING SYSTEM
// =============================================================================

export interface InputSizes {
  small: string;  
  medium: string;    
  large: string;      
  full: string;      
}

export const inputSizes: InputSizes = {
  small: '196px',     // Grid column size
  medium: '300px',    // Medium size
  large: '406px',     // Large size 
  full: '100%',       // Full width
};

export interface InputHeight {
  default: string;    // Standard input height
  compact: string;    // Compact input height
  large: string;      // Large input height
}

export const inputHeight: InputHeight = {
  default: '48px',    // Default
  compact: '40px',    // Compact version
  large: '56px',      // Large version
};

// =============================================================================
// GRID SYSTEM
// =============================================================================

export interface Grid {
  columns: number;
  gutter: string;
  margin: string;
  maxWidth: string;
}

export interface GridSystem {
  mobile: Grid;
  tablet: Grid;
  desktop: Grid;
  wide: Grid;
}

export const gridSystem: GridSystem = {
  mobile: {
    columns: 4,
    gutter: spacing[4],  
    margin: spacing[4],  
    maxWidth: '100%',
  },
  tablet: {
    columns: 8,
    gutter: spacing[6],   
    margin: spacing[6],   
    maxWidth: '768px',
  },
  desktop: {
    columns: 12,
    gutter: spacing[8],    
    margin: spacing[8],    
    maxWidth: '1200px',
  },
  wide: {
    columns: 12,
    gutter: spacing[8],    
    margin: spacing[12],   
    maxWidth: '1440px',
  },
};
