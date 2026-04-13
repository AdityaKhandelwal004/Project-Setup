export interface PrimitiveColors {
  // Purple Scale
  purple50: string;
  purple100: string;
  purple200: string;
  purple300: string;
  purple400: string;
  purple450: string;
  purple500: string;
  purple600: string;
  purple700: string;
  purple800: string;
  purple900: string;
  purple1000: string;
  purple1001: string;

  // Green Scale
  green50: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green500: string;
  green600: string;
  green700: string;
  green800: string;
  green900: string;

  // Teal Scale
  teal50: string;
  teal100: string;
  teal200: string;
  teal300: string;
  teal400: string;
  teal500: string;
  teal600: string;
  teal700: string;
  teal800: string;
  teal900: string;
  tealLightBg: string;

  // Orange Scale
  orange50: string;
  orange100: string;
  orange200: string;
  orange300: string;
  orange400: string;
  orange500: string;
  orange600: string;
  orange700: string;
  orange800: string;
  orange900: string;

  // Neutral Scale
  neutral0: string;   // Pure white
  neutral1: string;   // Off white
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
  neutral1000: string; // Pure black

  // Semantic Colors
  red50: string;
  red100: string;
  red500: string;
  red600: string;
  red700: string;

  yellow50: string;
  yellow100: string;
  yellow500: string;
  yellow600: string;

  blue50: string;
  blue100: string;
  blue500: string;
  blue600: string;

  // UI Colors
  grey400: string;
  grey401: string;
  midNight: string;
  midNight400: string;
  midNight600: string;
  midNight700: string;
}

export const primitiveColors: PrimitiveColors = {
  // Purple Scale (Primary brand color)
  purple50: '#F8F6FF',
  purple100: '#F0EAFD',
  purple200: '#E1D5FB',
  purple300: '#C9B3F7',
  purple400: '#A37AF9',
  purple450: '#BA9CF4',
  purple500: '#6828E8',  // Main brand purple
  purple600: '#5A23D1',
  purple700: '#4C1D95',
  purple800: '#100937',
  purple900: '#2E145C',
  purple1000: '#D0BCF8',
  purple1001: '#FCFBFF',

  // Green Scale (Secondary brand color)
  green50: '#ECFDF5',
  green100: '#DCFCE7',
  green200: '#BBF7D0',
  green300: '#86EFAC',
  green400: '#4ADE80',
  green500: '#12B981',  // Main brand green
  green600: '#053A3C',
  green700: '#042F31',
  green800: '#032426',
  green900: '#021A1C',

  // Teal Scale (Forest teal color)
  teal50: '#E6ECEC',
  teal100: '#B2C5C5',
  teal200: '#7D9E9E',
  teal300: '#4A7777',
  teal400: '#2A5A5A',
  teal500: '#064345',  // Main forest teal
  teal600: '#053A3C',
  teal700: '#042F31',
  teal800: '#032426',
  teal900: '#021A1C',
  tealLightBg: '#F0F9F7',

  // Orange Scale (Accent color)
  orange50: '#FFF7ED',
  orange100: '#FFEDD5',
  orange200: '#FED7AA',
  orange300: '#FDBA74',
  orange400: '#FB923C',
  orange500: '#FF4B00',  // Main accent orange
  orange600: '#E64300',
  orange700: '#C2410C',
  orange800: '#9A3412',
  orange900: '#7C2D12',

  // Neutral Scale
  neutral0: '#FFFFFF',
  neutral1: '#FFFEFD',  // Off white for card backgrounds
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#E5E5E5',
  neutral300: '#D4D4D4',
  neutral400: '#A3A3A3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral1000: '#000000',

  // Semantic Colors
  red50: '#FEF2F2',
  red100: '#FEE2E2',
  red500: '#EF4444',
  red600: '#DC2626',
  red700: '#B91C1C',

  yellow50: '#FFFBEB',
  yellow100: '#FEF3C7',
  yellow500: '#F59E0B',
  yellow600: '#D97706',

  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue500: '#3B82F6',
  blue600: '#2563EB',

  // UI Colors
  grey400: '#ADADAD',
  grey401: '#D0D0D2',
  
  midNight400: '#403A5F',
  midNight: '#100937', // Main brand purple
  midNight600: '#5A23D1',
  midNight700: '#0B0627',

};

export interface AdminColor {
  background: string;
}
export const adminColor: AdminColor = {
  background: primitiveColors.neutral1000,
};

export interface EmployeeColor {
  background: string;
}
export const employeeColor: EmployeeColor = {
  background: primitiveColors.neutral100,
};

export interface SemanticColors {
  // Basic Colors
  black: string;
  white: string;

  // Status Colors
  success: string;
  successHover: string;
  successDefault: string;
  successBg: string;
  warning: string;
  warningDefault: string;
  warningBg: string;
  error: string;
  errorDefault: string;
  errorHover: string;
  errorBg: string;
  info: string;
  informationDefault: string;
  informationBg: string;

  // Interactive Colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;

  secondary: string;
  secondaryHover: string;
  secondaryActive: string;

  accent: string;
  accentHover: string;
  accentActive: string;

  // Background Colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  surface: string;
  surfaceSecondary: string;
  overlay: string;

  // Border Colors
  border: string;
  borderSecondary: string;
  borderFocus: string;
  borderError: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnAccent: string;

  // Legacy Colors (for backward compatibility)
  royalBlue: string;
  green: string;
  lightGreen: string;
  paleGreen: string;
  yellow: string;
  lightYellow: string;
  brightRed: string;
  purple: string;
  violet: string;
  panPurple: string;
  lightCyan: string;
  tableBorder: string;
  greyBorder: string;
  greyBorder2: string;
  shadowLine: string;
  sidebar: string;
  bgGrey: string;
  bg: string;
  theadBg: string;
  label: string;
  yellow100: string;
  yellow80: string;
  darkNavy100: string;
  darkNavy80: string;
  ebony: string;
  ebonylight: string;
  ashgrey: string;
  cream: string;
  alabaster: string;
  lightAshGray: string;
  deepGreen:string;
  midNight:string;
  midNight400:string;
  forestTeal: string;
  bgGreen: string;
  borderGreen:string;
  borderOrange:string;
  purpleLightBg:string;
  inputTitle: string;
}

// Semantic color assignments using primitive colors
export interface Colors extends SemanticColors {} // For backward compatibility
export const colors: Colors = {
  // Basic Colors
  black: primitiveColors.neutral1000,
  white: primitiveColors.neutral0,

  // Status Colors
  success: primitiveColors.green500,
  successHover: primitiveColors.green600,
  successDefault: primitiveColors.green500,
  successBg: primitiveColors.green50,
  warning: primitiveColors.yellow500,
  warningDefault: primitiveColors.yellow500,
  warningBg: primitiveColors.yellow50,
  error: primitiveColors.red500,
  errorDefault: primitiveColors.red500,
  errorHover: primitiveColors.red600,
  errorBg: primitiveColors.red50,
  info: primitiveColors.blue500,
  informationDefault: primitiveColors.blue500,
  informationBg: primitiveColors.blue50,

  // Interactive Colors
  primary: primitiveColors.purple500,
  primaryHover: primitiveColors.purple600,
  primaryActive: primitiveColors.purple700,
  primaryDisabled: primitiveColors.neutral300,

  secondary: primitiveColors.green500,
  secondaryHover: primitiveColors.green600,
  secondaryActive: primitiveColors.green700,

  accent: primitiveColors.orange500,
  accentHover: primitiveColors.orange600,
  accentActive: primitiveColors.orange700,

  // Background Colors
  background: primitiveColors.neutral0,
  backgroundSecondary: primitiveColors.neutral50,
  backgroundTertiary: primitiveColors.neutral100,
  surface: primitiveColors.neutral0,
  surfaceSecondary: primitiveColors.neutral50,
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Border Colors
  border: primitiveColors.neutral200,
  borderSecondary: primitiveColors.neutral300,
  borderFocus: primitiveColors.purple500,
  borderError: primitiveColors.red500,

  // Text Colors
  textPrimary: primitiveColors.neutral900,
  textSecondary: primitiveColors.neutral600,
  textTertiary: primitiveColors.neutral500,
  textDisabled: primitiveColors.neutral400,
  textOnPrimary: primitiveColors.neutral0,
  textOnSecondary: primitiveColors.neutral0,
  textOnAccent: primitiveColors.neutral0,

  // Legacy Colors (for backward compatibility)
  royalBlue: '#4285F4',
  green: '#34A853',
  lightGreen: '#27AE60',
  bgGreen: '#ECFDF5',
  borderGreen: '#A8F2D0',
  paleGreen: '#ECF8EA',
  yellow: '#FBBC05',
  lightYellow: '#FEF6ED',
  brightRed: '#EA4335',
  purple: '#6C5CE7',
  violet: '#7C3AED',
  panPurple: '#6366F1',
  lightCyan: '#E9F7F4',
  tableBorder: primitiveColors.neutral200,
  greyBorder: primitiveColors.neutral300,
  greyBorder2: primitiveColors.neutral400,
  shadowLine: primitiveColors.neutral100,
  sidebar: primitiveColors.neutral50,
  bgGrey: primitiveColors.neutral50,
  bg: primitiveColors.neutral0,
  theadBg: primitiveColors.neutral50,
  label: primitiveColors.neutral600,
  midNight:primitiveColors.neutral900,

  yellow100: '#FBBC05',
  yellow80: '#FCD34D',
  darkNavy100: '#1E3A8A',
  darkNavy80: '#3B82F6',
  ebony: '#374151',
  ebonylight: '#4B5563',
  ashgrey: '#9CA3AF',
  cream: '#FEF7ED',
  alabaster: '#F9FAFB',
  lightAshGray: '#D1D5DB',
  deepGreen: primitiveColors.teal500,
  forestTeal: primitiveColors.teal500,
  borderOrange: '#FFAC8A',
  purpleLightBg: '#F9F6FF',
  inputTitle: '#2D2D2D'

};

// =============================================================================
// BRAND COLORS (template-specific brand color system)
// =============================================================================

export interface Brand {
  // Primary Brand Colors (Purple Scale)
  primaryMain: string;
  primary100: string;
  primary40: string;
  primary20: string;
  primary05: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;

  // Secondary Brand Colors (Green Scale)
  secondaryMain: string;
  secondary100: string;
  secondaryHover: string;
  secondaryLight: string;
  secondaryDark: string;

  // Accent Colors (Orange Scale)
  accent: string;
  accentLight: string;
  accentHover: string;
  accentDark: string;

  // Component-specific Colors
  modalPrimary: string;
  buttonColor: string;
  buttonHover: string;
  buttonDisabled: string;

  // Background Colors
  commonBackground: string;
  progressBackground: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;

  // Border Colors
  borderColor: string;
  borderSecondary: string;
  bottomBorderColor: string;
  focusBorder: string;

  // Neutral Colors
  black: string;
  white: string;
  gray: string;
  grayLight: string;
  grayDark: string;
  darkGray: string;
  blackGray: string;
  paleGray: string;

  // State Colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Additional Colors
  paleGreen: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnAccent: string;
  questionText: string;
  questionSubtitle: string;
  midNight:string;
  errorBg:string;
}

export const brand: Brand = {
  // Primary Brand Colors (Purple Scale)
  primaryMain: primitiveColors.purple500,
  primary100: primitiveColors.purple500,
  primary40: primitiveColors.purple400,
  primary20: primitiveColors.purple100,
  primary05: primitiveColors.purple50,
  primaryHover: primitiveColors.purple600,
  primaryLight: primitiveColors.purple400,
  primaryDark: primitiveColors.purple700,
  midNight:primitiveColors.neutral900,



  // Secondary Brand Colors (Green Scale)
  secondaryMain: primitiveColors.green500,
  secondary100: primitiveColors.green500,
  secondaryHover: primitiveColors.green600,
  secondaryLight: primitiveColors.green400,
  secondaryDark: primitiveColors.green700,

  // Accent Colors (Orange Scale)
  accent: primitiveColors.orange500,
  accentLight: primitiveColors.orange400,
  accentHover: primitiveColors.orange600,
  accentDark: primitiveColors.orange700,

  // Component-specific Colors
  modalPrimary: primitiveColors.purple600,
  buttonColor: primitiveColors.purple800,
  buttonHover: primitiveColors.purple900,
  buttonDisabled: primitiveColors.neutral300,

  // Background Colors
  commonBackground: '#FFF6F2',  
  progressBackground: '#FFEDE6',
  surface: primitiveColors.neutral0,
  surfaceSecondary: primitiveColors.neutral50,
  surfaceElevated: primitiveColors.neutral0,

  // Border Colors
  borderColor: '#FFC7B0',        // Custom light orange border
  borderSecondary: primitiveColors.neutral200,
  bottomBorderColor: primitiveColors.neutral200,
  focusBorder: primitiveColors.purple500,

  // Neutral Colors
  black: primitiveColors.neutral1000,
  white: primitiveColors.neutral0,
  gray: primitiveColors.neutral500,
  grayLight: primitiveColors.neutral400,
  grayDark: primitiveColors.neutral600,
  darkGray: primitiveColors.neutral700,
  blackGray: primitiveColors.neutral800,
  paleGray: primitiveColors.purple100,

  // State Colors
  success: primitiveColors.green500,
  warning: primitiveColors.yellow500,
  error: primitiveColors.red500,
  errorBg:primitiveColors.red50,
  info: primitiveColors.blue500,

  // Additional Colors
  paleGreen: '#ECF8EA',

  // Text Colors
  textPrimary: primitiveColors.neutral900,
  textSecondary: primitiveColors.neutral600,
  textTertiary: primitiveColors.neutral500,
  textOnPrimary: primitiveColors.neutral0,
  textOnSecondary: primitiveColors.neutral0,
  textOnAccent: primitiveColors.neutral0,

  // Question Colors
  questionText: primitiveColors.neutral700,
  questionSubtitle: '#5D5D5D',
};

export interface GreyScaleColour {
  grey100: string;
  grey80: string;
  grey60: string;
  grey50: string;
  grey40: string;
  grey30: string;
  grey25: string;
  grey20: string;
  grey15: string;
  grey10: string;
  grey05: string;
  white100: string;
  darkGrey: string;
}
export const greyScaleColour: GreyScaleColour = {
  grey100: '#2D2D2D',
  grey80: '#515151CC',
  grey60: '#51515199',
  grey50: '#5D5D5D',
  grey40: '#51515166',
  grey30: '#717680',
  grey25: '#51515140',
  grey20:'#51515133',
  grey15: '#E8E8E8',
  grey10:'#5151511A',
  grey05: '#F5F5F5',
  white100: '#FFFFFF',
  darkGrey: '#474747'
}

export interface OtherColour {
  completedBg: string;
  completedDefault: string;
  inProgressBg: string;
  inProgressDefault: string;
  notStartedBg: string;
  notStartedDefault: string;
  green: string;
  purple: string;
  cardGreenBg: string;
  cardBrownBg: string;
  brown: string;
  greenText: string;
  greyChip: string;
  chipSuccess:string
  cardText: string;
  redChip: string;
  errorDefault: string;
  errorBg:string;
  switchThumb:string
  toastErrorBorder: string;
  toastSuccessBorder: string;
  toastInfoBorder: string;
  toastInfoBg: string;
  toastWarningBg: string;
  toastWarningBorder: string;
  dashboardCardBg: string;
  orangeLightBg: string;
  dullGreen: string;
  lightGreen: string;
  subscriptionBg: string;
};
export const otherColour: OtherColour = {
  completedBg: '#E9F9F1',
  completedDefault: '#118D57',
  inProgressBg: '#FFF4E5',
  inProgressDefault: '#EF6C00',
  notStartedBg: '#5151511A',
  notStartedDefault: '#515151',
  green:'#44A14F',
  purple:'#444CA1',
  cardGreenBg: '#D1FAE5',
  cardBrownBg: '#FDEAD7',
  brown: '#E04B16',
  greenText: '#057756',
  greyChip: '#E7E6EB',
  chipSuccess: '#079467',
  cardText: '#7A7A7A',
  redChip: '#DA3737',
  errorDefault: "#EB4848",
  errorBg: '#FFE4DE',
  switchThumb: '#918EA3',
  toastErrorBorder: '#FAA7A7',
  toastSuccessBorder: '#6FE6B7',
  toastInfoBorder: '##7DD1FC',
  toastInfoBg: '#F0F9FF',
  toastWarningBg: '#FEF6EE',
  toastWarningBorder: '#F7B07A',
  dashboardCardBg: "#F8F8F8",
  orangeLightBg: '#FFFCF9',
  dullGreen: '#588182',
  lightGreen: '#B2C5C5',
  subscriptionBg: '#E7E6EB'

  
};
