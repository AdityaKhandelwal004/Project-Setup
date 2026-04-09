import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  StyledChildrenContainer,
  StyledContainer,
  StyledContentContainer,
  StyledIconHeadingContainer,
  StyledTypography,
} from './styles';
import { StyledIcon } from '../sidebar/styles';
import Header from '../header';
import Sidebar from '../sidebar';
import GoBack from "../../../assets/images/backIcon.svg"
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';

interface Props {
  children?: JSX.Element | JSX.Element[];
  hideSidebar?: boolean;
  cardCss?: any;
  contentCss?: any;
  heading?: string;
  showGoBack?: boolean;
  hasHeader?: boolean;
  iconSource?: string;
  goBackIcon?: { isBack: boolean; path: string };
  noPadding?: boolean;
  noMargin?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  hideSidebar,
  heading,
  showGoBack,
  hasHeader = true,
  iconSource,
  goBackIcon,
  noPadding,
  noMargin = false,
  ...styleProps
}) => {
  const location = useLocation();
  const reduxDispatch = useDispatch();
  return (
    <StyledContainer noPadding={noPadding} {...styleProps}>
      {!hideSidebar && <Sidebar />}
      <StyledContentContainer noMargin={noMargin}>
        {hasHeader && <Header />}
        <StyledChildrenContainer noMargin={noMargin} hasHeader={hasHeader}>
          {showGoBack && (
            <StyledIconHeadingContainer>
              <StyledIcon
                height="31px"
                width="31px"
                src={GoBack}
                alt="icon"
                onClick={() => {
                  reduxDispatch(goBack())
                }}
              />
            </StyledIconHeadingContainer>
          )
          }
          {children}
        </StyledChildrenContainer>
      </StyledContentContainer>
    </StyledContainer>
  );
};

export default Container;
