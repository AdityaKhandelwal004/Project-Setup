import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  StyledSidebarContainer,
  StyledIcon,
  StyledSidebarInnerContainer,
  StyledHeadingIconContainer,
  StyledMenuItemContainer,
  StyledMenuItemBoxContainer,
  StyledMenuItem,
  StyledMenuItemText,
  StyledSidebarToggleIcon,
} from './styles';
import messages from '../../../messages';
import { routes } from '../../../utils';
import { push } from 'connected-react-router';
import {
  arrowIcon,
  arrowOpenIcon,
  logoutIcon,
  smallLogo,
  logo,
  dashboardIcon,
} from '../../../assets/images';

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  activeButton?: string;
}

const menuItems = [
  {
    key: 'dashboard',
    label: messages?.sidebar?.menuItems?.dashboard,
    icon: dashboardIcon,
    path: routes.dashboard.root,
  },
  // Add sidebar menu items here
];

export const Sidebar: React.FC<Props> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth < 1400);
  const location = useLocation();
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const reduxDispatch = useDispatch();
  return (
    <StyledSidebarContainer sidebarOpen={sidebarOpen}>
      <StyledSidebarToggleIcon
        src={sidebarOpen ? arrowOpenIcon : arrowIcon}
        alt="arrow"
        position="absolute"
        right="-11px"
        top="96px"
        onClick={toggleSidebar}
      />
      <StyledSidebarInnerContainer>
        <StyledHeadingIconContainer>
          <StyledIcon
            src={!sidebarOpen ? smallLogo : logo}
            alt="logoicon"
          />
        </StyledHeadingIconContainer>
        <StyledMenuItemContainer>
          <StyledMenuItemBoxContainer>
            {menuItems.map((menuItem) => {
              const active = location.pathname.startsWith(menuItem.path);
              return (
                <StyledMenuItem
                  active={active}
                  href={menuItem.path}
                  key={menuItem.key}
                >
                  <StyledIcon
                    src={menuItem.icon}
                    alt={menuItem.key}
                  />
                  {!sidebarOpen && (
                    <StyledMenuItemText active={active}>
                      {menuItem.label}
                    </StyledMenuItemText>
                  )}
                </StyledMenuItem>
              );
            })}
          </StyledMenuItemBoxContainer>
          <StyledMenuItem
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // reduxDispatch(logout());
              reduxDispatch(push(routes?.login))
            }}
          >
            <StyledIcon src={logoutIcon} alt="logout" />
            {!sidebarOpen && (
              <StyledMenuItemText>
                {messages?.sidebar?.logout}
              </StyledMenuItemText>
            )}
          </StyledMenuItem>
        </StyledMenuItemContainer>
      </StyledSidebarInnerContainer>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
