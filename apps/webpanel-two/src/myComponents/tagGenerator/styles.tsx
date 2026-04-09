import { fontFamilies, fontSize, fontWeight } from "@mono/theme";
import { brand, colors, primitiveColors } from "@mono/theme/style.palette";
import styled from "styled-components";

export const StyledTagContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TAG_COLORS = {
  primary: {
    bg: brand.commonBackground, // #FFF6F2
    text: primitiveColors.orange500, // #FF4B00
    border: brand.borderColor, // #FFC7B0
    padding: '2px 6px',
    borderRadius: '6px',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.textSm,
    lineHeight: '20px'
  },
  percentage: {
    bg: '#ECF8EA', // paleGreen from theme
    text: '#27AE60', // lightGreen from theme
    padding: '1px 4px 1px 4px',
    borderRadius: '4px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px'
  },
  perMonth: {
    bg: primitiveColors.orange100, // #FFEDE6
    text: primitiveColors.orange500, // #FF4B00
    padding: '2px 4px',
    borderRadius: '6px',
    fontWeight: fontWeight.semiBold,
    fontSize: fontSize.textXs,
    lineHeight: '16px',
  },
  livingExpensesBadge: {
    bg: primitiveColors.purple100, // #F0EAFD
    text: primitiveColors.purple500, // #6828E8
    padding: '4px 11px',
    borderRadius: '10px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px',
    fontFamily: fontFamilies.secondary
  },
  savingsBadge: {
    bg: '#ECFDF5',
    text: '#12B981',
    padding: '4px 11px',
    borderRadius: '10px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px'
  },
  goalPercentageBadge: {
    bg: colors.paleGreen, // #ECF8EA
    text: colors.lightGreen, // #27AE60
    padding: '1px 4px',
    borderRadius: '4px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px',
    fontFamily: fontFamilies.secondary
  },
  goalPercentageBadgeOverBudget: {
    bg: '#FEF2F2',
    text: '#EB4848',
    padding: '1px 4px',
    borderRadius: '4px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px',
    fontFamily: fontFamilies.secondary
  },
  interestRate: {
    bg: '#E8E8E8',
    text: '#474747',
    padding: '1px 4px',
    borderRadius: '4px',
    fontWeight: fontWeight.medium, // 500
    fontSize: fontSize.textXs, // 12px
    lineHeight: '18px',
    fontFamily: fontFamilies.secondary
  },
  default: {
    bg: primitiveColors.neutral100,
    text: primitiveColors.neutral900,
    padding: '4px 8px',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.textSm
  }
};
