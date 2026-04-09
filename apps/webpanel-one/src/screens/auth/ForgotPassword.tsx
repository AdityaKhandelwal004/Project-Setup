import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import messages from '../../messages';
import {
  HttpMethods, emailValidator, required, routes,
} from '../../utils';
import {
  Button,
  Container,
  Form,
  FormRow,
  FormRowItem,
  TextInput,
  Toast,
} from '../../components';
import {
  StyledFormContainer,
  StyledFormHeading,
  StyledFormSubHeading,
  StyledInfoContainer,
  StyledLink,
  StyledLinkContainer,
  StyledScreenWrapper,
} from './styles';
import { useFormReducer } from '../../hooks';
import { apiCall } from '../../redux/actions';
import { RESET_PASSWORD_REQUEST_LINK } from '../../api';
import { colors } from '../../theme/style.palette';
import SidePanel from './sidePanel';
import { fontSize } from '../../theme/style.typography';

const validators = {
  email: [
    required(messages?.login?.form?.errors?.emailRequired),
    emailValidator,
  ],
};

const ForgotPassword = () => {
  const { submitting, handleSubmit, connectField } = useFormReducer(validators);
  const reduxDispatch = useDispatch();

  const onSubmit = async (data: any) => new Promise<any>((resolve, reject) => {
    reduxDispatch(
      apiCall(
        RESET_PASSWORD_REQUEST_LINK,
        resolve,
        reject,
        HttpMethods.POST,
        { email: data?.email, type: 'LINK' },
      ),
    );
  })
    .then(() => {
      toast(() => (
        <Toast subText={messages?.forgotPassword?.form?.success} />
      ));
      setTimeout(() => {
        reduxDispatch(push(routes.login));
      }, 2000);
    })
    .catch(() => {
      toast(() => (
        <Toast subText={messages?.forgotPassword?.form?.success} />
      ));
      setTimeout(() => {
        reduxDispatch(push(routes.login));
      }, 2000);
    });

  const iconStyle = {
    color: colors.grey100,
    width: `${fontSize.h5}`,
    height: `${fontSize.h5}`,
  };

  return (
    <Container hideSidebar noMargin noPadding hasHeader={false}>
      <StyledScreenWrapper>
        <SidePanel />
        <StyledFormContainer>
          <StyledInfoContainer>
            <StyledFormHeading variant="h3">
              {messages?.forgotPassword?.heading}
            </StyledFormHeading>
            <StyledFormSubHeading>
              {messages?.forgotPassword?.subHeading}
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
            <FormRow marginTop="32px">
              <FormRowItem>
                <Button
                  fullWidth
                  btnType="secondary"
                  label={messages?.forgotPassword?.form?.submitCta}
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                />
              </FormRowItem>
            </FormRow>
            <FormRow>
              <FormRowItem justifyContent="center" alignItems="center">
                <StyledLinkContainer href={routes.login}>
                  <IconButton>
                    <ArrowBackIcon style={iconStyle} />
                  </IconButton>
                  <StyledLink>
                    {messages?.forgotPassword?.form?.logIn}
                  </StyledLink>
                </StyledLinkContainer>
              </FormRowItem>
            </FormRow>
          </Form>
        </StyledFormContainer>
      </StyledScreenWrapper>
    </Container>
  );
};

export default ForgotPassword;
