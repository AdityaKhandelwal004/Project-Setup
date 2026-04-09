import { TextField, Typography } from '@mui/material';
import { styled, css } from 'styled-components';
import { colors, greyScaleColour, otherColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { fontFamilies, fontSize, fontWeight, textStyles } from '@mono/theme/style.typography.ts';
import { spacing, borderRadius, inputSizes, inputHeight } from '@mono/theme/style.layout.ts';
import { respondTo } from '@mono/theme/style.layout.ts';
import { authTheme } from '@mono/theme/modules/auth.theme.ts';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
export const StyledContainer = styled.div`
// margin-right: 50px;
 width: 100%
`
export const StyledInputContainer = styled.div<{
  maxWidth?: string;
  minWidth?: string;
  isHeader?: boolean;
  height?: string;
  isAuth?: boolean;
}>`
  width: 100%;
  max-width: 100%;
  min-width: ${({minWidth}) => minWidth ? minWidth : 'auto'};
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
    height: 48px;
    border-radius: ${borderRadius.md};
    background-color: ${primitiveColors.neutral0};
    border: 2px solid ${greyScaleColour.grey15};
    font-family: inherit;
    font-size: ${fontSize.textSm};
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
      font-size: ${fontSize.textSm};
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
        opacity: 1 !important;
      }
      &:focus {
        outline: none;
      }
      /* Currency input specific padding */
      &.currency-input {
        padding-left: ${spacing[12]};
      }
      /* Hide number input spinners */
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        display: none;
        margin: 0;
      }
      &[type="number"] {
        -moz-appearance: textfield;
      }
      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${primitiveColors.neutral0} inset !important;
        -webkit-text-fill-color: ${greyScaleColour.grey100} !important;
        border-radius: ${borderRadius.md} !important;
        font-size: ${fontSize.textSm} !important;
        font-weight: ${fontWeight.regular} !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
  .MuiInputLabel-root {
    color: ${greyScaleColour.grey60};
    font-size: ${fontSize.textSm};
    font-weight: ${fontWeight.medium};
    margin-top: 3px !important;
    transform: translate(${spacing[4]}, 12px) scale(1);
    &.Mui-focused {
       color: ${greyScaleColour.grey80} !important;
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

export const StyledError = styled(Typography)`
  text-align: left;
  color: ${colors.errorDefault} !important;
  font-size: ${fontSize.textSm} !important;
  font-weight: ${fontWeight.regular} !important;
  margin-top: ${spacing[1]} !important;
  margin-left: ${spacing[1]} !important;
  line-height: 1.4 !important;
`;


export const StyledSuccess = styled(Typography)`
  display: flex !important;
  align-items: center !important;
  gap: ${spacing[1]} !important;
  text-align: left;
  color: ${colors.success} !important;
  background-color: ${colors.successBg} !important;
  font-size: ${fontSize.textSm} !important;
  font-weight: ${fontWeight.regular} !important;
  margin-top: ${spacing[1]} !important;
  margin-left: 0 !important;
  padding: ${spacing[1]} ${spacing[2]} !important;
  border-radius: ${borderRadius.sm} !important;
  line-height: 1.4 !important;
  width: 100% !important;
  box-sizing: border-box !important;
`;

export const StyledSuccessIcon = styled(TaskAltOutlinedIcon).attrs({
  fontSize: 'small'
})`
  color: ${colors.success} !important;
`;

export const StyledTextField = styled(TextField)<{isDollar?: boolean; isAuth?: boolean}>`
  width: 100%;

  .MuiInputBase-root {
    width: 100%;
    height: 48px;
    border-radius: ${borderRadius.md};
    background-color: ${primitiveColors.neutral0};
    border: 2px solid ${greyScaleColour.grey15};
    font-family: inherit;
    font-size: ${fontSize.textSm};
    font-weight: ${fontWeight.regular};
    transition: all 0.2s ease-in-out;

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
      font-size: ${fontSize.textSm};
      padding-left: ${({isDollar}) => isDollar && '32px'};
      font-weight: ${fontWeight.regular};
      line-height: 1.5;
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
      /* Currency input specific padding */
      &.currency-input {
        padding-left: ${spacing[12]};
      }
      /* Hide number input spinners */
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        display: none;
        margin: 0;
      }
      &[type="number"] {
        -moz-appearance: textfield;
      }
      /* Autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px ${primitiveColors.neutral0} inset !important;
        -webkit-text-fill-color: ${greyScaleColour.grey100} !important;
        border-radius: ${borderRadius.md} !important;
        font-size: ${fontSize.textSm} !important;
        font-weight: ${fontWeight.regular} !important;
        transition: background-color 5000s ease-in-out 0s;
      }
    }
    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
  .MuiInputLabel-root {
    color: ${greyScaleColour.grey60};
    font-size: ${fontSize.textSm};
    font-weight: ${fontWeight.medium};
    transform: translate(${spacing[4]}, 12px) scale(1);
    &.Mui-focused {
      color: ${colors.primary};
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

export const StyledInputText = styled(Typography)<{disabled?:boolean}>`
    color : ${greyScaleColour.grey60};
    font-size: ${fontSize.textSm};
    cursor : pointer;
    ${({disabled})=>disabled&&css`
        color : ${greyScaleColour.grey50};
        font-size: ${fontSize.textSm};
        cursor : inherit;
    `}
`

export const StyledLabel = styled.label<{readOnly?:boolean; required?:boolean; disabled?: boolean, isModal?:boolean, isAuth?:boolean}>`
    display: block;
    margin-bottom: ${({isAuth}) => isAuth ? '4px' : '5px'};
    font-family: ${fontFamilies.secondary} !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    color: #100937 !important;

    /* Auth styling when isAuth is true */
    ${({isAuth}) => isAuth && css`
        font-family: ${authTheme.textStyles.fieldLabel.fontFamily} !important;
        font-size: ${authTheme.textStyles.fieldLabel.fontSize} !important;
        font-weight: ${authTheme.textStyles.fieldLabel.fontWeight} !important;
        line-height: ${authTheme.textStyles.fieldLabel.lineHeight} !important;
        letter-spacing: ${authTheme.textStyles.fieldLabel.letterSpacing} !important;
        color: ${authTheme.textStyles.fieldLabel.color} !important;
    `}

    /* Override for disabled state */
    ${({disabled}) => disabled && css`
        color: ${greyScaleColour.grey50} !important;
        cursor: inherit;
    `}

    /* Override for readOnly state */
    ${({readOnly}) => readOnly && css`
        color: ${greyScaleColour.grey60} !important;
    `}

    ${({required})=>required&&css`
        &::after{
            content : ' *';
            color : ${primitiveColors.red500};
        }
    `}`

export const StyledOptionalLabel = styled.span`
  font-size: ${fontSize.textSm} !important;
  font-weight: ${fontWeight.regular} !important;
  color: ${primitiveColors.grey400} !important;
  margin-left: ${spacing[1]} !important;
`