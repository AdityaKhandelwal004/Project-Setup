import styled from 'styled-components';
import { TextInput } from '@mono/components';
import { spacing, fontSize, fontFamilies } from '@mono/theme';
import { greyScaleColour, brand } from '@mono/theme/style.palette';

export const CurrencyWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: '$';
    position: absolute;
    left: ${spacing[3]};
    top: 50%;
    transform: translateY(-50%);
    color: ${greyScaleColour.grey50};
    font-size: ${fontSize.textMd};
    z-index: 1;
    pointer-events: none;
  }
`;

export const StyledCurrencyInput = styled(TextInput)`
  && {
    width: 100%;
    .MuiOutlinedInput-root {
      height: 48px;
      background-color: white;
      width: 100%;

      fieldset {
        border-color: ${brand.borderColor};
      }

      &:hover fieldset {
        border-color: ${brand.borderColor};
        
      }

      &.Mui-focused fieldset {
        border-color: ${brand.accent};
      }
    }

    .MuiOutlinedInput-input {
      padding-left: 32px;
    }

    .MuiOutlinedInput-input::placeholder {
      color: #ADADAD !important;
      font-weight: 500 !important;
      font-size: 14px !important;
      line-height: 20px !important;
      opacity: 1 !important;

    }
  }
`;
