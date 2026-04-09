import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import md5 from "md5";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { ModuleThemeProvider } from "@mono/theme/providers/ModuleThemeProvider";
import { TextInput, PasswordInput, Button } from "@mono/components";
import { useFormReducer } from "@mono/hooks/src/form";
import { required, emailValidator } from "@mono/utils/src/validators";
import messages from "../../messages";
import packageMessages from "@mono/messages";
// import { login as loginAction } from '@mono/redux-global/src/actions';
import logo from "../../assets/logo.png";

import {
  MainContainer,
  ContentWrapper,
  RightSection,
  FormContainer,
  FormTitle,
  FormSubtitle,
  ForgotPasswordLink,
  SignUpContainer,
  SignUpText,
  AuthNavLink,
  CenteredContainer,
  HeaderContainer,
  FormWrapper,
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorText,
  MobileLogo,
  SignupHeaderContainer,
  SignupHeaderInner,
  ForgotPasswordRow,
} from "./styles";
import { login } from "../../redux/actions";
import { routes } from "../../myUtils";
import { push } from "connected-react-router";
import { resolveLoginError } from "../../utils/errorHandler";
import { sanitizeServerError } from "../../myUtils/commonFunctions";
import { trackScreen } from "../../utils/mixpanel/trackScreens";

const validators = {
  email: [
    required(packageMessages?.signIn?.errors?.email?.required),
    emailValidator,
  ],
  password: [required(packageMessages?.signIn?.errors?.password?.required)],
};

function SignInContent({
  onComplete,
  onSignUp,
  onForgotPassword,
}: {
  onComplete: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}) {
  const reduxDispatch: any = useDispatch();
  const {
    connectField,
    handleSubmit: formHandleSubmit,
    formValues,
    submitError,
    submitting,
    setSubmitError,
  } = useFormReducer(validators);

  const handleFormSubmit = async (data: any) => {
    if (submitting) {
      return;
    }
    reduxDispatch(push(routes.overview));

    // return new Promise<any>((resolve, reject) => {
    //   reduxDispatch(
    //     login(
    //       {
    //         email: data?.email?.trim()?.toLowerCase(),
    //         password: md5(data?.password),
    //       },
    //       resolve,
    //       reject,
    //     ),
    //   );
    // })
    //   .then((res) => {
    //     if (res?.data) {
    //       reduxDispatch(
    //         push(routes.twoFactorAuthentication, {
    //           email: data?.email,
    //           password: data?.password,
    //           method: res?.data?.method?.name,
    //           senderDetail: res?.data?.senderDetail,
    //         }),
    //       );
    //     } else {
    //       onComplete();
    //     }
    //   })
    //   .catch((error) => {
    //     const code = error?.message;
    //     const errorMessage = sanitizeServerError(
    //       (messages as any)?.signIn?.form?.errors?.[code],
    //     );
    //     setSubmitError(errorMessage);
    //   });
  };

  // Get the form submit handler from the hook
  const handleSubmit = formHandleSubmit(handleFormSubmit);

  const handleSignUpClick = () => {
    onSignUp();
  };

  useEffect(() => {
    trackScreen("Sign In");
  }, []);
  return (
    <MainContainer>
      <ContentWrapper>
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
                  <FormTitle>{messages?.signIn?.heading}</FormTitle>
                  <FormSubtitle>{messages?.signIn?.subHeading}</FormSubtitle>
                </SignupHeaderInner>
              </SignupHeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit}>
                {connectField("email", {
                  title: messages?.signIn?.email?.label,
                  placeholder: messages?.signIn?.email?.placeholder,
                  useTouchedValidation: false,
                  inputSize: "full",
                  isAuth: true,
                })(TextInput)}

                {connectField("password", {
                  title: messages?.signIn?.password?.label,
                  placeholder: messages?.signIn?.password?.placeHolder,
                  useTouchedValidation: false,
                  inputSize: "full",
                  isAuth: true,
                })(PasswordInput)}
                <ForgotPasswordRow>
                  <ForgotPasswordLink type="button" onClick={onForgotPassword}>
                    {messages?.signIn?.forgotPassword}
                  </ForgotPasswordLink>
                </ForgotPasswordRow>
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
                  label={messages?.signIn?.heading as string}
                />

                {/* Sign up link */}
                <SignUpContainer>
                  <SignUpText>
                    {messages?.signIn?.noAccount}{" "}
                    <AuthNavLink type="button" onClick={handleSignUpClick}>
                      {messages?.signIn?.signUp}
                    </AuthNavLink>
                  </SignUpText>
                </SignUpContainer>
              </FormWrapper>
            </FormContainer>
          </CenteredContainer>
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
}

export function SignIn({
  onComplete,
  onSignUp,
  onForgotPassword,
}: {
  onComplete: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}) {
  return (
    <ModuleThemeProvider module="auth">
      <SignInContent
        onComplete={onComplete}
        onSignUp={onSignUp}
        onForgotPassword={onForgotPassword}
      />
    </ModuleThemeProvider>
  );
}
