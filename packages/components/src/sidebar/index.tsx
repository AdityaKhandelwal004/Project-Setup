import React, { useState } from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import { routes } from "../../../utils";
// import { AuthenticationStatus, Right } from "../../../redux/reducers/auth";
// import messages from "../../../messages";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// import { logout } from "../../../redux/actions";
import {
    StyledContainer, StyledLogo, StyledLogoContainer,
    StyledLogoutContainer, StyledMenuContainer, StyledMenuItemIcon,
    StyledMenuItemLabel, StyledMenuListContainer, StyledMenuListItemContainer,
    StyledMenuToggleContainer
} from "./styles.tsx";
// import { colors } from "../../../theme/style.palette";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import messages from "@mono/messages";
import { AuthenticationStatus } from "@mono/redux-global/src/reducers/auth.tsx";
import { colors } from "@mono/theme";

// Placeholder logos - in a real app these would come from assets
const logo = '';
const ObieLogo = '';
// import { ReduxState } from "../../../redux/reducers";



interface Props {
    menuItems: any;
    sidebarOpen: boolean;

}


const Sidebar: React.FC<Props> = ({
menuItems,
sidebarOpen
}) => {

    const reducxDispatch = useDispatch();
    const location = useLocation();
    const {auth,dashboard} = useSelector(((state:ReduxState) => ({
        auth : state.auth,
        dashboard : state.dashboard,
    })));

   
    // const [sidebarOpen, setSidebarOpen] = useState(true);


    // const toggleSidebar = () => {
    //     setSidebarOpen((prevValue) => !prevValue);
    // }

    // if(!dashboard?.visibility){
    //     return null
    // }

    return (
        <StyledContainer sidebarOpen={sidebarOpen}>
            <StyledLogoContainer>
                <StyledLogo
                    // src={
                    //     sidebarOpen
                    //         ? '/assets/images/measurely-sidebar-logo.png'
                    //         : '/assets/images/measurely-logo-icon.png'
                    // }
                    src={sidebarOpen ? logo : ObieLogo}
                />
            </StyledLogoContainer>
            <StyledMenuContainer>
                {/* <StyledMenuToggleContainer
                    onClick={toggleSidebar}
                >
                    <Icon
                        component={sidebarOpen ? ChevronLeftRoundedIcon : ChevronRightRoundedIcon}
                        style={{
                            color: colors.white
                        }}
                    />
                </StyledMenuToggleContainer> */}
                <StyledMenuListContainer>
                        {menuItems?.map(menuItem => {
                            const prefixes: string[] = Array.isArray(menuItem.matchPrefixes) && menuItem.matchPrefixes.length
                              ? menuItem.matchPrefixes
                              : [menuItem.path];
                            const active = prefixes.some((p) => location.pathname.startsWith(p));                            
                            return (
                                <StyledMenuListItemContainer
                                    active={active}
                                    key={menuItem.key}
                                    to={menuItem.path}
                                    sidebarOpen={sidebarOpen}
                                >
                                    <StyledMenuItemIcon active={active}>
                                       {menuItem?.icon} 
                                    </StyledMenuItemIcon>
                                    {sidebarOpen && <StyledMenuItemLabel active={active}>
                                        {menuItem.label}
                                    </StyledMenuItemLabel>}
                                </StyledMenuListItemContainer>
                            )
                        })}
                </StyledMenuListContainer>
                {/* <StyledLogoutContainer>
                    <StyledMenuListItemContainer
                        href="javascript:void(0)"
                        style={{
                            justifyContent: 'center'
                        }}
                        onClick={() => reducxDispatch(logout())}
                        sidebarOpen={sidebarOpen}
                    >
                        <StyledMenuItemIcon
                            src={`/assets/images/logout.png`}
                            active
                        />
                        {sidebarOpen && <StyledMenuItemLabel>
                            {messages?.sidebar?.logout}
                        </StyledMenuItemLabel>}
                    </StyledMenuListItemContainer>
                </StyledLogoutContainer> */}
            </StyledMenuContainer>
        </StyledContainer>
    )
}

export default Sidebar;