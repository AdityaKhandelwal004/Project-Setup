import React from 'react';
import Button from '../../button';
import { useDispatch } from 'react-redux';
import { StyledContainer } from './styles';
import { setCurrentStep } from '../../../redux/actions';
import { useSelector } from 'react-redux';

interface NavButtonGroupProps {
  formLength: number;
}

const NavButtonGroup: React.FC<NavButtonGroupProps> = ({ formLength }) => {
  const reduxDispatch = useDispatch();
  const currentFormIndex = useSelector(
    (state: any) => state.stepForm.currentPage
  );

  return (
    <StyledContainer>
      {currentFormIndex - 1 >= 0 && (
        <Button
          label='Back'
          variant='outlined'
          onClick={() =>
            reduxDispatch(
              setCurrentStep(currentFormIndex - 1 >= 0 && currentFormIndex - 1)
            )
          }
        />
      )}
      {currentFormIndex !== formLength - 1 &&
        currentFormIndex + 1 < formLength && (
          <Button
            label='Next'
            variant='outlined'
            onClick={() => reduxDispatch(setCurrentStep(currentFormIndex + 1))}
            style={{ marginLeft: 'auto' }}
          />
        )}
    </StyledContainer>
  );
};

export default NavButtonGroup;
