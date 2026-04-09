import {styled} from 'styled-components';
import { Chip } from '@mui/material';

export const StyledChip = styled(Chip)<{
  width?: string;
  labelFontSize?: string;
  labelLineHeight?: string;
  labelFontWeight?: number | string;
}>`
  width: ${(props) => props.width} !important;

  /* Increase specificity with && to override MUI theme defaults */
  && .MuiChip-label {
    font-size: ${(props) => props.labelFontSize || 'inherit'} !important;
    line-height: ${(props) => props.labelLineHeight || 'inherit'} !important;
    font-weight: ${(props) => props.labelFontWeight || 'inherit'} !important;
    padding: 0;
  }
`;
