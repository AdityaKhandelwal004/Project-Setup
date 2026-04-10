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
  passwordValidator,
  confirmPassword,
} from '@mono/utils/src/validators';
import messages from '../../messages';
import packageMessages from '@mono/messages';
import { AuthLeftSection } from './AuthLeftSection';
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
import { useDispatch } from 'react-redux';
import { apiCall } from '../../redux/actions';
import { HttpMethods } from '@mono/utils';
import { RESET_PASSWORD } from '../../api';
import md5 from 'md5';


const validators = {
  password: [required(messages?.general?.requiredField), passwordValidator],
  confirmPassword: [required(messages?.general?.requiredField),confirmPassword('password')],
};

function ResetPasswordContent({ onSignIn }: { onSignIn: () => void }) {
  const {
    connectField,
    handleSubmit,
    formValues,
    submitting,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

  const reduxDispatch = useDispatch();


const onSubmit = async (data: any) =>{
  
   return new Promise<any>((resolve, reject) => {
        const sanitizedBody: any = {
          password: md5(data?.oldPassword),
          confirmPassword: md5(data?.confirmPassword),
        };
      reduxDispatch(
        apiCall(
          RESET_PASSWORD,
          resolve,
          reject,
          HttpMethods.POST,
          sanitizedBody
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


      })
      .catch((error) => {
          setSubmitError((messages?.login?.form?.errors as any)?.[error?.message] || messages?.general?.generalError)
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
                 {messages?.resetPassword?.heading}
                </FormTitle>
                <FormSubtitle>
                 {messages?.resetPassword?.resetInstruction}
                </FormSubtitle>
              </HeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                {connectField('password', {
                  title: messages?.general?.password,
                  placeholder: messages?.changePassword?.newPassword,
                  useTouchedValidation: false,
                  inputSize: 'full',
                  isAuth: true
                })(TextInput)}
                
                {connectField('confirmPassword', {
                  title: messages?.general?.confirmPassword,
                  placeholder: messages?.general?.confirmPassword,
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
                    label={messages?.resetPassword?.updatepassword}
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