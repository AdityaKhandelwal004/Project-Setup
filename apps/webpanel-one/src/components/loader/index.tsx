import React from 'react';
import { useSelector } from 'react-redux';
import { StyledContainer, StyledLoader } from './styles';
import { ReduxState } from '../../redux/reducers';
import { sidenavLogo } from '../../assets/images';

const Loader = () => {
  const loaderState = useSelector((state: ReduxState) => state.loader);
  return (
    <>
      {loaderState.visibility && (
        <StyledContainer>
          <StyledLoader src={sidenavLogo} />
        </StyledContainer>
      )}
    </>
  );
};

export default Loader;
