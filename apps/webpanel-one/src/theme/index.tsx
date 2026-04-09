import { createTheme } from '@mui/material/styles';
import { baseFontFamily, fontSize, fontWeight } from './style.typography';
import { brand, colors} from './style.palette';

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
    },
    secondary: {
      main: brand.secondaryMain,
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
          backgroundColor: brand.primaryMain,
          color: colors.white,
          borderRadius: 99,
          boxShadow: 'none',
          '&.Mui-disabled': {
            color: colors.white,
            backgroundColor: colors.grey50,
          },
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: brand.primaryMain,
          },
        },
        containedSecondary: {
          backgroundColor: colors.red100,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: colors.red100,
          },
        },
        sizeMedium: {
          fontWeight: fontWeight.medium,
          borderRadius: 99,
        },
        textPrimary: {
          backgroundColor: 'inherit',
          color: brand.primaryMain,
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
          color: brand.primaryMain,
          fontSize: fontSize.b1,
          fontWeight: fontWeight.regular,
          padding: '0 !important',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'inherit',
          },
        },
        outlinedSecondary: {
          borderRadius: 99,
        },
        outlinedPrimary: {
          borderRadius: 10,
          borderColor: brand.primaryMain,
          color: brand.primaryMain,
          background: 'inherit',
          '&:hover': {
            background: 'inherit',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px',
        },
        head: {
          padding: '16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 10px #00000003',
          // padding: '32px 32px 16px 32px',
          padding: '32px 0 16px 0',
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
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: fontSize.b1,
          borderRadius: '10px',
          borderColor: colors.black,
          backgroundColor: colors.white,
          border: 'none',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${colors.black} !important`,
          },
          '&.Mui-error': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: `${colors.red100} !important`,
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important',
            borderColor: `${colors.grey100} !important`,
          },
          '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${colors.red100} !important`,
          },
          '&.Mui-disabled': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#BBBBBF !important',
            },
          },
        },
        input: {
          padding: '12px',
        },
        inputMultiline: {
          padding: '0px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12px',
        },
        notchedOutline: {
          borderColor: colors.grey50,
          borderRadius: '4px',
          borderWidth: '1px !important',
        },
      },
    },
    MuiFormControl: {},
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: -2,
          color: colors.grey100,
          fontSize: fontSize.b2,
          '&.Mui-focused': {
            color: colors.grey100,
          },
          '&.Mui-error': {
            color: colors.red100,
          },
        },
        shrink: {
          top: 0,
        },
        asterisk: {
          color: colors.red100,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: colors.grey100,
          '&:hover': {
            color: brand.primaryMain,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          minWidth: '344px',
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
          '&.Mui-focused': {
            backgroundColor: `${colors.grey10} !important`,
          },
          '&[aria-selected="true"]': {
            backgroundColor: `${brand.primaryMain} !important`,
            color: `${colors.white} !important`,
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
          backgroundColor: brand.primaryMain,
          color: colors.white,
          borderRadius: '60px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
