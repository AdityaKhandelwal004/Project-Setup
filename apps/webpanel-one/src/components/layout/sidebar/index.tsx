import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowIcon from '../../../assets/images/arrowIcon.svg';
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
import ArrowOpenIcon from '../../../assets/images/arrowOpenIcon.svg';
import { push } from 'connected-react-router';
import LogoutIcon from '../../../assets/images/logout.svg';

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  activeButton?: string;
}

const menuItems = [
  {
    key: 'dashboard',
    label: messages?.sidebar?.menuItems?.dashboard,
    icon: 'dashboard',
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
        src={sidebarOpen ? ArrowOpenIcon : ArrowIcon}
        alt="arrow"
        position="absolute"
        right="-11px"
        top="96px"
        onClick={toggleSidebar}
      />
      <StyledSidebarInnerContainer>
        <StyledHeadingIconContainer>
          <StyledIcon
            src={!sidebarOpen ? "/assets/images/smallLogo.png" : "/assets/images/logo.png"}
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
                    src={`/assets/images/${menuItem.icon}.svg`}
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
            <StyledIcon src={LogoutIcon} alt="logout" />
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
