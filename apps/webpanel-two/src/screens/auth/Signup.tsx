import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import md5 from 'md5';
import { Checkbox, SvgIcon} from "@mui/material";
import { TextInput, PasswordInput, MaterialDateInput, Button } from '@mono/components';
import { useFormReducer } from '@mono/hooks/src/form';
import {
  required,
  emailValidator,
  passwordValidator,
  confirmPassword,
  getSuccessMessage,
} from '@mono/utils/src/validators';
import messages from '../../messages';
import packageMessages from '@mono/messages';

import {
  ContentWrapper,
  FormContainer,
  FormSubtitle,
  FormTitle,
  MainContainer,
  RightSection,
  StyledTermsContainer,
  StyledRegularB1,
  StyledTermsLink,
  AuthNavLink,
} from './styles';
import { fontFamilies } from '@mono/theme';

// Custom Checkbox Icons
const CustomUncheckedIcon = () => (
  <SvgIcon sx={{ width: 20, height: 20 }}>
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="4"
      fill="none"
      stroke="#100937"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

const CustomCheckedIcon = () => (
  <SvgIcon sx={{ width: 20, height: 20 }}>
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="4"
      fill="#E7E6EB"
      stroke="#100937"
      strokeWidth="1.5"
    />
    <path
      d="M6 10l2 2 4-4"
      stroke="#100937"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

// Validators following the reference pattern
const validators = {
  firstName: [required(packageMessages?.signUp?.errors?.firstName?.required)],
  lastName: [required(packageMessages?.signUp?.errors?.lastName?.required)],
  email: [required(packageMessages?.signUp?.errors?.email?.required), emailValidator],
  dateOfBirth: [required(packageMessages?.signUp?.errors?.dateOfBirth?.required)],
  password: [required(packageMessages?.signUp?.errors?.password?.required), passwordValidator],
  confirmPassword: [
    required(packageMessages?.signUp?.errors?.confirmPassword?.required),
    confirmPassword('password'),
  ],
};

export function Signup({ onComplete, onSignIn }: { onComplete: () => void; onSignIn: () => void }) {
  const {
    connectField,
    handleSubmit: formHandleSubmit,
    formValues,
    hasError,
    submitting,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);
  const [isChecked, setIsChecked] = useState(false);

  const handleFormSubmit = async (formData: Record<string, any>) => {
    try {
      setSubmitError(undefined);

      const signupCredentials = {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        dateOfBirth: formData.dateOfBirth || '',
        password: md5(formData.password || ''),
      };

    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setSubmitError(errorMessage);
    }
  };

  const handleSubmit = formHandleSubmit(handleFormSubmit);

  return (
    <MainContainer>
      <ContentWrapper>

        {/* Right side - Sign up form */}
        <RightSection
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center w-full">
            <FormContainer
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Header */}
              <div className="text-center mb-4 sm:mb-6 md:mb-6 lg:mb-6">
                <div className="text-center mb-8">
                  <FormTitle>{messages?.signUp?.heading}</FormTitle>
                  <FormSubtitle>{messages?.signUp?.subHeading}</FormSubtitle>
                </div>
              </div>
              {/* Error Display */}
              {/* Submit Error Display */}
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-sm text-red-700">{submitError}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 break-words whitespace-normal ">
                  <div className="flex flex-col">
                    {connectField('firstName', {
                      title: messages?.signUp?.firstName?.label,
                      placeholder: messages?.signUp?.firstName?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      // success: getFieldSuccessMessage('firstName'),
                      isAuth: true
                    })(TextInput)}
                  </div>

                  <div className="flex flex-col">
                    {connectField('lastName', {
                      title: messages?.signUp?.lastName?.label,
                      placeholder: messages?.signUp?.lastName?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      // success: getFieldSuccessMessage('lastName'),
                      isAuth: true
                    })(TextInput)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex flex-col">
                    {connectField('email', {
                      title: messages?.signUp?.email?.label,
                      placeholder: messages?.signUp?.email?.placeholder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      // success: getFieldSuccessMessage('email'),
                      isAuth: true
                    })(TextInput)}
                  </div>

                  <div className="flex flex-col">
                    {connectField('dateOfBirth', {
                      title: messages?.signUp?.dob?.label,
                      placeholder: messages?.signUp?.dob?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      // success: getFieldSuccessMessage('dateOfBirth'),
                      isAuth: true
                    })(MaterialDateInput)}
                  </div>
                </div>

                <div className="flex flex-col">
                  {connectField('password', {
                    title: messages?.signUp?.createPassword?.label,
                    placeholder: messages?.signUp?.createPassword?.placeHolder,
                    useTouchedValidation: false,
                    inputSize: 'full',
                    // success: getFieldSuccessMessage('password'),
                    isAuth: true
                  })(PasswordInput)}
                </div>

                <div className="flex flex-col">
                  {connectField('confirmPassword', {
                    title: messages?.signUp?.confirmPassword?.label,
                    placeholder: messages?.signUp?.confirmPassword?.placeHolder,
                    useTouchedValidation: false,
                    inputSize: 'full',
                    // success: getFieldSuccessMessage('confirmPassword'),
                    isAuth: true
                  })(PasswordInput)}
                </div>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    label={messages?.signUp?.signUpButton}
                  />
                <StyledTermsContainer
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(event) => setIsChecked(event.target.checked)}
                      checkedIcon={<CustomCheckedIcon />}
                      icon={<CustomUncheckedIcon />}
                    />
                  }
                  label={
                    <StyledRegularB1>
                      {messages?.signUp?.read}{' '}
                      <StyledTermsLink
                        onClick={() => {
                        }}
                      >
                        {messages?.signUp?.termsConditions}
                      </StyledTermsLink>{' '}
                      {messages?.signUp?.and}{' '}
                      <StyledTermsLink
                        onClick={() => {
                        }}
                      >
                        {messages?.signUp?.privacyPolicy}
                      </StyledTermsLink>
                    </StyledRegularB1>
                  }
                />
              </form>

              {/* Login link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-4 sm:mt-6 md:mt-6 lg:mt-6"
                onClick={onSignIn}
              >
                <p className="text-[14px] text-brand-button" style={{fontFamily: fontFamilies.secondary}} >
                  {messages?.signUp?.alreadyBuilding}{' '}
                  <AuthNavLink
                    type="button"
                    onClick={onSignIn}
                    className="font-bold text-[14px] underline hover:opacity-80 text-brand-accent"
                  >
                    {messages?.signUp?.signInHere}
                  </AuthNavLink>
                </p>
              </motion.div>
            </FormContainer>
          </div>
        </RightSection>

        {/* </div> */}
      </ContentWrapper>

      {/* </div> */}
    </MainContainer>
  );
}
