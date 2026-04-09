import { brand, fontFamilies, fontSize, fontWeight, greyScaleColour, primitiveColors, respondTo } from "@mono/theme";
import { Divider, Typography } from "@mui/material";
import styled, { css } from "styled-components";


export const DashboardContainer = styled.div`
 display: flex;
 flex-direction: column;
 gap: 16px;

 ${respondTo.mdDown} {
  gap: 0;
 }

`;


export const StyledBadge = styled.div<{bgColor?: string, textColor?: string, borderColor?: string}>`
background-color: ${({bgColor}) => bgColor || '#FFF4E5'};
border-radius: 12px;
border: 1px solid ${({borderColor}) => borderColor || '#FFD8A8'};
padding: 10px 14px;
display: flex;
gap: 24px;
align-items: center;
width: fit-content;
flex: 1;
justify-content: space-between;

${respondTo.mdDown} {
  flex-shrink: 0;
  width: 100%;
  }
  
  ${respondTo.smOnly} {
    gap: 16px;
    padding: 8px 12px;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;

}
`;

export const StyledBadgeTitle = styled(Typography)<{textColor?: string}>`
  font-size: ${fontSize.h4} !important;
  font-weight: ${fontWeight.semiBold} !important;
  color: ${({textColor}) => textColor || brand.black};
  
  ${respondTo.smOnly} {
    font-size: ${fontSize.h5} !important;
  }
`;

export const StyledBadgeSubTitle = styled(Typography)`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.semiBold} !important;
  font-family: ${fontFamilies.secondary} !important;
  display: flex;
  gap: 4px;
  align-items: center;
  
  ${respondTo.smOnly} {
    font-size: ${fontSize.b1} !important;
  }
`;



export const StyledBadgeContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  
  ${respondTo.mdDown} {
    flex-direction: column;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; 
    -ms-overflow-style: none; 
    padding: 16px;
    
    &::-webkit-scrollbar {
      display: none; 
    }
  }
`;

export const StyledBadgeImg = styled.img`
  height: 22px !important;
  width: 22px !important;
`;

export const StyledCurrencyAmount = styled(Typography)`
  font-size: ${fontSize.h3} !important;
  font-weight: ${fontWeight.semiBold} !important;
  color: ${primitiveColors.orange500};

  ${respondTo.smOnly} {
    font-size: ${fontSize.b1} !important;
  }
`;


export const StyledBadgeManImg = styled.img`
  height: auto !important;
  width: 34px !important;

  ${respondTo.smOnly} {
    width: 24px !important;
  }
`;



export const StyledChildrenContainer = styled.div<{
  noPadding?: boolean;
  noMargin?: boolean;
  hasHeader?: boolean;
  hasBorder?: boolean;
}>`
  flex: 1;
  margin: 0px !important;
  padding: 20px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  border-radius: 10px;
  border: ${({hasBorder}) => hasBorder ? `1px solid ${greyScaleColour.grey15}` : 'none'};
  height: 100%;
  overflow: auto;
  color: ${primitiveColors.purple800};


  ${({ noPadding }) =>
    noPadding &&
    css`
      padding: 0 !important;
    `};
  ${({ noMargin }) =>
    noMargin &&
    css`
      margin: 0 !important;
    `}
  ${({ hasHeader }) =>
    hasHeader &&
    css`
      // max-height: 84vh !important;
    `};


  ${respondTo.mdDown} {
    padding-top: 0px !important;
    gap: 16px;
    border: none;


  }
`;


export const StyledContentBox = styled.div`
  display: flex;
  gap: 16px;
  overflow: hidden;

  
  ${respondTo.mdDown} {
    flex-direction: column;
  }
`;

export const StyledVerticalDivider = styled(Divider )`
  ${respondTo.mdDown} {
    display: none;
  }
`;