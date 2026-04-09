import React, { ComponentType, useState } from 'react';
import StepNavigation from './stepNavigation';
import NavButtonGroup from './navButtonGroup';
import {
  StepInfo,
  StyledButtonGroup,
  StyledContainer,
  StyledFormContainer,
  StyledFormTitle,
  StyledHeading,
  StyledProgressBarWrapper,
  StyledSubHeading,
  StyledTitleContainer,
} from './styles';
import FormProgressBar from './formProgressBar';
import { colors } from '../../theme/style.palette';
import { fontSize } from '../../theme/style.typography';
import { useSelector } from 'react-redux';

interface FormDataProps {
  heading?: string;
  component: ComponentType<{}>; // Specify the type of component as ComponentType<{}>
  navIcon?: ComponentType<{}>;
}

interface StepFormProps {
  heading?: string;
  subHeading?: string;
  forms: FormDataProps[];
}

const StepForm: React.FC<StepFormProps> = ({ heading, subHeading, forms }) => {
  const currentFormIndex = useSelector((state : any) => state.stepForm.currentPage);

  const renderComponent = () => {
    const CurrentFormComponent: React.ComponentType =
      forms[currentFormIndex].component;
    return CurrentFormComponent ? <CurrentFormComponent /> : null;
  };

  return (
    <StyledContainer>
      <StyledTitleContainer>
        {heading && <StyledHeading>{heading}</StyledHeading>}
        {subHeading && <StyledSubHeading>{subHeading}</StyledSubHeading>}
      </StyledTitleContainer>

      <StepNavigation
        forms={forms}
        currentFormIndex={currentFormIndex}
      />

      <StyledProgressBarWrapper>
        <FormProgressBar length={forms.length} />
      </StyledProgressBarWrapper>

      <StepInfo>
        <StyledFormTitle fontSize={fontSize.h3}>
          {forms[currentFormIndex].heading}
        </StyledFormTitle>
        <StyledFormTitle color={colors.grey100}>
          Step {currentFormIndex + 1} of {forms.length}
        </StyledFormTitle>
      </StepInfo>

      <StyledFormContainer>{renderComponent()}</StyledFormContainer>

      <StyledButtonGroup>
        <NavButtonGroup
          formLength={forms.length}
        />
      </StyledButtonGroup>
    </StyledContainer>
  );
};

export default StepForm;
