import React, { ComponentType } from 'react';
import {
  StyledIcon,
  StyledIconContainer,
  StyledIndex,
  StyledStepContainer,
  StyledStepLine,
  StyledStepLineContainer,
  StyledStepNavigationContainer,
  StyledTitle,
} from './styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '../../../redux/actions';

interface FormDataProps {
  heading?: string;
  component: ComponentType<{}>; // Specify the type of component as ComponentType<{}>
  navIcon?: ComponentType<{}>;
}

interface StepNavigationProps {
  forms: FormDataProps[];
  currentFormIndex: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  forms,
  currentFormIndex,
}) => {
  const reduxDispatch = useDispatch()
  const stepsCount = forms.length;
  let currentPage : number = useSelector((state : any) => state.stepForm.currentPage)
  
  // Function to generate step lines and circles
  const generateSteps = () => {
    const steps: any = [];
    for (let i: any = 0; i < stepsCount; i++) {
      const Icon: any = forms[i].navIcon;
      steps.push(
        <React.Fragment key={i}>
          <StyledStepLine active={i === 0 || currentPage >= i} />
          <StyledStepContainer onClick={() => reduxDispatch(setCurrentStep(i))}>
            <StyledIconContainer
              active={currentFormIndex === i || currentPage > i}
            >
              {Icon ? (
                <StyledIcon>
                  <Icon fontSize='' />
                </StyledIcon>
              ) : (
                <StyledIndex>{i + 1}</StyledIndex>
              )}
            </StyledIconContainer>
            <StyledTitle active = {i === 0 || currentPage >= i}>Form {i + 1}</StyledTitle>
          </StyledStepContainer>
          {i === stepsCount - 1 && <StyledStepLine />}
        </React.Fragment>
      );
    }
    return steps;
  };

  return (
    <StyledStepNavigationContainer>
      <StyledStepLineContainer>{generateSteps()}</StyledStepLineContainer>
    </StyledStepNavigationContainer>
  );
};

export default StepNavigation;
