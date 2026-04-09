import {
  Box, Tabs, Tab, Typography, Grid,
} from '@mui/material';
import styled, { css } from 'styled-components';
import { brand, colors} from '../../theme/style.palette';
import { fontSize, fontWeight } from '../../theme/style.typography';

export const StyledTabsContainer = styled(Box)<{ orientation?: string }>`
  width: 100%;
  display: ${(props) => props.orientation === 'vertical' && 'flex'};
`;

export const StyledTabsInnerContainer = styled(Box)<{ orientation?: string }>`
  border-bottom: ${(props) => props.orientation === 'horizontal' && `1px solid ${colors.grey30}`};
  border-right: ${(props) => props.orientation === 'vertical' && `1px solid ${colors.grey30}`};
  margin-right: ${(props) => props.orientation === 'vertical' && '16px'};
  min-width: ${(props) => props.orientation === 'vertical' && '165px'};
  & .MuiSvgIcon-root {
    display: none !important;
  }
  & .Mui-selected {
    font-weight: ${fontWeight.semiBold} !important;
    transition: ${colors.white} 300ms ease-out !important;
    ${({ orientation }) => orientation === 'vertical'
      && css`
        background-color: ${brand.primaryMain};
        color: ${colors.white} !important;
        border-radius: 6px !important;
      `}
    & .MuiSvgIcon-root {
      display: block !important;
    }
  }
  ${({ orientation }) => orientation === 'vertical'
    && css`
      & .MuiButtonBase-root {
        justify-content: flex-start;
        padding-left: 14px !important;
        padding-right: 14px !important;
        min-height: 45px !important;
      }
      & .MuiTabs-indicator {
        background: none;
      }
    `}
`;

export const StyledTabsHeaderContainer = styled(Tabs)``;

export const StyledTabsItem = styled(Tab)<{component?: any; href?: string}>`
  padding: 0 !important;
  margin-right: 24px !important;
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.regular} !important;
  text-transform: none !important;
  color: ${colors.black} !important;
  min-width: 0px !important;
`;

export const StyledContentContainer = styled(Box)`
  margin-top: 24px !important;
`;

export const StyledTabsHeading = styled(Typography)`
  margin: 0 !important;
  font-size: ${fontSize.h3} !important;
  font-weight: ${fontWeight.medium} !important;
`;

export const StyledTabsSubHeading = styled(Typography)`
  font-size: ${fontSize.b2} !important;
  font-weight: ${fontWeight.regular} !important;
  color: ${colors.grey100};
`;

export const StyledGridButtonItem = styled(Grid)`
  display: flex !important;
  gap: 16px;
`;
