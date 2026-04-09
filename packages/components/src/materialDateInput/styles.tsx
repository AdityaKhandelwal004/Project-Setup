//material dateInput
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "styled-components";
import { colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { fontSize, fontWeight, textStyles } from '@mono/theme/style.typography.ts';
import { spacing, borderRadius, inputHeight } from '@mono/theme/style.layout.ts';
import { respondTo } from '@mono/theme/style.layout.ts';
import { authTheme } from '@mono/theme/modules/auth.theme.ts';

export const StyledDatePicker = styled(DatePicker) <{ fullWidth?: boolean; isAuth?: boolean }>`
  width: 100%;
  max-width: 100%;

  .MuiInputBase-root {
    width: 100%;
    max-width: 100%;
    height: ${inputHeight.default};
    border-radius: ${borderRadius.md};
    background-color: ${primitiveColors.neutral0};
    border: 2px solid ${greyScaleColour.grey15};
    font-family: inherit;
    font-size: ${fontSize.textMd};
    font-weight: ${fontWeight.regular};
    transition: all 0.2s ease-in-out;
    opacity: 1;
    box-sizing: border-box;

    &:hover {
      border-color: ${greyScaleColour.grey60};
    }

    &.Mui-focused {
      border-color: ${greyScaleColour.grey80};
      box-shadow: none;
    }

    &.Mui-error {
      border-color: ${colors.errorDefault};

      &.Mui-focused {
        border-color: ${colors.errorDefault};
        box-shadow: none;
      }
    }

    &.Mui-disabled {
      background-color: ${greyScaleColour.grey10};
      border-color: ${greyScaleColour.grey25};
      color: ${greyScaleColour.grey50};
      cursor: not-allowed;
    }

    .MuiInputBase-input {
      padding: 0 ${spacing[4]};
      color: ${greyScaleColour.grey100};
      font-size: ${fontSize.textMd};
      font-weight: ${fontWeight.regular};
      line-height: 1.5;
      width: 100%;
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

      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${primitiveColors.neutral0} inset !important;
        -webkit-text-fill-color: ${greyScaleColour.grey100} !important;
        border-radius: ${borderRadius.md} !important;
        font-size: ${fontSize.textMd} !important;
        font-weight: ${fontWeight.regular} !important;
        transition: background-color 5000s ease-in-out 0s;
      }

      &:focus {
        outline: none;
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    .MuiInputAdornment-root {
      color: ${greyScaleColour.grey60};

      .MuiIconButton-root {
        color: ${greyScaleColour.grey60};
        padding: ${spacing[2]};

        &:hover {
          background-color: transparent;
          color: ${greyScaleColour.grey60};
        }
      }
    }
  }

  .MuiInputLabel-root {
    color: ${greyScaleColour.grey60};
    font-size: ${fontSize.textSm};
    font-weight: ${fontWeight.medium};
    transform: translate(${spacing[4]}, 12px) scale(1);

    &.Mui-focused {
      color: ${greyScaleColour.grey80};
    }

    &.Mui-error {
      color: ${colors.errorDefault};
    }

    &.MuiInputLabel-shrink {
      transform: translate(${spacing[4]}, -6px) scale(0.75);
      background-color: ${primitiveColors.neutral0};
      padding: 0 4px;
    }
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${greyScaleColour.grey60};
  z-index: 10;
  transition: all 0.2s ease-in-out;
  pointer-events: auto;

  &:hover {
    color: ${greyScaleColour.grey80};
    background-color: ${greyScaleColour.grey10};
    border-radius: ${borderRadius.sm};
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  svg {
    font-size: 18px;
    pointer-events: none;
  }
`;