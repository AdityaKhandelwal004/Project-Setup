import React, { useEffect } from "react";
import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import md5 from "md5";
import { useDispatch } from "react-redux";
import {
  TextInput,
  PasswordInput,
  MaterialDateInput,
  Button,
} from "@mono/components";
import { useFormReducer } from "@mono/hooks/src/form";
import {
  required,
  emailValidator,
  passwordValidator,
  confirmPassword,
  dobValidator,
} from "@mono/utils/src/validators";
import messages from "../../messages";
import packageMessages from "@mono/messages";
import { AuthLeftSection } from "./AuthLeftSection";
import { signup as signupAction } from "@mono/redux-global/src/actions";
import logo from "../../assets/logo.png";

import {
  ContentWrapper,
  FormContainer,
  FormSubtitle,
  FormTitle,
  MainContainer,
  RightSection,
  AuthNavLink,
  SignupFormWrapper,
  SignupFieldsGrid,
  SignupFieldContainer,
  SignupHeaderContainer,
  SignupHeaderInner,
  SignupFooterContainer,
  SignupFooterText,
  StyledRegularB1,
  StyledTermsLink,
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorText,
  CenteredContainer,
  MobileLogo,
  DatePickerGlobalStyles,
} from "./styles";
import { fontFamilies } from "@mono/theme";
import { sanitizeServerError } from "../../myUtils/commonFunctions";
import moment from "moment";
import { routes } from "../../myUtils";
import { trackScreen } from "../../utils/mixpanel/trackScreens";

// Validators following the reference pattern
const validators = {
  firstName: [required(packageMessages?.signUp?.errors?.firstName?.required)],
  lastName: [required(packageMessages?.signUp?.errors?.lastName?.required)],
  email: [
    required(packageMessages?.signUp?.errors?.email?.required),
    emailValidator,
  ],
  dateOfBirth: [
    required(packageMessages?.signUp?.errors?.dateOfBirth?.required),
    dobValidator,
  ],
  password: [
    required(packageMessages?.signUp?.errors?.password?.required),
    passwordValidator,
  ],
  confirmPassword: [
    required(packageMessages?.signUp?.errors?.confirmPassword?.required),
    confirmPassword("password"),
  ],
};

export function Signup({
  onComplete,
  onSignIn,
}: {
  onComplete: () => void;
  onSignIn: () => void;
}) {
  const reduxDispatch: any = useDispatch();
  const {
    connectField,
    handleSubmit: formHandleSubmit,
    submitError,
    submitting,
    setSubmitError,
  } = useFormReducer(validators);

  const handleFormSubmit = async (formData: Record<string, any>) => {
    if (submitting) {
      return;
    }

    const signupPayload = {
      firstName: formData.firstName?.trim(),
      lastName: formData.lastName?.trim(),
      email: formData.email?.trim()?.toLowerCase(),
      ...(formData.dateOfBirth &&
        formData.dateOfBirth.trim() && {
          dateOfBirth: formData.dateOfBirth.trim(),
        }),
      password: md5(formData.password || ""),
      termAccepted: true,
      privacyPolicyAccepted: true,
    };

    return new Promise<any>((resolve, reject) => {
      reduxDispatch(
        signupAction(
          signupPayload as any,
          (data: any) => resolve(data),
          reject,
        ),
      );
    })
      .then(() => {
        onComplete();
      })
      .catch((error) => {
        const code = error?.message as string;
        const errorMessage = sanitizeServerError(
          (messages as any)?.signUp?.form?.errors?.[code],
        );
        setSubmitError(errorMessage);
      });
  };

  const handleSubmit = formHandleSubmit(handleFormSubmit);

  // Render-only error for terms (single instance, no duplication)
  useEffect(() => {
    trackScreen("Sign Up");
  }, []);

  return (
    <MainContainer>
      <DatePickerGlobalStyles />
      <ContentWrapper>
        {/* Left side  */}
        <AuthLeftSection showEmpoweringMessage showSignUpFloatingButton />

        {/* Right side - Sign up form */}
        <RightSection
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CenteredContainer>
            <FormContainer
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Header */}
              <SignupHeaderContainer>
                <MobileLogo src={logo} alt="Obie Money Logo" />
                <SignupHeaderInner>
                  <FormTitle>{messages?.signUp?.heading}</FormTitle>
                  <FormSubtitle>{messages?.signUp?.subHeading}</FormSubtitle>
                </SignupHeaderInner>
              </SignupHeaderContainer>

              {/* Form */}
              <SignupFormWrapper onSubmit={handleSubmit}>
                <SignupFieldsGrid>
                  <SignupFieldContainer>
                    {connectField("firstName", {
                      title: messages?.signUp?.firstName?.label,
                      placeholder: messages?.signUp?.firstName?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: "full",
                      // success: getFieldSuccessMessage('firstName'),
                      isAuth: true,
                    })(TextInput)}
                  </SignupFieldContainer>

                  <SignupFieldContainer>
                    {connectField("lastName", {
                      title: messages?.signUp?.lastName?.label,
                      placeholder: messages?.signUp?.lastName?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: "full",
                      // success: getFieldSuccessMessage('lastName'),
                      isAuth: true,
                    })(TextInput)}
                  </SignupFieldContainer>
                </SignupFieldsGrid>

                <SignupFieldsGrid>
                  <SignupFieldContainer>
                    {connectField("email", {
                      title: messages?.signUp?.email?.label,
                      placeholder: messages?.signUp?.email?.placeholder,
                      useTouchedValidation: false,
                      inputSize: "full",
                      // success: getFieldSuccessMessage('email'),
                      isAuth: true,
                    })(TextInput)}
                  </SignupFieldContainer>

                  <SignupFieldContainer>
                    {connectField("dateOfBirth", {
                      title: messages?.signUp?.dob?.label,
                      placeholder: messages?.signUp?.dob?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: "full",
                      // success: getFieldSuccessMessage('dateOfBirth'),
                      isAuth: true,
                      maxDate: moment().subtract(18, "years").toDate(),
                    })(MaterialDateInput)}
                  </SignupFieldContainer>
                </SignupFieldsGrid>

                <SignupFieldContainer>
                  {connectField("password", {
                    title: messages?.signUp?.createPassword?.label,
                    placeholder: messages?.signUp?.createPassword?.placeHolder,
                    useTouchedValidation: false,
                    inputSize: "full",
                    // success: getFieldSuccessMessage('password'),
                    isAuth: true,
                  })(PasswordInput)}
                </SignupFieldContainer>

                <SignupFieldContainer>
                  {connectField("confirmPassword", {
                    title: messages?.signUp?.confirmPassword?.label,
                    placeholder: messages?.signUp?.confirmPassword?.placeHolder,
                    useTouchedValidation: false,
                    inputSize: "full",
                    // success: getFieldSuccessMessage('confirmPassword'),
                    isAuth: true,
                  })(PasswordInput)}
                </SignupFieldContainer>
                {/* Submit Error Display */}
                {submitError && (
                  <ErrorContainer>
                    <ErrorContent>
                      <ErrorIcon>
                        <AlertCircle size={16} />
                      </ErrorIcon>
                      <ErrorText>{submitError}</ErrorText>
                    </ErrorContent>
                  </ErrorContainer>
                )}

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  isJsxRight={submitting}
                  JsxImg={() => (
                    <div
                      className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent ml-2"
                      style={{ display: "inline-block" }}
                    />
                  )}
                  label={messages?.signUp?.signUpButton as string}
                />

                <div style={{ marginTop: "16px", textAlign: "left" }}>
                  <StyledRegularB1>
                    By clicking <i>Start building wealth today</i>, you agree to
                    Obie's{" "}
                    <StyledTermsLink
                      as="a"
                      href={routes.content.disclaimer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Disclaimer"}
                    </StyledTermsLink>
                    {" , "}
                    <StyledTermsLink
                      as="a"
                      href={routes.content.terms_and_conditions}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {messages?.signUp?.termsConditions}
                    </StyledTermsLink>{" "}
                    {messages?.signUp?.and}{" "}
                    <StyledTermsLink
                      as="a"
                      href={routes.content.privacy_policy}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Data Privacy Policy"}
                    </StyledTermsLink>
                  </StyledRegularB1>
                </div>
              </SignupFormWrapper>

              {/* Login link */}
              <SignupFooterContainer
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onSignIn}
              >
                <SignupFooterText
                  style={{ fontFamily: fontFamilies.secondary }}
                >
                  {messages?.signUp?.alreadyBuilding}{" "}
                  <AuthNavLink type="button" onClick={onSignIn}>
                    {messages?.signUp?.signInHere}
                  </AuthNavLink>
                </SignupFooterText>
              </SignupFooterContainer>
            </FormContainer>
          </CenteredContainer>
        </RightSection>

        {/* </div> */}
      </ContentWrapper>

      {/* </div> */}
    </MainContainer>
  );
}
