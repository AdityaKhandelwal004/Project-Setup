import React from 'react';
import { useDispatch } from 'react-redux';
import md5 from 'md5';
import { push } from 'connected-react-router';
import messages from '../../messages';
import { emailValidator, required, routes } from '../../utils';
import {
  Button,
  Container,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  PasswordInput,
  TextInput,
} from '../../components';
import {
  StyledFormContainer,
  StyledFormHeading,
  StyledFormSubHeading,
  StyledInfoContainer,
  StyledLink,
  StyledLoginChip,
  StyledScreenWrapper,
} from './styles';
import { useFormReducer } from '../../hooks';
import { login } from '../../redux/actions';
import SidePanel from './sidePanel';

const validators = {
  email: [
    required(messages?.login?.form?.errors?.emailRequired),
    emailValidator,
  ],
  password: [required(messages?.login?.form?.errors?.passwordRequired)],
};

const Login = () => {
  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
  } = useFormReducer(validators);
  const reduxDispatch = useDispatch();

  const onSubmit = async (data: any) => new Promise<any>((resolve, reject) => {
    // reduxDispatch(
    //   login(
    //     {
    //       email: data?.email,
    //       password: md5(data?.password),
    //     },
    //     resolve,
    //     reject,
    //   ),
    // );
    reduxDispatch(push(routes.dashboard.root));
  })
    .then(() => {
    })
    .catch((error) => {
      reduxDispatch(push(routes.dashboard.root));
      setSubmitError(error?.message);
    });

  return (
    <Container hideSidebar noPadding hasHeader={false} noMargin>
      <StyledScreenWrapper>
        <SidePanel />
        <StyledFormContainer>
          <StyledInfoContainer>
            <StyledFormHeading variant="h3">
              {messages?.login?.heading}
            </StyledFormHeading>
            <StyledFormSubHeading>
              {messages?.login?.subHeading}
            </StyledFormSubHeading>
          </StyledInfoContainer>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ padding: '24px 0px' }}
            hasPadding
          >
            <FormRow>
              <FormRowItem>
                {connectField('email', {
                  label: messages?.login?.form?.email,
                  required: true,
                  maxWidth: '340px',
                })(TextInput)}
              </FormRowItem>
            </FormRow>
            <FormRow marginBottom="8px">
              <FormRowItem>
                {connectField('password', {
                  label: messages?.login?.form?.password,
                  required: true,
                  maxWidth: '340px',
                })(PasswordInput)}
              </FormRowItem>
            </FormRow>
            <FormRow marginBottom="32px">
              <FormRowItem justifyContent="flex-end">
                <StyledLink href={routes.forgotPassword}>
                  {messages?.login?.form?.forgotPassword}
                </StyledLink>
              </FormRowItem>
            </FormRow>
            {submitError && (
              <FormRow>
                <FormRowItem>
                  <FormError
                    message={messages?.login?.form?.errors?.invalidDetails}
                  />
                </FormRowItem>
              </FormRow>
            )}
            <FormRow>
              <FormRowItem>
                <Button
                  fullWidth
                  btnType="secondary"
                  label={messages?.login?.form?.logIn}
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                />
              </FormRowItem>
            </FormRow>
          </Form>
        </StyledFormContainer>
      </StyledScreenWrapper>
    </Container>
  );
};

export default Login;
