import React from 'react';
import { useSelector } from 'react-redux';
import { StyledContainer, StyledLoader } from './styles';
import { ReduxState } from '../../redux/reducers';

const Loader = () => {
  const loaderState = useSelector((state: ReduxState) => state.loader);
  return (
    <>
      {loaderState.visibility && (
        <StyledContainer>
          <StyledLoader src="/assets/images/sidenavlogo.svg" />
        </StyledContainer>
      )}
    </>
  );
};

export default Loader;
