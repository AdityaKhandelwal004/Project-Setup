import { Typography } from "@mui/material";
import { styled } from "styled-components";
import { fontSize, fontWeight } from '@mono/theme';
import { greyScaleColour, primitiveColors, brand } from '@mono/theme/style.palette.ts';

export const StyledCheckImg = styled.img`
  height: 16px;
  width: 16px;
`;

export const StyledLabel = styled(Typography)`
     margin-top : 3px !important;
       font-size: ${fontSize.textLg} !important;
       font-weight: ${fontWeight.medium} !important;
       line-height: 26px !important;
       color: ${greyScaleColour.grey100} !important;
`;

export const StyledCheckBoxWrapper = styled.div`
  display:flex;
`;

// =============================================================================
// CUSTOM CHECKBOX STYLES (for circular variant)
// =============================================================================

export const CustomCheckboxContainer = styled.div<{
  $checked?: boolean;
  $checkedColor?: string;
  $uncheckedBorderColor?: string;
  $size?: number;
  $borderRadius?: number;
  $disabled?: boolean;
}>`
  position: relative;
  display: inline-block;
  width: ${props => props.$size || 16}px;
  height: ${props => props.$size || 16}px;
  border-radius: ${props => props.$borderRadius || 2.86}px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  background-color: ${props =>
    props.$checked
      ? props.$checkedColor || brand.accent
      : 'transparent'
  };
  border: 1px solid ${props =>
    props.$checked
      ? props.$checkedColor || brand.accent
      : props.$uncheckedBorderColor || primitiveColors.neutral200
  };
  opacity: ${props => props.$disabled ? 0.5 : 1};

  &:hover {
    border-color: ${props =>
      props.$disabled
        ? (props.$checked
            ? props.$checkedColor || brand.accent
            : props.$uncheckedBorderColor || primitiveColors.neutral200
          )
        : props.$checkedColor || brand.accent
    };
    background-color: ${props =>
      props.$disabled
        ? (props.$checked
            ? props.$checkedColor || brand.accent
            : 'transparent'
          )
        : (props.$checked
            ? props.$checkedColor || brand.accent
            : `${props.$checkedColor || brand.accent}10`
          )
    };
  }
`;

export const CustomCheckboxInner = styled.div<{
  $checked?: boolean;
  $innerColor?: string;
  $innerSize?: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.$innerSize || 6.285714149475098}px;
  height: ${props => props.$innerSize || 6.285714149475098}px;
  border-radius: 50%;
  background-color: ${props =>
    props.$checked
      ? props.$innerColor || primitiveColors.neutral0
      : 'transparent'
  };
  transition: all 0.2s ease-in-out;
  opacity: 1;
`;