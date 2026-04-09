import React,{JSX, useState} from 'react';
import { StyledChildrenContainer, StyledContainer, StyledContentWrapper, StyledIcon, StyledLogoutMenuIcon, StyledPersonIcon, StyledSideBarContainer } from "./styles"
import { Header, Sidebar } from '@mono/components';
import { useDispatch, useSelector } from 'react-redux';
import messages from '../messages';
import { logout } from '@mono/redux-global/src/actions';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { routes } from '../myUtils';
import { push } from 'connected-react-router';
import type { ReduxState } from '../redux/reducers';

interface Props {
    children?:(JSX.Element|JSX.Element[]);
    hideHeader?:boolean;
    hideSidebar?:boolean;
    cardCss?:any;
    contentCss?:any;
    heading?: string;
    headingCount?: (string | number);
    showCount?: boolean;
    showGoBack?: boolean;
    centerAlign?: boolean;
    noPadding?: boolean;
}


const menuItems = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlinedIcon/>,
        path: routes.dashboard.root,
        // right: Right.DASHBOARD,
    },
    {
        key: 'customers',
        label: 'Customers',
        icon: <PeopleOutlineOutlinedIcon/>,
        path: routes.customers,
        matchPrefixes: [routes.customers, routes.userDetails.replace('/:id','')],
        // right: Right.DASHBOARD,
    },
    {
        key: 'learningResources',
        label: 'Learning resources',
        icon: <BookOutlinedIcon/>,
        path: routes.learningResources,
        // right: Right.USER_MANAGEMENT,
    },
       {
        key: 'partners',
        label: 'Partners',
        icon: <SupervisedUserCircleOutlinedIcon/>,
        path: routes.partners,
        // right: Right.USER_MANAGEMENT,
    },
   ]


const Container:React.FC<Props> = ({
    children, hideHeader,hideSidebar, 
    heading, headingCount,showCount,
    showGoBack, noPadding,
    ...styleProps
})=>{
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const userProfile = useSelector((state: ReduxState) => state.profile);

    const reduxDispatch = useDispatch() as any;
      const actions = [
        {
          id: 'profile',
          text: messages?.general?.profile,
          onClick: () => {
            reduxDispatch(push(routes.profile));
          },
          icon: <StyledPersonIcon/>,
        },
        {
          id: 'logout',
          text: messages?.general?.logout,
          onClick: () => {
            reduxDispatch(logout());
          },
          icon: <StyledLogoutMenuIcon />,
        },
      ];

    return (
        <StyledContainer noPadding={noPadding} {...styleProps}>
            {!hideSidebar && <StyledSideBarContainer>
                <Sidebar menuItems={menuItems} sidebarOpen={sidebarOpen}/>
            </StyledSideBarContainer>}
            <StyledContentWrapper noPadding={noPadding}>
                {!hideHeader && (<Header
                    heading={heading}
                    headingCount={headingCount}
                    showCount={showCount}
                    showGoBack={showGoBack}
                    actions={actions}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    userProfile={userProfile}
                />)}
                <StyledChildrenContainer>
                    {children}
                </StyledChildrenContainer>
            </StyledContentWrapper>
        </StyledContainer>
    )
}

export default Container;