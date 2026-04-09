import styled from 'styled-components';
import { colors, fontSize, fontWeight, primitiveColors, spacing } from '@mono/theme';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: ${spacing[8]};
  top: 0;
  z-index: 50;
  background-color: #f9fafb;
  padding: 10px 16px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

const LogoImage = styled.img`
  width: 132px;
  height: 32px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserGreeting = styled.span`
  color: ${primitiveColors.purple500};
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize.b1};
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

export function Header({ userName = "John", userAvatar }: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>

      <UserContainer>
        <UserGreeting>Hi {userName}</UserGreeting>
        <UserAvatar
          src={userAvatar || profile}
          alt="User Avatar"
        />
      </UserContainer>
    </HeaderContainer>
  );
}
