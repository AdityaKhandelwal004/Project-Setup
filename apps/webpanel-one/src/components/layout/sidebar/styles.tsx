import styled, { css } from 'styled-components';
import { FormControlLabel, Typography } from '@mui/material';
import {
  fontSize,
  fontWeight,
  baseFontFamily,
} from '../../../theme/style.typography';
import { brand, colors } from '../../../theme/style.palette';

export const StyledSidebarContainer = styled.div<{ sidebarOpen?: boolean }>`
  width: ${(props) => (!props.sidebarOpen ? '263px' : '64px')};
  transition: all 0.2s ease-in-out;
  // height: 100vh;
  background-color: ${brand.secondaryMain};
  border-radius: 10px;
  position: relative;
  padding: 20px 24px;
  // max-height: 800px;
  min-height: calc(100vh - 80px);
`;

export const StyledSidebarInnerContainer = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledHeadingIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 67px;
`;

export const StyledMenuItemContainer = styled.div`
  display: flex;
  margin-top: 27px;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

export const StyledMenuItemBoxContainer = styled.div``;

export const StyledMenuItem = styled.a<{ active?: boolean }>`
  padding: 12px 24px;
  display: flex;
  width: auto;
  gap: 10px;
  text-decoration: none;
  align-items: center;
  ${({ active }) => (active
    ? css`
          background: ${brand.primaryMain};
          color: ${colors.grey100};
          font-weight: ${fontWeight.bold};
          border-radius: 6px;
        `
    : css`
          /* min-width: 191px; */
        `)}
`;

export const StyledIcon = styled.img<{
  position?: string;
  right?: string;
  top?: string;
  padding?: string;
  cursor?: string;
  height?: string;
  width?: string;
}>`
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  padding: ${(props) => props.padding};
  cursor: ${(props) => props.cursor || 'pointer'};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  max-width: 100%;
  max-height: 100%;
`;

export const StyledSidebarToggleIcon = styled.img<{
  position?: string;
  right?: string;
  top?: string;
  padding?: string;
  cursor?: string;
  height?: string;
  width?: string;
}>`
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  padding: ${(props) => props.padding};
  cursor: ${(props) => props.cursor || 'pointer'};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to bottom, #fff, #eee);
  border-radius: 50%;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 0px !important;
  .MuiFormControlLabel-label {
    font-size: ${fontSize.b2};
    font-weight: ${fontWeight.regular};
    font-family: ${baseFontFamily};
    color: ${colors.black};
  }
`;

export const StyledText = styled.p<{
  fontSize?: string;
  color?: string;
  margin?: string;
  fontWeight?: string;
}>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  font-weight: ${(props) => props.fontWeight};
`;

export const StyledMenuItemText = styled(Typography) <{ active?: boolean }>`
  color: ${colors.white} !important;
  font-size: ${fontSize.b1} !important;
  margin: 0 !important;
  ${({ active }) => active
    && css`
      font-weight: ${fontWeight.medium} !important;
    `}
`;
