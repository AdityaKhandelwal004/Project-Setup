import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ModuleThemeProvider } from '@mono/theme/providers/ModuleThemeProvider';
import { Button, OtpInput } from '@mono/components';
import { useFormReducer } from '@mono/hooks';
import { maskEmail } from '@mono/utils';
import md5 from 'md5';
import { useLocation } from 'react-router-dom';
import messages from '../../messages';
import { routes } from '../../myUtils';
import { postLogin, twoFactorAuthentication } from '../../redux/actions';
import { MethodValue } from '../../models';
import { AuthLeftSection } from './AuthLeftSection';
import logo from '../../assets/logo.png';
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
} from './styles';

const validators = {};

type LocationState = {
  email?: string;
  password?: string;
  method?: string;
  senderDetail?: string;
};

function TwoFactorAuthenticationContent() {
  
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const reduxDispatch: any = useDispatch();
  const location = useLocation();

  const onSignIn = () => {
    reduxDispatch(push(routes.login));
  };

  const { email, password, } = (location?.state ?? {}) as LocationState;

  const {
    handleSubmit,
    submitError,
    setSubmitError,
    submitting
  } = useFormReducer(validators);


  const handleFormSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      if(submitting){
        return
      }
      if (otpValues?.some((value) => value === '')) {
        reject(new Error(messages?.twoFactorAuthentication?.blankOTPWarning));
      } else {
        reduxDispatch(
          twoFactorAuthentication(
            {
              email: email?.trim()?.toLowerCase() || '',
              password: md5(password || ''),
              actionType: MethodValue.OTP,
              token: otpValues.join(''),
            },
            resolve,
            reject
          )
        );
      }
    })
      .then((res) => {
        reduxDispatch(postLogin(res?.token));
        onSignIn();
      })
      .catch((error) => {
        setSubmitError(error?.message);
      });

  useEffect(() => {
    setSubmitError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValues]);

  useEffect(() => {
    if (!email || !password) {
      onSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);



  return (
    <MainContainer>
      <ContentWrapper>
        {/* Left side */}
        <AuthLeftSection showExtraFloatingButton showEmpoweringMessage />

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
                    {messages?.twoFactorAuthentication?.heading}
                  </FormTitle>
                  <FormSubtitle>
                    {messages?.twoFactorAuthentication?.subHeading?.replace(
                      'email',
                      maskEmail(email || '-')
                    )}
                  </FormSubtitle>
                </SignupHeaderInner>
              </SignupHeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
                {/* OTP Input */}
                <div style={{display:'flex', alignItems: 'center', justifyContent : 'center'}}>
                    <OtpInput otpValues={otpValues} setOtpValues={setOtpValues} />    
                </div>
                

                {/* Submit Error Display */}
                {submitError && (
                  <ErrorContainer>
                    <ErrorContent>
                      <ErrorIcon>
                        <AlertCircle size={16} />
                      </ErrorIcon>
                      <ErrorText>
                        {messages?.twoFactorAuthentication?.form?.errors?.[submitError] ||
                          messages?.general?.generalError}
                      </ErrorText>
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
                      style={{ display: 'inline-block' }}
                    />
                  )}
                  label={messages?.twoFactorAuthentication?.form?.submitCta}
                />

                {/* Back to login link */}
                <BackToLoginContainer>
                  <BackToLoginText>
                    <AuthNavLink type="button" onClick={()=>{
                      onSignIn()
                    }}>
                      {messages?.twoFactorAuthentication?.form?.logIn}
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

export function TwoFactorAuthentication() {
  return (
    <ModuleThemeProvider module="auth">
      <TwoFactorAuthenticationContent />
    </ModuleThemeProvider>
  );
}
