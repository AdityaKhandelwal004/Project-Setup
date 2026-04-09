import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid2 } from '@mui/material';
import { css, styled } from 'styled-components';
import { respondTo } from '@mono/theme/style.layout.ts';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export const StyledAccordion = styled(Accordion) <{ defaultExpanded?: boolean, boxShadow?: boolean, noGreyBorder?: boolean, isEmployee?: boolean }>`
  ${({ boxShadow }) => (!boxShadow && 'box-shadow: none !important;')}
  box-shadow: none !important;  
  background-color: white; 
  &.MuiAccordion-root::before {
    opacity: 0 !important;
    display: none !important;
  }

  ${({ noGreyBorder }) => (!noGreyBorder ? `border: 1px solid #ccc; ` : `border: 1px solid white; `)}
  
  ${({ noGreyBorder }) => (!noGreyBorder && css`
   &.MuiAccordion-root::before {
    opacity: 0 !important;
    display: none !important;
  }
    
    `)}
  border-radius:6px !important;
    ${respondTo.smOnly}{
        .MuiPaper-root-MuiAccordion-root::before {
           position: static !important;
      }
   }
`
export const StyledDivider = styled.div`
    height:1px;
    background: ${greyScaleColour.grey15};
    margin-left:16px;
    margin-right:16px;
    width: 100%;
`
export const VerticalDivider = styled.span`
  height: 26px;
  background: #D9D9D9;
  width: 1px;
  margin-left: 16px;
`;
export const StatusBadge = styled.span`
  background: ${colors.warningBg};
  color:${colors.warningDefault};
  font-weight: ${fontWeight.regular};
  font-size: ${fontSize.b2};
  line-height: 18px;
  padding: 4px 8px;
  margin-left: 16px;
  border-radius: 4px;
`;

export const StyledTimeOutIcon = styled(AccessTimeOutlinedIcon)`
    color: ${colors.warning};
    cursor: pointer;
     ${respondTo.mdDown}{
    width:14px !important;
    height:14px !important;
  }
  `;

export const StyledHistoryToggleIcon = styled(HistoryToggleOffOutlinedIcon)`
    color: ${greyScaleColour.grey40};
    cursor: pointer;
     ${respondTo.mdDown}{
    width:14px !important;
    height:14px !important;
  }
  `;
export const CheckCircleIcon = styled(CheckCircleOutlinedIcon)`
  color: ${colors.success};
  cursor: pointer;
  ${respondTo.mdDown}{
    width:14px !important;
    height:14px !important;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)<{ isExpanded?: boolean }>`
  height: 58px;
  padding: 0px !important;
  // border-bottom: 1px solid ${greyScaleColour.grey10} !important;
  display: flex;
  align-items: center;
  gap: 2px; /* Add gap between elements */
  color: ${brand.black} !important;
  background-color: ${ brand.white} !important;
  border-radius: 6px !important;
    border-bottom:1px solid black;

  & .MuiAccordionSummary-content {
    margin: 0px;
    justify-content: space-between;
  }

  &.Mui-expanded .MuiAccordionSummary-content {
    margin: 0 !important; /* Ensure no margin when expanded */
  }

  &.Mui-expanded {
    min-height: 48px !important; /* Maintain correct height when expanded */
  }
  ${respondTo.mdDown}{
    // padding: 10px 16px !important;
    // border-bottom: 1px solid ${greyScaleColour.grey10} !important;
    background-color:${brand.white} !important;
     & .MuiAccordionSummary-content{
      flex-direction:column;
      font-size:16px;
      line-height:24px;
      & span:first-of-type {
      font-size:16px;
      line-height:24px;
      
       }
     }
  }
`;


export const StyledAccordionDetails = styled(AccordionDetails)`
    padding: 0 !important;

    ${respondTo.smOnly}{
  
   }
`
export const AccordionTitle = styled(Typography)`
  display:flex;
  gap:12px;

`
export const StyledSubtitle=styled(Grid2)`
    align-items:center;
    justify-content:space-between;
    margin-right:24px;
`