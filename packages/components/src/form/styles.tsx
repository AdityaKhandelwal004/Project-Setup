import { Alert } from '@mui/material';
import type { FC } from 'react';
import type { Grid2Props } from '@mui/material';
import { css, styled } from 'styled-components';
import { Grid2 } from '@mui/material';
import { fontFamilies, respondTo } from '@mono/theme';

export const StyledForm = styled.form<{ hasPadding?: boolean; hasGap?: boolean }>`
  ${({ hasPadding }) =>
    !hasPadding &&
    css`
      margin: 24px;
    `}
  display: grid;
  gap: ${({hasGap}) => hasGap ? '16px' : '0px'};
`;
export const StyledFormRow: FC<Grid2Props> = styled(Grid2)`
  gap: 16px !important;
  margin-bottom: 16px;

  ${respondTo.screenRange(300, 550)} {
    flex-direction: column !important;
  }
`;

export const StyledFormRowItem: FC<Grid2Props> = styled(Grid2)`
  flex: 1;


  ${respondTo.screenRange(300, 550)} {
    width: 100% !important;
    max-width: 100% !important;
  }
`;

export const StyledFormError = styled(Alert)`
 max-width:402px;
   font-family: ${fontFamilies.secondary};
`;
