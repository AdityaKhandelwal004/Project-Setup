import { Typography } from '@mui/material';
import { styled } from 'styled-components';
import { fontFamilies, fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import { brand, colors, otherColour, primitiveColors } from '@mono/theme/style.palette.ts';



const toastColors = {
  error: {
    bg: primitiveColors.red50,
    border: otherColour.toastErrorBorder,
  },
  success: {
    bg: primitiveColors.green50,
    border: otherColour.toastSuccessBorder,
  },
  info: {
    bg: otherColour.toastInfoBg,
    border: otherColour.toastInfoBorder,
  },
   warning: {
    bg: otherColour.toastWarningBg,
    border: otherColour.toastWarningBorder,
  },
};



export const StyledToastContainer = styled.div<{ type: string }>`
   display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ type }) => type ? toastColors[type].bg :  primitiveColors.green50};
  color: ${brand.black};
  padding: 18px 16px;
  border-radius: 10px;
  border: 1px solid ${({ type }) => type ? toastColors[type].border : otherColour.toastSuccessBorder};
  width: 100%;
  height:100%;
  max-width: 400px;
`;

export const StyledToastIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const StyledToastInfoContainer = styled.div`
  border-radius: 14px;
  display: flex;
  flex-direction: column;
`;

export const StyledToastInfoText = styled(Typography)`
  font-weight: ${fontWeight.semiBold} !important;
  font-size: ${fontSize.b1} !important;
  color: ${colors.black} !important;
  font-familty: ${fontFamilies.secondary} !important;
`;

export const StyledToastInfoSubText = styled(Typography)`
  font-size: ${fontSize.b1} !important;
  color: ${colors.black} !important;
  font-weight: ${fontWeight.semiBold} !important;
`;
