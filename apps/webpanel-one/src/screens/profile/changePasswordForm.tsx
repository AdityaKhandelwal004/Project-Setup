import React from 'react';
import { useDispatch } from 'react-redux';
import md5 from 'md5';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  PasswordInput,
  Toast,
} from '../../components';
import { useFormReducer } from '../../hooks';
import {
  HttpMethods,
  confirmPassword,
  passwordValidator,
  required,
} from '../../utils';
import { apiCall } from '../../redux/actions';
import messages from '../../messages';
import { CHANGE_PASSWORD } from '../../api';

interface Props {
  onSuccess: () => void;
}

const validators = {
  oldPassword: [
    required(messages?.profile?.changePasswordForm?.required?.oldPassword),
  ],
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

const ChangePasswordForm: React.FC<Props> = ({ onSuccess }) => {
  const reduxDispatch = useDispatch();

  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
  } = useFormReducer(validators);

  const onSubmit = async (data: any) => new Promise<any>((resolve, reject) => {
    const sanitizedBody: any = {
      currentPassword: md5(data?.oldPassword),
      newPassword: md5(data?.password),
    };
    reduxDispatch(
      apiCall(
        CHANGE_PASSWORD,
        resolve,
        reject,
        HttpMethods.PUT,
        sanitizedBody,
      ),
    );
  })
    .then(() => {
      onSuccess();
      toast(() => (
        <Toast subText={messages?.profile?.changePasswordForm?.success} />
      ));
    })
    .catch((error) => {
      console.log('error', error); // eslint-disable-line no-console
      setSubmitError(error?.message);
    });

  return (
    <Form style={{ maxWidth: '350px' }} onSubmit={handleSubmit(onSubmit)}>
      <FormRow marginTop="24px" marginBottom="16px">
        <FormRowItem>
          {connectField('oldPassword', {
            label: messages?.profile?.changePasswordForm?.oldPassword,
            required: true,
            maxWidth: '350px',
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
      <FormRow marginBottom="16px">
        <FormRowItem>
          {connectField('password', {
            label: messages?.profile?.changePasswordForm?.newPassword,
            required: true,
            maxWidth: '350px',
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
      <FormRow marginBottom="24px">
        <FormRowItem>
          {connectField('confirmPassword', {
            label: messages?.profile?.changePasswordForm?.confirmNewPassword,
            required: true,
            maxWidth: '350px',
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
      {submitError && (
        <FormRow>
          <FormRowItem>
            <FormError
              message={
                messages?.changePassword?.errors?.serverErrors?.[submitError]
              }
            />
          </FormRowItem>
        </FormRow>
      )}
      <FormRow marginBottom="0px">
        <FormRowItem>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            label={messages?.profile?.changePasswordForm?.buttonText}
            disabled={submitting}
          />
        </FormRowItem>
      </FormRow>
    </Form>
  );
};

export default ChangePasswordForm;
