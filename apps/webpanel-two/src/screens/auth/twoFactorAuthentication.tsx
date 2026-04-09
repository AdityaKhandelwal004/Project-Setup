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
  Logo,
  HeaderContainer,
} from './styles';

const validators = {};

type LocationState = {
  email?: string;
  password?: string;
  method?: string;
  senderDetail?: string;
};

function TwoFactorAuthenticationContent({ onSignIn }: { onSignIn: () => void }) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const reduxDispatch: any = useDispatch();
  const location = useLocation();
  
  const { email, password, method, senderDetail } = (location?.state ?? {}) as LocationState;
  
  const {
    handleSubmit,
    submitError,
    setSubmitError,
    submitting,
  } = useFormReducer(validators);


  const handleFormSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      if (otpValues?.some((value) => value === '')) {
        reject(new Error(messages?.twoFactorAuthentication?.blankOTPWarning));
      } else {
        reduxDispatch(
          twoFactorAuthentication(
            {
              email,
              password: md5(password),
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
                <FormTitle>
                  {messages?.twoFactorAuthentication?.heading}
                </FormTitle>
                <FormSubtitle>
                  {messages?.twoFactorAuthentication?.subHeading?.replace(
                    'email',
                    maskEmail(email || '-')
                  )}
                </FormSubtitle>
              </HeaderContainer>

              {/* Form */}
              <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
                {/* OTP Input */}
                <OtpInput otpValues={otpValues} setOtpValues={setOtpValues} />

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
                  disabled={submitting}
                  label={messages?.twoFactorAuthentication?.form?.submitCta}
                />

                {/* Back to login link */}
                <BackToLoginContainer>
                  <BackToLoginText>
                    <AuthNavLink type="button" onClick={onSignIn}>
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

export function TwoFactorAuthentication({ onSignIn }: { onSignIn: () => void }) {
  return (
    <ModuleThemeProvider module="auth">
      <TwoFactorAuthenticationContent onSignIn={onSignIn} />
    </ModuleThemeProvider>
  );
}
