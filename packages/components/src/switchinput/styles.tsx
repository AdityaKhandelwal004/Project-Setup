import {styled} from 'styled-components';
import { Typography } from '@mui/material';
import { brand, colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { FormControlLabel } from '@mui/material';
import {
  fontSize,
  fontWeight,
  baseFontFamily,
} from '@mono/theme/style.typography.ts';

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const StyledError = styled(Typography)`
  margin-top: 8px !important;
  color: ${colors.errorDefault};
`;

export const StyledFormControlLabel = styled(FormControlLabel)<{isEnd?: boolean}>`
  margin-left: 0px !important;
  justify-content: ${({isEnd}) => isEnd ? 'flex-start' : 'flex-end'};
  .MuiFormControlLabel-label {
    font-size: ${fontSize.b1};
    font-weight: ${fontWeight.medium};
    font-family: ${baseFontFamily};
    color: ${primitiveColors.neutral500} !important;
  }
`;
