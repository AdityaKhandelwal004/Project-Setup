import { createTheme } from '@mui/material/styles';
import {
  baseFontFamily,
  fontSize,
  fontWeight,
} from './style.typography.ts';
import {
  colors,
  brand,
  greyScaleColour,
  primitiveColors,
} from './style.palette.ts';
import {
  spacing,
  borderRadius,
} from './style.layout.ts';

// Export all design tokens
export * from './style.palette.ts';
export * from './style.typography.ts';
export * from './style.global.ts';
export * from './style.layout.ts';
export * from './modules/index.ts';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (up to 767px)
      sm: 768, // Small devices (768px and up)
      md: 1024, // Medium devices (1024px and up)
      lg: 1600, // Large devices (1600px and up)
      xl: 1921, // Extra large devices (1920px and up)
    },
  },
  typography: {
    fontFamily: baseFontFamily,
    h1: {
      fontSize: fontSize.h1,
      fontWeight: fontWeight.semiBold,
    },
    h2: {
      fontSize: fontSize.h2,
      fontWeight: fontWeight.medium,
    },
    h3: {
      fontSize: fontSize.h3,
      fontWeight: fontWeight.medium,
    },
    h4: {
      fontSize: fontSize.h4,
      fontWeight: fontWeight.medium,
    },
    h5: {
      fontSize: fontSize.h5,
      fontWeight: fontWeight.semiBold,
    },
    body1: {
      fontSize: fontSize.b1,
      fontWeight: fontWeight.regular,
    },
    body2: {
      fontSize: fontSize.b2,
      fontWeight: fontWeight.regular,
    },
    subtitle1: {
      fontSize: fontSize.b1,
      fontWeight: fontWeight.medium,
    },
    subtitle2: {
      fontSize: fontSize.b2,
      fontWeight: fontWeight.medium,
    },
  },
  palette: {
    primary: {
      main: brand.primaryMain,
      light: brand.primaryLight,
      dark: brand.primaryDark,
      contrastText: brand.white
    },
    secondary: {
      main: brand.secondaryMain,
      light: brand.secondary100,
      dark: brand.secondaryHover,
      contrastText: brand.white,
    },
    error: {
      main: colors.errorDefault,
      light: colors.errorBg,
      dark: colors.errorHover,
      contrastText: brand.white,
    },
    warning: {
      main: colors.warningDefault,
      light: colors.warningBg,
      dark: colors.warning,
      contrastText: brand.white,
    },
    success: {
      main: colors.successDefault,
      light: colors.successBg,
      dark: colors.successHover,
      contrastText: brand.white,
    },
    info: {
      main: colors.informationDefault,
      light: colors.informationBg,
      dark: colors.info,
      contrastText: brand.white,
    },
    background: {
      default: brand.commonBackground,
      paper: brand.surface,
    },
    text: {
      primary: brand.blackGray,
      secondary: brand.gray,
      disabled: brand.darkGray,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0px',
          fontFamily: baseFontFamily,
          fontSize: fontSize.h5,
          fontWeight: fontWeight.medium,
          color: greyScaleColour.white100,
          borderRadius: '4px',
          boxShadow: 'none',
          padding: '8px 16px',
          width: '100%',
          lineHeight: '24px',
        },
        containedPrimary: {
          backgroundColor: '#100937',
          lineHeight:'26px',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: brand.buttonHover,
          },
          '&.Mui-disabled': {
            color: greyScaleColour.grey60,
            backgroundColor: greyScaleColour.grey20,
          },
        },
        containedError: {
          backgroundColor: colors.errorDefault,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: colors.errorHover,
          },
          '&.Mui-disabled': {
            color: greyScaleColour.grey80,
            backgroundColor: greyScaleColour.grey20,
          },
        },
        outlinedSecondary: {
          backgroundColor: brand.white,
          color: brand.black,
          border: `1px solid ${brand.black}`,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: brand.black,
            color: brand.white,
          },
          '&.Mui-disabled': {
            color: greyScaleColour.grey80,
            backgroundColor: brand.white,
          },
        },
        sizeMedium: {
          fontWeight: fontWeight.medium,
          borderRadius: '4px',
        },
        textPrimary: {
          backgroundColor: 'inherit',
          color: brand.white,
          fontSize: fontSize.b2,
          fontWeight: fontWeight.regular,
          padding: '0 !important',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'inherit',
          },
        },
        textSecondary: {
          backgroundColor: 'inherit',
          color: brand.black,
          fontSize: fontSize.b1,
          fontWeight: fontWeight.regular,
          padding: '0 !important',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'inherit',
          },
        },
        outlinedPrimary: {
          borderRadius: '4px',
          borderColor: brand.black,
          color: brand.black,
          background: 'inherit',
          '&:hover': {
            background: 'inherit',
            boxShadow: 'none',
             color: `${brand.white} !important`
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: brand.black,
          background:greyScaleColour.grey10,

          '&.Mui-checked': {
            color: brand.primaryMain,
            border: `2px solid ${brand.primary100}`
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px',
          borderBottom: 'none',
          
        },
        head: {
          padding: '12px 24px',
          color: greyScaleColour.grey100,
          backgroundColor: colors.theadBg,
          fontWeight:fontWeight.medium,
          fontSize:fontSize.h5,
          lineHeight:'21px'
        },
        body: {
          lineHeight: '21px',
          padding:'10px 24px',
          borderBottom: '1px solid #EEEEEE',
          fontSize: fontSize.b1,
          fontWeight: fontWeight.regular,
          color:brand.black
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          padding: '4px 12px',
          '&.MuiChip-label': {
            padding: 0,
          },
        },
        label: {
          padding: 0,
          fontSize: fontSize.b2,
          fontWeight: fontWeight.medium,
        },
        icon: {
          fontSize: '16px',
          marginLeft: '8px',
          marginRight: '-4px',
        },
        filledPrimary: {
          backgroundColor: brand.primary40,
          color: brand.primary100,
        },
        outlinedPrimary: {
          border: `1px solid ${brand.primary100}`,
          color: brand.primary100,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: 'none',
          border: `1px solid ${greyScaleColour.grey80}`,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            paddingBottom: '0px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '42px',
          borderRadius: borderRadius.md,
          backgroundColor: primitiveColors.neutral0,
          border: `2px solid ${greyScaleColour.grey15}`,
          fontFamily: 'inherit',
          fontSize: fontSize.textMd,
          fontWeight: fontWeight.regular,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: greyScaleColour.grey60,
          },
          '&.Mui-focused': {
            borderColor: greyScaleColour.grey80,
            boxShadow: 'none',
          },
          '&.Mui-error': {
            borderColor: colors.errorDefault,
            '&.Mui-focused': {
              borderColor: colors.errorDefault,
              boxShadow: 'none',
            },
          },
          '&.Mui-disabled': {
            backgroundColor: greyScaleColour.grey10,
            borderColor: greyScaleColour.grey25,
            color: greyScaleColour.grey50,
            cursor: 'not-allowed',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
        input: {
          padding: spacing[4],
          color: `${greyScaleColour.grey100} !important`,
          fontSize: `${fontSize.textSm} !important`,
          fontWeight: `${fontWeight.regular} !important`,
          lineHeight: `1.5 !important`,
          '&:focus': {
            outline: 'none',
          },
          '&::placeholder': {
            color: `${primitiveColors.grey400} !important`,
            fontWeight: `${fontWeight.medium} !important`,
            fontSize: `${fontSize.textSm} !important`,
            lineHeight: `20px !important`,
            opacity: '1 !important',
          },
          '&:focus::placeholder': {
            color: `${greyScaleColour.grey50} !important`,
            fontWeight: `${fontWeight.medium} !important`,
            fontSize: `${fontSize.textSm} !important`,
            lineHeight: `20px !important`,
            opacity: '1 !important',
          },
        },
        inputMultiline: {
          padding: '0px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '14px 16px',
          fontSize: fontSize.h5,
          '&::placeholder': {
            color: `${greyScaleColour.grey50} !important`,
            fontWeight: `${fontWeight.medium} !important`,
            fontSize: `${fontSize.textSm} !important`,
            lineHeight: `20px !important`,
            opacity: '1 !important',
          },
          '&:focus::placeholder': {
            color: `${greyScaleColour.grey50} !important`,
            fontWeight: `${fontWeight.medium} !important`,
            fontSize: `${fontSize.textSm} !important`,
            lineHeight: `20px !important`,
            opacity: '1 !important',
          },
        },
        notchedOutline: {
          borderColor: greyScaleColour.grey40,
          borderRadius: '4px',
          borderWidth: '1px !important',
        },
      },
    },
    MuiFormControl: {},
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: greyScaleColour.grey60,
          fontSize: fontSize.textSm,
          fontWeight: fontWeight.medium,
          transform: `translate(${spacing[4]}, 12px) scale(1)`,
          '&.Mui-focused': {
            color: colors.accent,
          },
          '&.Mui-error': {
            color: colors.errorDefault,
          },
          '&.MuiInputLabel-shrink': {
            transform: `translate(${spacing[4]}, -6px) scale(0.75)`,
            backgroundColor: primitiveColors.neutral0,
            padding: '0 4px',
          },
        },
        asterisk: {
          color: colors.errorDefault,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: greyScaleColour.grey100,
          '&:hover': {
            color:brand.primaryMain,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '6px',
          },
        },
        option: {
          '&:hover': {
            backgroundColor: '#10093710',
            color: '#100937 !important',
          },
          '&.Mui-focused': {
            backgroundColor: '#10093710',
            color: '#100937',
          },
          '&[aria-selected="true"]': {
            backgroundColor: '#100937 !important',
            color: `${brand.white} !important`,
          },
        },
        paper: {
          boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.12)',
        },
        input: {
          minWidth: '0px !important',
        },
        tag: {
          display: 'flex',
          padding: '2px 10px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#100937',
          color: brand.white,
          borderRadius: '60px',
        },
      },
    },
  },
});

export default theme;


export const obiemoneyTheme = {
  components: {
    modal: {
      // Container
      maxWidth: '521px',
      minWidth: '400px',
      borderRadius: borderRadius.xl,
      marginTop: {
        default: 'min(10vh, 128px)',
        reduced: '1vh',
        small: '2vh',
      },
      breakpoints: {
        smallHeight: '656px',
      },

      // Header
      header: {
        height: '131.25px',
        padding: spacing[6],
        gap: spacing[5],
      },

      // Form area
      form: {
        padding: spacing[6],
        gap: spacing[5],
        minHeight: '182px',
      },

      // Button wrapper
      buttonWrapper: {
        padding: `${spacing[8]} 0`,
        gap: spacing[3],
        minHeight: '104px',
      },

      // Individual button sizing
      button: {
        height: '48px',
        padding: `15px 20px`,
        borderRadius: '10px',
        minWidth: '99px',
      },

      // Legacy support
      padding: spacing[6],
      headerPadding: spacing[6],
      closeMarginLeft: spacing[4],
      closeMarginTop: spacing[1],
      contentGap: spacing[4],
      textGap: spacing[1],
      iconSize: spacing[12],
    },
  },
} as const;

export type ObiemoneyTheme = typeof obiemoneyTheme;

