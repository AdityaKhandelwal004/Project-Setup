import styled, { css } from 'styled-components';
import { Container, Typography } from '@mui/material';
import { adminColor } from '../../../theme/style.palette';
import { fontSize, fontWeight } from '../../../theme/style.typography';

export const StyledContainer = styled(Container)<{ noPadding?: boolean }>`
  display: flex !important;
  height: 100vh;
  ${({ noPadding }) => (noPadding
    ? css`
          padding: 0 !important;
        `
    : css`
          padding: 24px !important;
        `)};
  min-width: 100%;
  margin: auto 0 !important;
  background-color: ${adminColor.background};
`;

export const StyledChildrenContainer = styled.div<{
  noPadding?: boolean;
  noMargin?: boolean;
  hasHeader?: boolean;
}>`
  margin: 42px 0 0 0 !important;
  width: 100%;
  ${({ noPadding }) => noPadding
    && css`
      padding: 0 !important;
    `};
  ${({ noMargin }) => noMargin
    && css`
      margin: 0 !important;
    `}
  ${({ hasHeader }) => hasHeader
    && css`
      // max-height: 84vh !important;
    `};
`;

export const StyledContentContainer = styled.div<{ noMargin?: boolean }>`
  /* min-height: 100vh; */
  width: 100%;
  margin: 0 0 0 24px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ noMargin }) => noMargin
    && css`
      margin: 0 !important;
    `}
`;

export const StyledIconHeadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  font-size: ${fontSize.h2} !important;
  font-weight: ${fontWeight.medium} !important;
  margin: 0 0 0 6px !important;
`;
