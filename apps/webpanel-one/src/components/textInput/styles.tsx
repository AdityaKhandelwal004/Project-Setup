import { TextField, Typography } from '@mui/material';
import styled, { css } from 'styled-components';
import { colors } from '../../theme/style.palette';
import { respondTo } from '../../theme/style.layout';

export const StyledInputContainer = styled.div<{
  maxWidth?: string;
  isHeader?: boolean;
}>`
  width: ${(prop) => !prop.isHeader && '100%'};
  ${({ maxWidth }) => maxWidth
    && css`
      & .MuiFormControl-root {
        width: 100%;

        & .MuiInputBase-root {
          max-width: ${maxWidth} !important;
          height: 50px !important;
        }

        ${respondTo.mdDown} {
          width: 100%;
          max-width: 300px !important;
        }
      }
    `}
`;

export const StyledError = styled(Typography)`
  text-align: left;
  color: ${colors.red100};
  margin-top: 8px !important;
`;

export const StyledTextField = styled(TextField)`
  input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
      margin: 0;
    }
  }
`;
