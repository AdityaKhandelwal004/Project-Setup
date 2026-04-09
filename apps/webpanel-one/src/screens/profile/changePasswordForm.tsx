import React from "react";
import { useDispatch } from "react-redux";
import md5 from "md5";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  PasswordInput,
  Toast,
} from "@mono/components";
import { useFormReducer } from "@mono//hooks";
import {
  HttpMethods,
  confirmPassword,
  passwordValidator,
  required,
} from "@mono/utils";
import messages from "../../messages";
// import { CHANGE_PASSWORD } from "../../api";
import { apiCall } from "@mono/redux-global/src/actions";
import { CHANGE_PASSWORD } from "../../api";
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from "../auth/styles";
import { AlertCircle } from "lucide-react";
import { ToastType } from "../../models/genericEntities";
// import { ToastType } from "@mono/models";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const validators = {
  oldPassword: [
    required(messages?.profile?.changePasswordForm?.required?.oldPassword),
  ],
  newPassword: [
    required(messages?.profile?.changePasswordForm?.required?.password),
    passwordValidator,
  ],
  confirmPassword: [
    required(messages?.profile?.changePasswordForm?.required?.confirmPassword),
    confirmPassword('newPassword'),
  ],
};

const ChangePasswordForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const reduxDispatch = useDispatch();

  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    setSubmitError,
  } = useFormReducer(validators);

  const onSubmit = async (data: any) =>
    new Promise<any>((resolve, reject) => {
      const sanitizedBody: any = {
        oldPassword: md5(data?.oldPassword),
        newPassword: md5(data?.newPassword),
        confirmPassword: md5(data?.confirmPassword),
      };
      reduxDispatch(
        apiCall(
          CHANGE_PASSWORD,
          resolve,
          reject,
          HttpMethods.POST,
          sanitizedBody
        )
      );
    })
      .then(() => {
        if (onSuccess) onSuccess();

        toast(
          ({ closeToast }) => (
            <Toast
              text={messages?.profile?.changePasswordForm?.success}
              type={ToastType.SUCCESS}
            />
          ),
          {
            closeButton: false,
          }
        );
      })
      .catch((error) => {
         setSubmitError(messages?.profile?.errors?.[error?.message] || messages?.general?.generalError);
      });

  return (
    <Form 
    onSubmit={handleSubmit(onSubmit)}
    hasPadding
      maxWidth="500px">
      <FormRow>
        <FormRowItem>
          {connectField("oldPassword", {
            label: messages?.profile?.changePasswordForm?.oldPassword,
            // required: true,
            maxWidth: "350px",
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
      <FormRow>
        <FormRowItem>
          {connectField("newPassword", {
            label: messages?.profile?.changePasswordForm?.newPassword,
            // required: true,
            maxWidth: "350px",
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
      <FormRow >
        <FormRowItem>
          {connectField("confirmPassword", {
            label: messages?.profile?.changePasswordForm?.confirmNewPassword,
            // required: true,
            maxWidth: "350px",
          })(PasswordInput)}
        </FormRowItem>
      </FormRow>
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
      <FormRow marginTop="20px" justifySelf="end" width="fit-content">
        <FormRowItem>
          <Button
            variant="outlined"
            fullWidth
            label={messages?.profile?.changePasswordForm?.cancel}
            onClick={onCancel}
          />
        </FormRowItem>
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
