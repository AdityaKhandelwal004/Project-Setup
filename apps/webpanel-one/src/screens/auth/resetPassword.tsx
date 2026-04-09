import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import md5 from 'md5';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import messages from '../../messages';
import {
  HttpMethods,
  confirmPassword,
  passwordValidator,
  required,
  routes,
} from '../../utils';
import {
  Button,
  Container,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  PasswordInput,
  Toast,
} from '../../components';
import {
  StyledFormContainer,
  StyledFormHeading,
  StyledFormSubHeading,
  StyledInfoContainer,
  StyledScreenWrapper,
} from './styles';
import { useFormReducer } from '../../hooks';
import { apiCall } from '../../redux/actions';
import { RESET_PASSWORD } from '../../api';
import SidePanel from './sidePanel';

const validators = {
  password: [
    required(messages?.profile?.changePasswordForm?.required?.password),
    passwordValidator,
  ],
  confirmPassword: [
    required(messages?.profile?.changePasswordForm?.required?.confirmPassword),
    confirmPassword(
      messages?.profile?.changePasswordForm?.required?.passwordNotMatched,
    ),
  ],
};

const ResetPassword = () => {
  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
  } = useFormReducer(validators);
  const reduxDispatch = useDispatch();
  const { token } = useParams<{ token?: string }>();

  const onSubmit = async (data: any) => new Promise<any>((resolve, reject) => {
    const sanitizedBody = {
      token,
      confirmPassword: md5(data.confirmPassword),
      password: md5(data.password),
    };
    reduxDispatch(
      apiCall(RESET_PASSWORD, resolve, reject, HttpMethods.PUT, sanitizedBody),
    );
  })
    .then(() => {
      toast(() => (
        <Toast subText={messages?.profile?.changePasswordForm?.success} />
      ));
      setTimeout(() => {
        reduxDispatch(push(routes.login));
      }, 2000);
    })
    .catch((error) => {
      setSubmitError(error?.message);
    });

  return (
    <Container hideSidebar noMargin noPadding hasHeader={false}>
      <StyledScreenWrapper>
        <SidePanel />
        <StyledFormContainer>
          <StyledInfoContainer>
            <StyledFormHeading>
              {messages?.resetPassword?.heading}
            </StyledFormHeading>
            <StyledFormSubHeading>
              {messages?.resetPassword?.subHeading}
            </StyledFormSubHeading>
          </StyledInfoContainer>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '24px 0px', maxWidth: '340px' }}
            hasPadding
          >
            <FormRow>
              <FormRowItem>
                {connectField('password', {
                  label: messages?.resetPassword?.form?.newPassword,
                  required: true,
                  maxWidth: '340px',
                })(PasswordInput)}
              </FormRowItem>
            </FormRow>
            <FormRow>
              <FormRowItem>
                {connectField('confirmPassword', {
                  label: messages?.resetPassword?.form?.confirmNewPassword,
                  required: true,
                  maxWidth: '340px',
                })(PasswordInput)}
              </FormRowItem>
            </FormRow>
            {submitError && (
              <FormRow>
                <FormRowItem>
                  <FormError
                    message={
                      messages?.resetPassword?.form?.errors?.invalidDetails
                    }
                  />
                </FormRowItem>
              </FormRow>
            )}
            <FormRow marginTop="32px">
              <FormRowItem>
                <Button
                  fullWidth
                  btnType="secondary"
                  label={messages?.resetPassword?.form?.submitCta}
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                />
              </FormRowItem>
            </FormRow>
          </Form>
        </StyledFormContainer>
      </StyledScreenWrapper>
    </Container>
  );
};

export default ResetPassword;
