import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  StyledActiveBar,
  StyledSubMenuItemContainer,
  StyledSubMenuItemText,
  StyledMenuWrapper,
  StyledHeader,
  StyledInnerLeftContainer,
  StyledHeadingIconContainer,
  StyledMenuItemContainer,
  StyledSubMenuItemBoxContainer,
  StyledInnerRightContainer,
  StyledAdminContainer,
  StyledRoleText,
  StyledAdminName,
  StyledExpandMoreIcon,
  StyledActionMenu,
  StyledActionMenuItem,
  StyledActionMenuText,
  StyledExpandLessIcon,
  StyledLogoutMenuIcon,
  loaderStyles,
  StyledLoaderText,
  StyledLoaderWrapper,
  StyledProfileBox,
} from "./styles.tsx";
import { StyledSidebarIcon, StyledSidebarRightIcon } from "../sidebar/styles.tsx";
import Button from "../button/index.tsx";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "@mono/redux-global/src/actions/index.tsx";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Grid2, Typography } from "@mui/material";
import { fontFamilies, greyScaleColour, primitiveColors } from "@mono/theme";
import messages from "../messages/index.tsx";

// Placeholder user icon - in a real app this would come from assets
const userIcon = '';

// Generate initials from user name
const getInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return (first + last) || 'U';
};



interface HeaderCustomProps {
  userProfile: any;
  hideLoader?: boolean;
  panel: string;
  showLogout?: boolean;
  image: string;
  maxStepReached?: any;
  mainMenuItems?: {
    key: string;
    label: string;
    path: string;
  }[];
  actions: {
    id: string;
    text: string;
    onClick: () => void;
    icon: React.JSX.Element;
  }[];
  setSidebarOpen: any;
  sidebarOpen: any
}

const Header = (props: HeaderCustomProps) => {
  const { pathname } = useLocation();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeWidth, setActiveWidth] = useState<string>("142px"); // Default width
  const labelRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({}); // Store refs for each label
  const reduxDispatch: any = useDispatch();
  // Update the width dynamically based on the active label width
  useEffect(() => {
    // Find the active label
    const activeMenuItem = props.mainMenuItems?.find((item) =>
      pathname.startsWith(item.path)
    );

    if (activeMenuItem && labelRefs.current[activeMenuItem.key]) {
      // Measure the width of the active label
      const labelWidth =
        labelRefs.current[activeMenuItem.key]?.getBoundingClientRect().width;
      setActiveWidth(`${labelWidth + 20}px`); // Add some padding for better appearance
    }
  }, [pathname, props.mainMenuItems]); // Recalculate width when pathname or menu items change

  const openActionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeActionMenu = (menuItemClick?: any) => {
    setMenuAnchorEl(null);
    if (menuItemClick) menuItemClick();
  };
  const totalSteps = 10;
      const percentageCompleted = totalSteps > 0
      ? Math.round(((props.maxStepReached - 2) / totalSteps) * 100)
      : 0;



    const toggleSidebar = () => {
        props.setSidebarOpen((prevValue: boolean) => !prevValue);
    }


  return (
    <StyledHeader isEmployee={props?.panel === "employee"}>
      <StyledInnerLeftContainer  onClick={toggleSidebar}>
        <StyledHeadingIconContainer>
          {props.sidebarOpen ? <StyledSidebarIcon/> : <StyledSidebarRightIcon/>}
        </StyledHeadingIconContainer>
        <Typography fontFamily={fontFamilies.secondary}>{props.sidebarOpen ? messages?.header?.hideMenu : messages?.header?.showMenu}</Typography>
      </StyledInnerLeftContainer>
      {/* {props?.panel === "admin" && (
        <StyledMenuItemContainer>
          <StyledSubMenuItemBoxContainer>
            {props.mainMenuItems?.map(({ key, label, path }) => {
              const active = pathname.startsWith(path);
              return (
                <StyledMenuWrapper key={key}>
                  <StyledSubMenuItemContainer
                    draggable={false}
                    href={path}
                    active={active}
                  >
                    <StyledSubMenuItemText
                      ref={(el) => {
                        if (el) labelRefs.current[key] = el; // Assign the ref dynamically
                      }}
                      active={active}
                    >
                      {label}
                    </StyledSubMenuItemText>
                  </StyledSubMenuItemContainer>
                  {active && <StyledActiveBar active width={activeWidth} />}
                </StyledMenuWrapper>
              );
            })}
          </StyledSubMenuItemBoxContainer>
        </StyledMenuItemContainer>
      )} */}
      {/* {props?.panel === 'admin' && <StyledInnerRightContainer onClick={openActionMenu}>
        <StyledAdminContainer>
          <StyledAdminName cursor={pathname === '/profile' ? 'default' : 'pointer'}>
            Jacob Jones
          </StyledAdminName>
          <StyledRoleText>Admin</StyledRoleText>
        </StyledAdminContainer>
        {!menuAnchorEl ? <StyledExpandMoreIcon /> : <StyledExpandLessIcon />}
      </StyledInnerRightContainer>}
      {props?.panel === 'employee' && !props?.showLogout && ( */}
  <StyledInnerRightContainer onClick={openActionMenu}>
       {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "311px",
            }}
          >
            {!props.hideLoader && (
              <StyledLoaderWrapper>
                <CircularProgressbar
                  value={percentageCompleted}
                  strokeWidth={50}
                  styles={loaderStyles}
                />
              </StyledLoaderWrapper>
            )}
            {!props.hideLoader && (
              <StyledLoaderText>
                {percentageCompleted}% Completed
              </StyledLoaderText>
            )}

      <Button 
        label='Logout' 
        variant='outlined' 
        color='secondary' 
        isJsx 
        JsxImg={LogoutIcon} 
        onClick={() => {
          reduxDispatch(logout())
          window?.location?.reload();
        }} 
      />
    </div> */}
    <Grid2>
      <Typography variant="h5" color={primitiveColors.purple500} fontFamily={fontFamilies.secondary}> {props?.userProfile?.firstName ? `${props?.userProfile?.firstName} ${props?.userProfile?.lastName}` : '--' }</Typography>
      <Typography color={primitiveColors.grey400} fontFamily={fontFamilies.secondary}>Admin</Typography>
    </Grid2>
    <StyledProfileBox>
      <Typography fontFamily={fontFamilies.secondary} sx={{ fontSize: '14px', fontWeight: 600 }}>
        {getInitials(props?.userProfile?.firstName, props?.userProfile?.lastName)}
      </Typography>
    </StyledProfileBox>
  </StyledInnerRightContainer>
{/* // )} */}
      <StyledActionMenu
        disableAutoFocusItem
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={() => closeActionMenu()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {props.actions.map((action) => (
          <StyledActionMenuItem
            key={action.id}
            onClick={() => closeActionMenu(action.onClick)}
            noBorder={action.text === "Log out"}
          >
            {action.icon}
            <StyledActionMenuText>{action.text}</StyledActionMenuText>
          </StyledActionMenuItem>
        ))}
      </StyledActionMenu>
    </StyledHeader>
  );
};

export default Header;
