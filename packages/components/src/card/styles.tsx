import { Card, CardContent, Typography } from '@mui/material';
import {styled} from 'styled-components';
import { brand, colors } from '@mono/theme/style.palette.ts';

export const StyledCard = styled(Card)<{ bordered?: boolean }>`

`;

export const StyledCardContent = styled(CardContent)`
  height: 100%;
  width: 100%;
  &::-webkit-scrollbar {
    width: 6px !important;
  }
  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }
`;

export const StyledCardHeader = styled.div<{ noHeaderPadding?: boolean }>`
  padding: ${({ noHeaderPadding }) => (noHeaderPadding ? '0px' : '16px 0')} !important;
  background: ${brand.white};
  position: relative;
`;
export const CardTitle = styled(Typography)`
  color: ${colors.black};
`;
