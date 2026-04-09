import React from 'react';
import { StyledContainer, StyledProgressBar } from './styles';
import { useSelector } from 'react-redux';

interface Props {
  length: number;
}

const FormProgressBar: React.FC<Props> = ({ length }) => {
  const currentPage =
    useSelector((state: any) => state.stepForm.currentPage) + 1;

  return (
    <StyledContainer>
      <StyledProgressBar
        width={currentPage && Math.round((currentPage / length) * 100)}
      />
    </StyledContainer>
  );
};

export default FormProgressBar;
