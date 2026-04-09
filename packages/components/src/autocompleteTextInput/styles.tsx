import { styled } from 'styled-components';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { brand, colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { fontFamilies, fontSize, fontWeight, lineHeight } from '@mono/theme/style.typography.ts';
import { spacing, borderRadius } from '@mono/theme/style.layout.ts';
import { Popper, Typography } from '@mui/material';

export const StyledChipContainer = styled.div`
  display: flex;
  padding: ${spacing[1]} ${spacing[2]};
  justify-content: center;
  align-items: center;
  gap: ${spacing[1]};
  border-radius: ${borderRadius.full};
  background: ${colors.primary};
  margin-right: ${spacing[1]};
  margin-bottom: ${spacing[1]};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${colors.primaryHover};
  }
`;

export const StyledChipLabel = styled.span`
  color: ${primitiveColors.neutral0};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 120px;
  line-height: 1.4;
`;

export const StyledChipCloseContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const StyledCanceledIcon = styled(CancelOutlinedIcon).attrs({
  fontSize: 'small'
})`
  width: 16px !important;
  height: 16px !important;
  color: ${primitiveColors.neutral0} !important;
`;


export const StyledPopperBase = styled(Popper)<{ renderCustomOptions?: boolean }>`
  z-index: 1300;

  .MuiPaper-root {
    border-radius: ${borderRadius.lg};
    border: 1px solid ${colors.greyBorder};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-top: ${spacing[1]};
  }

  .MuiAutocomplete-listbox {
    padding: 8px ${spacing[1]};
    max-height: 300px;
    overflow: auto;

    /* Custom scrollbar omitted for brevity */
  }

  .MuiAutocomplete-option {
    font-size: ${fontSize.textSm} !important;
    font-weight: ${fontWeight.medium} !important;
    line-height: ${lineHeight.tight} !important;
    min-height: auto !important;
    padding: ${spacing[3]} ${spacing[4]} !important;
    border-radius: 0 !important;
    margin-bottom: 0 !important;
    cursor: pointer !important;
    color: ${primitiveColors.neutral500} !important;
    transition: all 0.2s ease-in-out !important;
    border: none !important;
    border-bottom: 1px solid ${primitiveColors.neutral200} !important;

    &:last-child {
      margin-bottom: 0 !important;
      border-bottom: none !important;
    }

    /* Hover styling conditionally applied */
    &:hover {
      background-color: ${({ renderCustomOptions }) =>
        renderCustomOptions ? '#ECF8EA' : primitiveColors.neutral100} !important;
      color: ${primitiveColors.neutral500} !important;
    }

    /* Selected state */
    &[aria-selected='true'] {
      background-color: ${({ renderCustomOptions }) =>
        renderCustomOptions ? '#ECF8EA' : primitiveColors.neutral100} !important;
      color: ${primitiveColors.neutral500} !important;
      font-weight: ${fontWeight.medium} !important;
    }

    /* Disabled state */
    &[aria-disabled='true'] {
      color: ${greyScaleColour.grey40} !important;
      cursor: not-allowed !important;
      background-color: transparent !important;
    }
  }

  .MuiAutocomplete-noOptions {
    padding: ${spacing[4]};
    color: ${greyScaleColour.grey60};
    font-size: ${fontSize.textSm};
    text-align: center;
  }
`;

export const StyledOptionLabel = styled(Typography)`
  color: ${brand.black} !important;
  transition: color 0.2s;
  font-family: ${fontFamilies.secondary} !important;
  font-weight: ${fontWeight.semiBold} !important;
`;

export const StyledAmout = styled(Typography)`
  color: ${brand.black} !important;
  transition: color 0.2s;
`;

export const StyledCustomOption = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #abe9a0ff !important;
    ${StyledAmout} {
      color: #079467 !important;
    }
  }

  &[aria-selected="true"] {
    background-color: #abe9a0ff !important;
    ${StyledAmout} {
      // color: #079467 !important;
       color: ${brand.white} !important;
    }
    ${StyledOptionLabel} {
      color: ${brand.white} !important;
    }
  }
`;



export const StyledRegularOption = styled.li`
  font-family: ${fontFamilies.secondary} !important;
  font-weight: ${fontWeight.semiBold} !important;
`;

export const SyledOptionWrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 width: 100%;

`;




