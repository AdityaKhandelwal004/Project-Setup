import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { ModuleThemeProvider } from "@mono/theme/providers/ModuleThemeProvider";

import { TextInput, Button } from "@mono/components";
import { useFormReducer } from "@mono/hooks/src/form";
import { required, emailValidator } from "@mono/utils/src/validators";
import messages from "../../messages";
import packageMessages from "@mono/messages";
// import { AuthLeftSection } from "./AuthLeftSection";
import { forgotPassword as forgotPasswordAction } from "@mono/redux-global/src/actions";
import logo from "../../assets/logo.png";
import {
  MainContainer,
  ContentWrapper,
  RightSection,
  FormContainer,
  FormTitle,
  FormSubtitle,
  BackToLoginContainer,
  BackToLoginText,
  AuthNavLink,
  CenteredContainer,
  FormWrapper,
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorText,
  MobileLogo,
  SignupHeaderContainer,
  SignupHeaderInner,
} from "./styles";
import { sanitizeServerError } from "../../myUtils/commonFunctions";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { routes } from "../../myUtils";
import { trackScreen } from "../../utils/mixpanel/trackScreens";

const validators = {
  email: [
    required(packageMessages?.forgotPassword?.errors?.email?.required),
    emailValidator,
  ],
};

function ForgotPasswordContent({ onSignIn }: { onSignIn: () => void }) {
  const reduxDispatch: any = useDispatch();
  const {
    connectField,
    handleSubmit: formHandleSubmit,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const history = useHistory();
  const handleFormSubmit = async (data: any) =>
    new Promise<any>((resolve, reject) => {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      reduxDispatch(
        forgotPasswordAction(
          {
            email: data?.email?.trim()?.toLowerCase(),
          },
          (response: any) => resolve(response),
          reject,
        ),
      );
    })
      .then(() => {
        setIsSubmitting(false);
        setTimeout(() => {
          history.push(routes.login);
        }, 3000);
      })
      .catch((error) => {
        const code = error?.message;
        const errorMessage = sanitizeServerError(
          (messages as any)?.forgotPassword?.[code],
        );
        setSubmitError(errorMessage);
        setIsSubmitting(false);
      });

  // Get the form submit handler from the hook
  const handleSubmit = formHandleSubmit(handleFormSubmit);

  useEffect(() => {
    trackScreen("Forgot Password");
  }, []);

  return (
    <MainContainer>
      <ContentWrapper>
        {/* Left side */}
        {/* <AuthLeftSection showExtraFloatingButton showEmpoweringMessage /> */}

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
                  <FormTitle>
                    {messages?.forgotPassword?.resetPassword}
                  </FormTitle>
                  <FormSubtitle>
                    {messages?.forgotPassword?.resetInstruction}
                  </FormSubtitle>
                </SignupHeaderInner>
              </SignupHeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit}>
                {connectField("email", {
                  title: messages?.forgotPassword?.email?.label,
                  placeholder: messages?.forgotPassword?.email?.placeholder,
                  useTouchedValidation: false,
                  inputSize: "full",
                  isAuth: true,
                })(TextInput)}

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
                  isJsxRight={isSubmitting}
                  JsxImg={() => (
                    <div
                      className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent ml-2"
                      style={{ display: "inline-block" }}
                    />
                  )}
                  label={messages?.forgotPassword?.sendResetLink}
                />

                {/* Back to login link */}
                <BackToLoginContainer>
                  <BackToLoginText>
                    <AuthNavLink type="button" onClick={onSignIn}>
                      {messages?.forgotPassword?.goBack}
                    </AuthNavLink>
                  </BackToLoginText>
                </BackToLoginContainer>
              </FormWrapper>
            </FormContainer>
          </CenteredContainer>
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
}

export function ForgotPassword({ onSignIn }: { onSignIn: () => void }) {
  return (
    <ModuleThemeProvider module="auth">
      <ForgotPasswordContent onSignIn={onSignIn} />
    </ModuleThemeProvider>
  );
}
