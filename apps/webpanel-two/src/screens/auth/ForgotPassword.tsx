import { motion } from 'motion/react';
import {
  AlertCircle,
} from 'lucide-react';
import { ModuleThemeProvider } from '@mono/theme/providers/ModuleThemeProvider';

import { TextInput, Button } from '@mono/components';
import { useFormReducer } from '@mono/hooks/src/form';
import {
  required,
  emailValidator,
} from '@mono/utils/src/validators';
import messages from '../../messages';
import packageMessages from '@mono/messages';
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
  HeaderContainer,
  FormWrapper,
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorText,
  Logo
} from './styles';
import { apiCall } from '@mono/redux-global/src/actions';
import { HttpMethods } from '@mono/utils';
import { push } from 'connected-react-router';
import { routes } from '../../myUtils';
import { useDispatch } from 'react-redux';
import { FORGOT_PASSWORD } from '../../api';


const validators = {
  email: [required(packageMessages?.forgotPassword?.errors?.email?.required), emailValidator],
};

function ForgotPasswordContent({ onSignIn }: { onSignIn: () => void }) {

    const reduxDispatch = useDispatch() as any;

  const {
    connectField,
    handleSubmit,
    formValues,
    submitting,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

  const onSubmit = async (data: any) =>{
  
   return new Promise<any>((resolve, reject) => {
      reduxDispatch(
        apiCall(
          FORGOT_PASSWORD,
          resolve,
          reject,
          HttpMethods.POST,
          { email: data?.email?.toLowerCase() }
        )
      );
    })
      .then(() => {
          //  toast(({ closeToast }) => (
          //   <Toast
          //     text={messages?.forgotPassword?.form?.success}
          //     type={ToastType.SUCCESS}
          //     closeToast={closeToast}
          //   />
          // ), {
          //   closeButton: false
          // });

        setTimeout(() => {
          reduxDispatch(push(routes.login));
        }, 2000);
      })
      .catch((error) => {
          setSubmitError(messages?.login?.form?.errors?.[error?.message] || messages?.general?.generalError)
      });
    }

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
              <HeaderContainer>
                <FormTitle>
                 {messages?.forgotPassword?.resetPassword}
                </FormTitle>
                <FormSubtitle>
                 {messages?.forgotPassword?.resetInstruction}
                </FormSubtitle>
              </HeaderContainer>

              {/* Form */}
              <FormWrapper  onSubmit={handleSubmit(onSubmit)}>
                {connectField('email', {
                  title: messages?.forgotPassword?.email?.label,
                  placeholder: messages?.forgotPassword?.email?.placeholder,
                  useTouchedValidation: false,
                  inputSize: 'full',
                  isAuth: true
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
                    label={messages?.forgotPassword?.sendResetLink}
                  />

                {/* Back to login link */}
                <BackToLoginContainer>
                  <BackToLoginText>
                   
                    <AuthNavLink
                      type="button"
                      onClick={onSignIn}
                    >
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