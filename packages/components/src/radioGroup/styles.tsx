import { FormControlLabel, FormLabel, Radio } from '@mui/material';
import {css, styled} from 'styled-components';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { fontFamilies, fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import { respondTo } from '@mono/theme';


// export const StyledLabel = styled(FormLabel)<{isQuestionModal?: boolean}>`
//  font-weight: ${({isQuestionModal}) => isQuestionModal ? `${fontWeight.medium} !important` : `${fontWeight.bold} !important`};
//  font-size:  ${({isQuestionModal}) => isQuestionModal && `${fontSize.h5} !important`};
//  color: black !important;

// `
export const StyledLabel = styled.label<{readOnly?:boolean; required?:boolean; disabled?: boolean, isModal?:boolean}>`
    display: block;
    font-family: ${fontFamilies.secondary} !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    color: #100937 !important;

    ${({ required }) => required && css`
        &::after {
            // content: '*';
            color: ${colors.brightRed}; 
            margin-left: 2px; 
        }
    `}

    /* Override for disabled state */
    ${({disabled}) => disabled && css`
        color: ${greyScaleColour.grey50} !important;
    `}

`

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledError = styled.p`
  color: ${colors.errorDefault};
  font-size: 12px;
  margin: 0;
`;

export const StyledFormLabel = styled(FormLabel)`
  color: #808080;
  font-weight: 500;
`;

export const StyledRadio = styled(Radio)`
  color: #808080;
  background: transparent !important;


  &.Mui-checked {
    color: #6828E8;
    border: none !important;
  }

  &:hover {
    background-color: transparent;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)<{isModal?: boolean}>`
  & .MuiFormControlLabel-label {
    font-size: ${({isModal}) => isModal ? fontSize.b1 : fontSize.b0} !important;
    font-weight: ${fontWeight.medium} !important;
    color: ${brand.black};
    font-family: ${fontFamilies.secondary} !important;
  }
`;
