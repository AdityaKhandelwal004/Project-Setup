import { motion, AnimatePresence } from 'motion/react';
import md5 from 'md5';
import { AlertCircle } from 'lucide-react';
import { ModuleThemeProvider } from '@mono/theme/providers/ModuleThemeProvider';
import { TextInput, PasswordInput, Button, Chip } from '@mono/components';
import { useFormReducer } from '@mono/hooks/src/form';
import { required, emailValidator } from '@mono/utils/src/validators';
import messages from '../../messages';
import packageMessages from '@mono/messages';
import logo from '../../assets/logo.png';


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
  Logo
} from './styles';
import { otherColour, primitiveColors } from '@mono/theme';
import { ChipSize } from '@mono/components/src/customChip/styles';
// import { login } from '@mono/redux-global/src/actions';
import { push } from 'connected-react-router';
import { routes } from '../../myUtils';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';

const validators = {
  email: [required(packageMessages?.signIn?.errors?.email?.required), emailValidator],
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
  const {
    connectField,
    handleSubmit,
    formValues,
    submitting,
    submitError,
    setSubmitError,
  } = useFormReducer(validators);

    const reduxDispatch = useDispatch() as any;



  const onSubmit = async (data: any) =>
    new Promise<any>((resolve, reject) => {     
      reduxDispatch(
        login(
          {
            email: data?.email?.toLowerCase(),
            password: md5(data?.password),
          },
          resolve,
          reject,
        ),
      );
    }).then((res) => {        
        if(res?.data) {
        reduxDispatch(
          push(routes.twoFactorAuthentication, {
            email: data?.email,
            password: data?.password,
            method: res?.data?.method?.name,
            senderDetail: res?.data?.senderDetail,
          }),
        );
        } 
      })
      .catch((error) => {
        setSubmitError(messages?.login?.form?.errors?.[error?.message] || messages?.general?.generalError);
      });



  const handleSignUpClick = () => {
    onSignUp();
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
             <div className="flex justify-center items-center mb-[25px]">
              <Logo src={logo} alt="Logo" />
            </div>
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
