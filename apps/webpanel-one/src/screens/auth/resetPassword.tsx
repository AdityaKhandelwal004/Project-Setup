import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { ModuleThemeProvider } from "@mono/theme/providers/ModuleThemeProvider";

import { Button, PasswordInput } from "@mono/components";
import { useFormReducer } from "@mono/hooks/src/form";
import { required, passwordValidator } from "@mono/utils/src/validators";
import messages from "../../messages";
import packageMessages from "@mono/messages";
import logo from "../../assets/logo.png";
import {
  MainContainer,
  ContentWrapper,
  RightSection,
  FormContainer,
  FormTitle,
  FormSubtitle,
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
import { confirmPassword } from "@mono/utils/src/validators";
import { apiCall } from "@mono/redux-global/src/actions";
import { RESET_PASSWORD } from "../../api";
import { HttpMethods } from "@mono/utils";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import md5 from "md5";
import { routes } from "../../myUtils";
import { trackScreen } from "../../utils/mixpanel/trackScreens";

const validators = {
  password: [
    required(packageMessages?.signUp?.errors?.password?.required),
    passwordValidator,
  ],
  confirmPassword: [
    required(packageMessages?.signUp?.errors?.confirmPassword?.required),
    confirmPassword("password"),
  ],
};

function ResetPasswordContent() {
  const reduxDispatch: any = useDispatch();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    connectField,
    handleSubmit: formHandleSubmit,
    formValues,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

  const handleFormSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      setIsSubmitting(true);
      const payload = {
        password: md5(formValues?.password?.value),
        confirmPassword: md5(formValues?.confirmPassword?.value),
        token: token || "",
      };

      reduxDispatch(
        apiCall(RESET_PASSWORD, resolve, reject, HttpMethods.POST, payload),
      );
    })
      .then(() => {
        setIsSubmitting(false);
        setTimeout(() => {
          history.push(routes.login);
        }, 3000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitError("The password reset link is invalid or has expired.");
      });

  // Get the form submit handler from the hook
  const handleSubmit = formHandleSubmit(handleFormSubmit);

  useEffect(() => {
    trackScreen("Reset Password");
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
                  <FormTitle>{messages?.changePassword?.title}</FormTitle>
                  <FormSubtitle>
                    {messages?.changePassword?.subTitle}
                  </FormSubtitle>
                </SignupHeaderInner>
              </SignupHeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit}>
                {connectField("password", {
                  title: messages?.changePassword?.currentPassword,
                  placeholder: messages?.changePassword?.newPassword,
                  useTouchedValidation: false,
                  inputSize: "full",
                  isAuth: true,
                })(PasswordInput)}

                {connectField("confirmPassword", {
                  title: messages?.changePassword?.confirmPassword,
                  placeholder: messages?.changePassword?.retypePassword,
                  useTouchedValidation: true,
                  inputSize: "full",
                  isAuth: true,
                })(PasswordInput)}

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
                  label="Update password"
                />
              </FormWrapper>
            </FormContainer>
          </CenteredContainer>
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
}

export function ResetPassword({ onSignIn }: { onSignIn: () => void }) {
  return (
    <ModuleThemeProvider module="auth">
      <ResetPasswordContent onSignIn={onSignIn} />
    </ModuleThemeProvider>
  );
}
