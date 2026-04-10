import { motion } from 'motion/react';
import md5 from 'md5';
import { AlertCircle } from 'lucide-react';
import { ModuleThemeProvider } from '@mono/theme/providers/ModuleThemeProvider';
import { TextInput, PasswordInput, Button, Chip } from '@mono/components';
import { useFormReducer } from '@mono/hooks/src/form';
import { required, emailValidator } from '@mono/utils/src/validators';
import messages from '../../messages';
import packageMessages from '@mono/messages';
import {
  MainContainer,
  ContentWrapper,
  RightSection,
  FormContainer,
  FormTitle,
  FormSubtitle,
  ForgotPasswordLink,
  CenteredContainer,
  HeaderContainer,
  FormWrapper,
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorText,
} from './styles';
import { otherColour, primitiveColors } from '@mono/theme';
import { ChipSize } from '@mono/components/src/customChip/styles';
// import { login } from '@mono/redux-global/src/actions';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { routes } from '../../myUtils';

const validators = {
  email: [required(packageMessages?.signIn?.errors?.email?.required), emailValidator],
  password: [required(packageMessages?.signIn?.errors?.password?.required)],
};

function SignInContent({
  onForgotPassword,
}: {
  onComplete: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}) {
  const {
    connectField,
    handleSubmit,
    submitting,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

    const reduxDispatch = useDispatch() as any;



  const onSubmit = async (data: any) => {
    // Check if email and password are provided
    if (data?.email && data?.password) {
      // Comment out login validation - just redirect to dashboard for any valid input
      // reduxDispatch(
      //   login(
      //     {
      //       email: data?.email?.toLowerCase(),
      //       password: md5(data?.password),
      //     },
      //     (value?: any) => resolve(value),
      //     (error?: any) => reject(error),
      //   ),
      // );
      reduxDispatch(push(routes.dashboard.root));
    } else {
      setSubmitError('Please enter both email and password');
    }
  };

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
                <Chip
                 bgColor={otherColour.greyChip}
                 text={messages?.signIn?.chipText}
                 radius='4px'
                 textColor={primitiveColors.midNight}
                 chipSize={ChipSize.Large}
                
                />
                <FormTitle>{messages?.signIn?.heading}</FormTitle>
                <FormSubtitle>{messages?.signIn?.subHeading}</FormSubtitle>
              </HeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>

                    {connectField('email', {
                      title: messages?.signIn?.email?.label,
                      placeholder:  messages?.signIn?.email?.placeholder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      isAuth: true
                    })(TextInput)}

                    {connectField('password', {
                      title: messages?.signIn?.password?.label,
                      placeholder: messages?.signIn?.password?.placeHolder,
                      useTouchedValidation: false,
                      inputSize: 'full',
                      isAuth: true
                    })(PasswordInput)}

                  <ForgotPasswordLink
                    type="button"
                    onClick={onForgotPassword}
                  >
                    {messages?.signIn?.forgotPassword}
                  </ForgotPasswordLink>

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
                    label={messages?.signIn?.heading}
                    disabled={submitting}
                  />
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
