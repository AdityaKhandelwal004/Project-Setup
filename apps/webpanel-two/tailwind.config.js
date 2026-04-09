
// Define theme values directly since we're using TypeScript modules
const themeColors = {
  // Brand colors
  primaryMain: '#6828E8',
  primaryLight: '#8B5CF6',
  primaryDark: '#5B21B6',
  secondaryMain: '#064345',
  accent: '#FF4B00',
  accentLight: '#FF6B35',
  buttonColor: '#6828E8',
  commonBackground: '#FFFFFF',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  bottomBorderColor: '#E5E5E5',
  paleGray: '#F5F5F5',
  peach: '#FFE4E1',
  lavenderPurple: '#E6E6FA',
  placeHolderColor: '#9CA3AF',
  lightNeutralGray: '#F3F4F6',
  mintGreen: '#F0FDF4',
  deepGreen: '#064345',
  paleGreen: '#ECFDF5',
  lightPurple: '#F3E8FF',
  darkGray: '#374151',
  mediumGray: '#6B7280',
  purple200: '#DDD6FE',
  neutralGray: '#9CA3AF',
  royalBlue: '#1E40AF',
  green: '#10B981',
  lightGreen: '#ECFDF5',
  yellow: '#F59E0B',
  lightYellow: '#FEF3C7',
  brightRed: '#EF4444',
  violet: '#8B5CF6',
  panPurple: '#A855F7',
  lightCyan: '#ECFEFF',
  button:'#100937',
  neutral:'#2D2D2D',
  questionSubtitle: '#5D5D5D',

};

const modernBreakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './apps/client/src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    // Override default breakpoints with our theme
    screens: {
      sm: modernBreakpoints.sm,
      md: modernBreakpoints.md,
      lg: modernBreakpoints.lg,
      xl: modernBreakpoints.xl,
      '2xl': modernBreakpoints['2xl'],
    },



    extend: {


      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wave: "wave 1.5s infinite ease-in-out",
      },




      
      // Colors from our theme system
      colors: {
        // Brand palette
        brand: {
          primary: themeColors.primaryMain,
          'primary-light': themeColors.primaryLight,
          'primary-dark': themeColors.primaryDark,
          secondary: themeColors.secondaryMain,
          accent: themeColors.accent,
          'accent-light': themeColors.accentLight,
          buttonColor: themeColors.buttonColor,
          background: themeColors.commonBackground,
          commonBackground: themeColors.commonBackground,
          border: themeColors.borderColor,
          borderColor: themeColors.borderColor,
          'border-bottom': themeColors.bottomBorderColor,
          bottomBorderColor: themeColors.bottomBorderColor,
          'pale-gray': themeColors.paleGray,
          paleGray: themeColors.paleGray,
          peach: themeColors.peach,
          lavenderPurple: themeColors.lavenderPurple,
          placeHolderColor: themeColors.placeHolderColor,
          lightNeutralGray: themeColors.lightNeutralGray,
          mintGreen: themeColors.mintGreen,
          deepGreen: themeColors.deepGreen,
          pale_green: themeColors.paleGreen,
          lightPurple: themeColors.lightPurple,
          darkGray: themeColors.darkGray,
          black: '#000000',
          mediumGray: themeColors.mediumGray,
          purple200: themeColors.purple200,
          neutralGray: themeColors.neutralGray,
          button: themeColors.button,
          neutral:themeColors.neutral,
          questionSubtitle:themeColors.questionSubtitle
        },

        // Semantic colors
        success: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FFFBEB',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#EFF6FF',
          dark: '#2563EB',
        },

        // Project specific colors
        'royal-blue': themeColors.royalBlue,
        green: {
          DEFAULT: themeColors.green,
          50: '#F0FDF4',
          100: '#ECF8EA',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: themeColors.green,
          600: '#10B981',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        'light-green': themeColors.lightGreen,
        purple: {
          DEFAULT: themeColors.primaryMain,
          50: '#F0EAFD',
          100: '#E4D4F4',
          200: '#C9A9E9',
          300: '#AE7EDE',
          400: '#9353D3',
          500: themeColors.primaryMain,
          600: '#6C5CE7',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3C1A78',
        },
        yellow: themeColors.yellow,
        'light-yellow': themeColors.lightYellow,
        'bright-red': themeColors.brightRed,
        violet: themeColors.violet,

        'pan-purple': themeColors.panPurple,
        'light-cyan': themeColors.lightCyan,

        // Neutral colors
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          DEFAULT: '#737373',
          dark: '#404040',
          blackgray: '#262626',
          light: '#E5E5E5',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },

      },

      // Typography

      // fontFamily: {
      //   sans: [
      //     'Nohemi',
      //     'Inter',
      //     '-apple-system',
      //     'BlinkMacSystemFont',
      //     '"Segoe UI"',
      //     'Roboto',
      //     '"Helvetica Neue"',
      //     'Arial',
      //     'sans-serif',
      //   ],
      //   mono: [
      //     '"SF Mono"',
      //     'Monaco',
      //     'Inconsolata',
      //     '"Roboto Mono"',
      //     '"Source Code Pro"',
      //     'monospace',
      //   ],
      //   baseFontFamily: ['"Nohemi"', '"DM Sans"', 'sans-serif'],
      // },

         fontFamily: {
        nohemi: ['"Nohemi"', 'sans-serif'],
        dmSans: ['"DM Sans"', 'sans-serif'],
         },

      // Typography from theme
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeight: {
        none: '100%',
        tight: '125%',
        snug: '137.5%',
        normal: '150%',
        relaxed: '162.5%',
        loose: '200%',
      },
      letterSpacing: {
        tighter: '-5%',
        tight: '-2.5%',
        normal: '0%',
        wide: '2.5%',
        wider: '5%',
        widest: '10%',
      },

      // Spacing from theme
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '11px',
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
        18: '72px',
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
        88: '352px',
        96: '384px',
        128: '512px',
      },

      // Shadows from theme
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        // Brand-specific shadows
        'brand-primary': '0 10px 15px -3px rgba(104, 40, 232, 0.1), 0 4px 6px -2px rgba(104, 40, 232, 0.05)',
        'brand-accent': '0 10px 15px -3px rgba(255, 75, 0, 0.1), 0 4px 6px -2px rgba(255, 75, 0, 0.05)',
      },



      // Transitions
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
    },
  },

  plugins: [
    // Add any Tailwind plugins here
  ],
};
