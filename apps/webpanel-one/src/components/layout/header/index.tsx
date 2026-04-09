import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StyledHeader, {
  StyledAvatar,
  StyledToolbar,
  StyledAppBar,
  StyledAvatarContainer,
  StyledAdminName,
} from './styles';
import { routes } from '../../../utils';
import { baseImageUrl } from '../../../config';
import { ReduxState } from '../../../redux/reducers';

interface HeaderCustomProps{}

const Header = (props: HeaderCustomProps) => {
  const { pathname } = useLocation();

  const userProfile = useSelector((state: ReduxState) => state.profile);

  return (
    <StyledHeader {...props}>
      <StyledAppBar>
        <StyledToolbar>
          <StyledAvatarContainer href={routes.profile}>
            <StyledAvatar
              alt={userProfile?.name?.charAt(0).toUpperCase()}
              src={userProfile && `${baseImageUrl}/${userProfile.profilePhoto}`}
              cursor={pathname === routes.profile ? 'default' : 'pointer'}
            />
            <StyledAdminName
              cursor={pathname === routes.profile ? 'default' : 'pointer'}
            >
              {userProfile
                && userProfile?.name?.charAt(0)?.toUpperCase()
                  + userProfile?.name?.slice(1)}
            </StyledAdminName>
          </StyledAvatarContainer>
        </StyledToolbar>
      </StyledAppBar>
    </StyledHeader>
  );
};

export default Header;
