import {
  AppBar, Avatar, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { brand, colors } from '../../../theme/style.palette';
import { fontSize, fontWeight } from '../../../theme/style.typography';

export default styled(({ ...otherProps }) => <div {...otherProps} />)`
  width: 100%;
  height: 76px;
  border-radius: 10px;
  background: #fff;
  position: sticky;
  z-index: 100;
  top: 0;
`;

export const StyledAppBar = styled(AppBar)`
  border-radius: 10px;
  background-color: ${colors.white} !important;
  box-shadow: 0px 0px 10px 10px #00000003 !important;
  position: relative !important;
`;

export const StyledDropdownContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const StyledAvatarContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-decoration: none;
`;

export const StyledToolbar = styled(Toolbar)`
  margin: 8px 0;
  justify-content: flex-end !important;
`;

export const StyledAvatar = styled(Avatar) <{ cursor?: string }>`
  height: 50px !important;
  width: 50px !important;
  font-size: ${fontSize.h2} !important;
  margin: 0 12px 0 0;
  cursor: ${({ cursor }) => cursor};
  color: ${colors.black} !important;
  background-color: ${brand.primaryMain} !important;
  color: ${colors.black} !important;
`;

export const StyledAdminName = styled(Typography) <{ cursor: string }>`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${colors.black} !important;
  cursor: ${({ cursor }) => cursor};
`;

export const StyledAnchorContainer = styled.a`
  margin-top: 5px;
  text-decoration: none;
`;

export const StyledDropdownInnerContainer = styled.div`
  width: 172px;
  height: 55px;
`;
