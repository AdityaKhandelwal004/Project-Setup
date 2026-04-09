import React from 'react';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';
import {
  brand,
  greyScaleColour,
  primitiveColors,
} from '@mono/theme/style.palette.ts';
import { fontWeight, fontSize, baseFontFamily } from '@mono/theme/style.typography.ts';
import { obiemoneyTheme, respondTo } from '@mono/theme/index.ts';
import { CloseOutlined } from '@mui/icons-material';


export const StyledContainer = styled.div<{ fitContent?: boolean; reduceMargin?: boolean; maxWidth?: string; maxHeight?: string , marginTop?: string}>`
  max-width: ${({ maxWidth }) => maxWidth || '650px'};
  margin: 0 auto;
  margin-top: ${({ reduceMargin }) => (reduceMargin ? obiemoneyTheme.components.modal.marginTop.reduced : obiemoneyTheme.components.modal.marginTop.default)};
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  opacity: 1;
  padding: 0px 16px;
  transform: rotate(0deg);
  @media (max-height: ${obiemoneyTheme.components.modal.breakpoints.smallHeight}) {
    margin-top: ${obiemoneyTheme.components.modal.marginTop.small};
  }

 ${respondTo.smOnly}{
   max-height: ${({ maxHeight }) => maxHeight || '95vh'};
  margin-top: ${obiemoneyTheme.components.modal.marginTop.small};
   margin-top: ${({ marginTop }) => marginTop };
 }   
  
`;
export const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 24px 20px 24px;
  // gap: ${obiemoneyTheme.components.modal.header.gap};
  // min-height: ${obiemoneyTheme.components.modal.header.height};
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize.h4};
  font-family: ${baseFontFamily};
  line-height: 26px;
  background-color: ${brand.white};
  color: ${brand.modalPrimary};
  border-bottom: 1px solid ${greyScaleColour.grey10};
  opacity: 1;
  transform: rotate(0deg);
  align-items: center;
`;
export const StyledHeading = styled(Typography)<{ customColor?: string }>`
  color: ${({ customColor }) => customColor || primitiveColors.purple800} !important;
  line-height: 24px !important;
  font-size: 24px !important;
  font-weight: 500 !important;
  font-family: ${baseFontFamily} !important;
`;
export const StyledSubHeading = styled(Typography)`
  color: ${brand.modalPrimary} !important;
  font-weight: ${fontWeight.medium} !important;
`;
export const StyledCloseContainer = styled.div`
display: flex;
  cursor: pointer;
  margin-left: ${obiemoneyTheme.components.modal.closeMarginLeft};
  // margin-top: ${obiemoneyTheme.components.modal.closeMarginTop};
`;
export const StyledLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${obiemoneyTheme.components.modal.contentGap};
`;
export const StyledTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${obiemoneyTheme.components.modal.textGap};
`;
export const StyledHeadingImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
export const StyledHeadingImg = styled.img`
  width: ${obiemoneyTheme.components.modal.iconSize};
  height: ${obiemoneyTheme.components.modal.iconSize};
`;
export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
// New styled components for improved modal structure
export const StyledFormArea = styled.div`
  padding: ${obiemoneyTheme.components.modal.form.padding};
  gap: ${obiemoneyTheme.components.modal.form.gap};
  min-height: ${obiemoneyTheme.components.modal.form.minHeight};
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: rotate(0deg);
  flex: 1;
`;
export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${obiemoneyTheme.components.modal.buttonWrapper.gap};
  padding: ${obiemoneyTheme.components.modal.buttonWrapper.padding};
  min-height: ${obiemoneyTheme.components.modal.buttonWrapper.minHeight};
  opacity: 1;
  transform: rotate(0deg);
  border-top: 1px solid ${greyScaleColour.grey10};
  background-color: ${brand.white};
`;
export const StyledModalButton = styled.div<{ variant?: 'outlined' | 'contained' }>`
  height: ${obiemoneyTheme.components.modal.button.height};
  padding: ${obiemoneyTheme.components.modal.button.padding};
  border-radius: ${obiemoneyTheme.components.modal.button.borderRadius};
  min-width: ${obiemoneyTheme.components.modal.button.minWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${fontWeight.medium};
  font-size: ${fontSize.textMd};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 1;
  transform: rotate(0deg);
  border: 1px solid;
  ${({ variant }) => variant === 'outlined' ? `
    background-color: ${brand.white};
    color: ${brand.modalPrimary};
    border-color: ${greyScaleColour.grey30};
    &:hover {
      background-color: ${greyScaleColour.grey05};
      border-color: ${greyScaleColour.grey40};
    }
  ` : `
    background-color: ${brand.modalPrimary};
    color: ${brand.white};
    border-color: ${brand.modalPrimary};
    &:hover {
      background-color: ${brand.primaryDark || brand.modalPrimary};
      border-color: ${brand.primaryDark || brand.modalPrimary};
    }
  `}
  &:active {
    transform: translateY(1px) rotate(0deg);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;
// Create a wrapper component for the Material-UI icon
const CloseIconWrapper = styled.div`
  cursor: pointer;
  color: ${greyScaleColour.grey30};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
`;
export const StyledCloseButton: React.FC<any> = ({ ...props }) => (
  <CloseIconWrapper {...props}>
    <CloseOutlined />
  </CloseIconWrapper>
);