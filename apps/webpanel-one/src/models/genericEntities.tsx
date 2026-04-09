import { colors, otherColour, primitiveColors } from "@mono/theme";

export interface LoaderState {
  visibility?: boolean;
}


export enum TabModuleRoutes {
  OPTIMISE = 'optimise',
  MAXIMISE = 'maximise',
  PROTECT = 'protect',
}
  

export enum SubtabModuleRoutes {
  SUPER = 'super',
  INVESTING = 'investing',
  INSURANCE = 'insurance',
  ASSET_PROTECTION = 'asset-protection',
  ESTATE_PLANNING = 'estate-planning',
  BUDGET = 'budget',
  SAFETY_NET = 'safety-net',
  DEBT = 'debt',
  SAVINGS = 'savings',
}
  

  export const chipStylesByStatus = {
    profit: {
      bgColor: primitiveColors.green50,
      textColor: otherColour.chipSuccess,
    },
    loss: {
      bgColor: primitiveColors.red50,
      textColor: otherColour.redChip,
    },
    margin: {
      bgColor: colors.purpleLightBg,
      textColor: primitiveColors.neutral500,
    },
    default: {
      bgColor: colors.purpleLightBg,
      textColor: primitiveColors.purple500,
    },
  };


  export enum ToastType {
  SUCCESS = "success",
  ERROR= "error",
  INFO = "info",
  WARNING = "warning",
}