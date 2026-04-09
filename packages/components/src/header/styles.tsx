import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { brand, colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';
import {
  baseFontSize,
  fontFamilies,
  fontSize,
  fontWeight,
} from '@mono/theme/style.typography.ts';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { respondTo } from '@mono/theme/style.layout.ts';
import { buildStyles } from 'react-circular-progressbar';
import { styled } from 'styled-components';

export const StyledHeader = styled.div<{ isEmployee?: boolean }>`
  // background: ${brand.primaryMain};
  position: sticky;
  z-index: 100;
  box-shadow: 0px 0px 20px 10px #00000008;
  top: 0;
  display: flex;
  height: ${({ isEmployee }) => (isEmployee ? '80px' : '65px')};
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid ${greyScaleColour.grey15};
  background-color: ${brand.white};

`;

export const StyledInnerLeftContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
`;

export const StyledInnerRightContainer = styled.div`
  height: 44px;
  display: flex;
  gap: 14px;
  align-items: center;
  position: relative;
  ${respondTo.mdDown} {
    margin-right: 16px;
  }
`;

export const StyledActionMenu = styled(Menu)`
  & .MuiPaper-root {
    margin-top: 5px !important;
    border-radius: 10px !important;
    width: 188px;
    right: 20px !important;
    left: unset !important;
    box-shadow: 0px 30px 40px 0px #0000001a !important;
    border: 1px solid ${brand.white} !important;
  }
  & .MuiList-root {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  & .MuiMenuItem-root {
    min-width: unset !important;
    padding: 16px 12px !important;
    gap: 12px !important;
  }
`;
export const StyledHeadingIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
`;

export const StyledSidebarIcon = styled.img`
  height: 100%; /* Make the image take the full height of the header */
  // width: auto; /* Maintain aspect ratio */
  max-height: 100%; /* Prevent overflow */
`;
export const StyledProfileMenuIcon = styled(PersonOutlineIcon)`
  color: ${brand.primary100} !important;
`;

export const StyledLogoutMenuIcon = styled(LogoutIcon)`
  color: ${colors.errorDefault} !important;
`;

export const StyledActionMenuText = styled(Typography)`
  font-weight: ${fontWeight.medium} !important;
  font-size: ${fontSize.b1} !important;
  line-height: 20px !important;
  color: ${brand.black} !important;
`;

export const StyledActionMenuItem = styled(MenuItem)<{ noBorder?: boolean }>`
  border-bottom: ${({ noBorder }) => noBorder ? 'none' : `0.5px solid ${greyScaleColour.grey10}`}!important;
  padding: 12px 16px !important;
  min-width: 320px !important;
  font-family: ${fontFamilies.secondary} !important;
`;

export const StyledRoleText = styled(Typography)`
  font-size: ${fontSize.b2} !important;
  font-weight: ${fontWeight.regular} !important;
  line-height: 18px !important;
  color: ${brand.white} !important;
`;

export const StyledInnerLeftContainerText = styled(Typography)`
  font-size: ${baseFontSize} !important;
  font-weight: ${fontWeight.medium} !important;
  line-height: 26px !important;
  color: ${brand.black} !important;
`;

export const StyledMenuOpenIcon = styled(MenuOpenOutlinedIcon)`
  color: ${brand.white} !important;
`;

export const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${brand.white} !important;
`;

export const StyledExpandLessIcon = styled(ExpandLessIcon)`
  color: ${brand.white} !important;
`;

export const StyledAppBar = styled(AppBar)`
  border-radius: 10px;
  background-color: ${brand.white} !important;
  box-shadow: 0px 0px 10px 10px #00000003 !important;
  position: relative !important;
`;

export const StyledDropdownContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export const StyledAvatarContainer = styled.div`
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

export const StyledLoaderWrapper = styled.div`
  width: 102px;
  // height: 42px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid white;
  }

  @media (max-width: 1030px) {
    display: none;1000
  }
`;

export const loaderStyles = buildStyles({
  strokeLinecap: 'butt',
  pathColor: '#FFFFFF',
  trailColor: '#54AFC7',
});

export const StyledLoaderText = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;

  @media (max-width: 1030px) {
    display: none;
  }
`;

export const StyledAvatar = styled(Avatar)<{ cursor?: string }>`
  height: 44px !important;
  width: 44px !important;
  font-size: ${fontSize.h2} !important;
  cursor: ${({ cursor }) => cursor};
  color: ${brand.black} !important;
  background-color: ${brand.primaryMain} !important;
  color: ${brand.white} !important;
`;

export const StyledAdminName = styled(Typography)<{ cursor: string }>`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${brand.white} !important;
  line-height: 24px !important;
  cursor: ${({ cursor }) => cursor};
`;

export const StyledAdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledAnchorContainer = styled.a`
  margin-top: 5px;
  text-decoration: none;
`;

export const StyledDropdownInnerContainer = styled.div`
  width: 172px;
  height: 55px;
`;
export const StyledMenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

export const StyledSubMenuItemBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledSubMenuItemContainer = styled.a<{ active?: boolean }>`
  padding: 11px 16px;
  display: flex;
  gap: 20px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;
  color: ${brand.white};
`;

export const StyledSubMenuItemText = styled(Typography)<{ active?: boolean }>`
  font-size: ${fontSize.b1} !important;
  font-weight: ${({ active }) =>
    active ? fontWeight?.semiBold : fontWeight?.regular} !important;
  line-height: 24px !important;
`;

export const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledActiveBar = styled.div<{ active?: boolean; width?: string }>`
  ${props =>
    props.active &&
    `
    width: ${props.width ?? '142px'}; /* Use nullish coalescing operator to provide default */
    height: 4px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #FFFFFF;
    color: ${brand.white};
    margin-top: 5px;
  `}
`;


export const StyledProfileBox = styled.div`
 height: 38px;
 width: 38px;
 background-color: ${primitiveColors.purple100};
 border-radius: 50%;
 display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`