import type { FC, ImgHTMLAttributes } from 'react';
import Button from '@mui/material/Button';
import { respondTo } from '@mono/theme/style.layout.ts';
import { styled, css } from 'styled-components';
import { colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import { spacing, borderRadius } from '@mono/theme/style.layout.ts';

export const StyledButton = styled(Button)<{
  isImg?: boolean;
  addMinPadding?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
}>`
  border-radius: ${borderRadius.md} !important;
  font-family: inherit !important;
  font-weight: ${fontWeight.medium} !important;
  text-transform: none !important;
  transition: all 0.2s ease-in-out !important;
  white-space: nowrap;
  box-shadow: none !important;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          height: 41px !important;
          padding: 10px 18px !important;
          font-size: ${fontSize.textMd} !important;
        `;

        case 'medium':
        return css`
          height: 36px !important;
          padding: 10px 18px !important;
          font-size: ${fontSize.textSm} !important;
        `; 

      case 'large':
        return css`
          height: 56px !important;
          padding: ${spacing[4]} ${spacing[6]} !important;
          font-size: ${fontSize.textLg} !important;
          min-width: max-content !important;
          flex-shrink: 0 !important;

          ${respondTo.smOnly} {
            min-height: 48px !important;
          }
          
          ${respondTo.mdDown} {
            height: 56px !important;
            padding: ${spacing[4]} ${spacing[6]} !important;
            font-size: ${fontSize.textLg} !important;
          }
        `;
      default:
        return css`
          height: 48px !important;
          padding: ${spacing[3]} ${spacing[5]} !important;
          font-size: ${fontSize.textMd} !important;
        `;
    }
  }}
  &.MuiButton-containedPrimary {
    background-color: #100937 !important;
    color: ${primitiveColors.neutral0} !important;
    border: 1px solid #100937 !important;

    &:hover {
      background-color: #0F0827 !important;
      border-color: #0F0827 !important;
      box-shadow: 0 2px 8px #100937 !important;
    }

    &:active {
      background-color: #0F0827 !important;
      transform: translateY(1px);
    }

    &:disabled {
      background-color: ${greyScaleColour.grey20} !important;
      color: ${greyScaleColour.grey50} !important;
      border-color: ${greyScaleColour.grey20} !important;
      cursor: not-allowed;
    }
  }

  /* Secondary outlined button */
  &.MuiButton-outlined {
    background-color: ${primitiveColors.neutral0} !important;
    color: #100937 !important;
    border: 1px solid #100937 !important;

    svg {
      color: #100937 !important;
    }

    &:hover {
      background-color: #100937 !important;
      border-color: #100937 !important;
      color: ${primitiveColors.neutral0} !important;

      svg {
        color: ${primitiveColors.neutral0} !important;
      }
    }

    &:active {
      background-color: #10093720 !important;
      transform: translateY(1px);
    }

    &:disabled {
      background-color: ${primitiveColors.neutral0} !important;
      color: ${greyScaleColour.grey40} !important;
      border-color: ${greyScaleColour.grey25} !important;
      cursor: not-allowed;
    }
  }

  /* Text button */
  &.MuiButton-text {
    background-color: transparent !important;
    color: #100937 !important;
    border: 1px solid transparent !important;

    &:hover {
      background-color: #10093710 !important;
      color: #0F0827 !important;
    }

    &:active {
      background-color: #10093720 !important;
      transform: translateY(1px);
    }

    &:disabled {
      background-color: transparent !important;
      color: ${greyScaleColour.grey40} !important;
      cursor: not-allowed;
    }
  }

  /* Error/Danger button - Contained */
  &.MuiButton-containedError {
    background-color: ${colors.errorDefault} !important;
    color: ${primitiveColors.neutral0} !important;
    border: 1px solid ${colors.errorDefault} !important;

    &:hover {
      background-color: ${colors.errorHover || colors.errorDefault} !important;
      border-color: ${colors.errorHover || colors.errorDefault} !important;
      box-shadow: 0 2px 8px ${colors.errorDefault}30 !important;
    }

    &:active {
      transform: translateY(1px);
    }

    &:disabled {
      background-color: ${greyScaleColour.grey20} !important;
      color: ${greyScaleColour.grey50} !important;
      border-color: ${greyScaleColour.grey20} !important;
      cursor: not-allowed;
    }
  }

  /* Error/Danger button - Outlined */
  &.MuiButton-outlinedError {
    background-color: ${primitiveColors.neutral0} !important;
    color: ${colors.errorDefault} !important;
    border: 1px solid ${colors.errorDefault} !important;

    &:hover {
      background-color: ${colors.errorDefault} !important;
      border-color: ${colors.errorDefault} !important;
      color: ${primitiveColors.neutral0} !important;
      box-shadow: 0 2px 8px ${colors.errorDefault}30 !important;
    }

    &:active {
      background-color: ${colors.errorHover || colors.errorDefault} !important;
      transform: translateY(1px);
    }

    &:disabled {
      background-color: ${primitiveColors.neutral0} !important;
      color: ${greyScaleColour.grey40} !important;
      border-color: ${greyScaleColour.grey25} !important;
      cursor: not-allowed;
    }
  }

  /* Icon button styles */
  ${({ isImg }) =>
    isImg &&
    css`
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 8px !important;
    `}

  /* Responsive padding */
  ${({ addMinPadding, size }) =>
    addMinPadding &&
    css`
      // ${respondTo.mdDown} {
      //   padding: ${spacing[1]} ${spacing[2]} !important;
      //   font-size: ${fontSize.textSm} !important;
      //   height: 36px !important;
      // }

      ${size === 'large' && css`
        @media only screen and (max-width: 375px) {
          padding: 15px 20px !important;
          // height: 56px !important;
          font-size: ${fontSize.textLg} !important;
        }
      `}
    `}

  /* Full width on mobile for small buttons */
  ${({ size }) => size === 'small' && css`
    ${respondTo.screenRange(300, 550)} {
      width: 100% !important;
    }
  `}

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid #100937 !important;
    outline-offset: 2px !important;
  }

  /* Loading state */
  &.MuiButton-loading {
    pointer-events: none;

    .MuiCircularProgress-root {
      color: inherit;
    }
  }
`;

export const StyledIcon: FC<ImgHTMLAttributes<HTMLImageElement>> = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
