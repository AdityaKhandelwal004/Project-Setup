import { Typography } from '@mui/material';
import { styled } from 'styled-components';
import { colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import { spacing, borderRadius } from '@mono/theme/style.layout.ts';

export const StyledInputContainer = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;

  .MuiFormControl-root {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .MuiInputBase-root {
    width: 100%;
    max-width: 100%;
    height: 42px;
    border-radius: 12px;
    background-color: #F9FAFB;
    border: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: ${fontWeight.regular};
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;

    &:hover {
      background-color: #F9FAFB;
    }

    &.Mui-focused {
      border: 2px solid #6828E8;
      box-shadow: none;
      background-color: #F9FAFB;
    }

    &.Mui-error {
      border: 2px solid ${colors.errorDefault};
      background-color: #FEF2F2;

      &.Mui-focused {
        border: 2px solid ${colors.errorDefault};
        box-shadow: none;
      }
    }

    &.Mui-disabled {
      background-color: ${greyScaleColour.grey10};
      border: none;
      color: ${greyScaleColour.grey50};
      cursor: not-allowed;
    }

    .MuiInputBase-input {
      padding: 16px;
      color: #374151;
      font-size: 16px;
      font-weight: ${fontWeight.regular};
      line-height: 1.5;
      box-sizing: border-box;

      &::placeholder {
        font-family: 'DM Sans', sans-serif !important;
        font-weight: 500 !important;
        font-size: 14px !important;
        line-height: 20px !important;
        letter-spacing: 0 !important;
        color: #B5B3C1 !important;
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .MuiInputLabel-root {
    color: #9CA3AF;
    font-size: 16px;
    font-weight: ${fontWeight.medium};
    transform: translate(16px, 12px) scale(1);

    &.Mui-focused {
       color: ${greyScaleColour.grey80} !important;
    }

    &.Mui-error {
      color: ${colors.errorDefault};
    }

    &.MuiInputLabel-shrink {
      transform: translate(16px, -6px) scale(0.75);
      background-color: #F9FAFB;
      padding: 0 4px;
    }
  }
`;

export const StyledError = styled(Typography)`
  color: ${colors.errorDefault} !important;
  font-size: ${fontSize.textSm} !important;
  font-weight: ${fontWeight.regular} !important;
  margin-top: ${spacing[1]} !important;
  margin-left: ${spacing[1]} !important;
  line-height: 1.4 !important;
`;