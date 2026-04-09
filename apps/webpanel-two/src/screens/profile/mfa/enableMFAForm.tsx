import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  Toast,
} from "@mono/components";
import { useFormReducer } from "@mono/hooks";
import { HttpMethods } from "@mono/utils";
import { VerificationActionType, type Id } from "@mono/models";
import messages from "../../../messages";
import { StyledUpdateMultiFactorAuthenticationNote } from "../styles";
import { toast } from "react-toastify";
import { apiCall } from "../../../redux/actions";
import type { ReduxState } from "../../../redux/reducers";
import { USER_TWO_FA_AUTENTICATION } from "../../../api";
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from "../../auth/styles";
import { AlertCircle } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  showVerifySecureCodeForm: (
    metaData?: Partial<{
      method: Id;
      value: string;
      verificationActionType: VerificationActionType;
      resendOTP: () => void;
    }>
  ) => void;
  isSetup: boolean;
}

const EnableMFAForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  showVerifySecureCodeForm,
  isSetup,
}) => {
  const reduxDispatch = useDispatch();

  const userProfile = useSelector((state: ReduxState) => state.profile);

  const { submitting, submitError, handleSubmit, setSubmitError } =
    useFormReducer();

  const handleResendOTP = () => {
    onSubmit()
      .then(() => {
        // toast(
        //   ({ closeToast }) => (
        //     <Toast
        //       text={messages?.twoFactorAuthentication?.sentMessage}
        //       type={ToastType.SUCCESS}
        //       closeToast={closeToast}
        //     />
        //   ),
        //   {
        //     closeButton: false,
        //   }
        // );
      })
      .catch((err) => {
        // toast(
        //   ({ closeToast }) => (
        //     <Toast
        //       text={messages?.general?.errorOccur}
        //       type={ToastType.ERROR}
        //       closeToast={closeToast}
        //     />
        //   ),
        //   {
        //     closeButton: false,
        //   }
        // );
        setSubmitError(err.message);
      });
  };

  const onSubmitSetup = async () =>
    new Promise<any>((resolve, reject) => {
      const sanitizedBody = {
        methodId: 1,
        senderDetail: userProfile?.email,
      };
      reduxDispatch(
        apiCall(
          USER_TWO_FA_AUTENTICATION,
          resolve,
          reject,
          HttpMethods.POST,
          sanitizedBody
        )
      );
    })
      .then((res) => {
        // toast(
        //   ({ closeToast }) => (
        //     <Toast
        //       text={messages?.twoFactorAuthentication?.sentMessage}
        //       type={ToastType.SUCCESS}
        //       closeToast={closeToast}
        //     />
        //   ),
        //   {
        //     closeButton: false,
        //   }
        // );

        if (onSuccess) onSuccess();

        showVerifySecureCodeForm({
          method: 1,
          value: userProfile?.email,
          verificationActionType: VerificationActionType.ENABLE,
          resendOTP: handleResendOTP,
        });
      })
      .catch((err) => {
        setSubmitError(err.message);
      });

  const onSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      reduxDispatch(apiCall(USER_TWO_FA_AUTENTICATION, resolve, reject));
    })
      .then(async (res) =>
        new Promise<void>((resolve, reject) => {
          const sanitizedBody = {
            methodId: res?.method?.id,
            senderDetail: res?.senderDetail,
            actionType: VerificationActionType.ENABLE,
          };
          reduxDispatch(
            apiCall(
              USER_TWO_FA_AUTENTICATION,
              resolve,
              reject,
              HttpMethods.POST,
              sanitizedBody
            )
          );
        })
          .then(() => {
            // toast(
            //   ({ closeToast }) => (
            //     <Toast
            //       text={messages?.twoFactorAuthentication?.sentMessage}
            //       type={ToastType.SUCCESS}
            //       closeToast={closeToast}
            //     />
            //   ),
            //   {
            //     closeButton: false,
            //   }
            // );
            if (onSuccess) onSuccess();

            showVerifySecureCodeForm({
              method: Number(res?.method?.id),
              value: res?.senderDetail,
              verificationActionType: VerificationActionType.ENABLE,
              resendOTP: handleResendOTP,
            });
          })
          .catch((err) => {
             setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[err?.message] || messages?.general?.generalError);
          })
      )
      .catch((err) => {
        setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[err?.message] || messages?.general?.generalError);
      });

  return (
    <Form onSubmit={handleSubmit(!isSetup ? onSubmitSetup : onSubmit)} hasPadding hasGap>
      <FormRow>
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.enableMFAForm?.note}
          </StyledUpdateMultiFactorAuthenticationNote>
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
      <FormRow justifySelf="end" width="fit-content" mb={0}>
        <Button
          variant="outlined"
          onClick={onCancel}
          style={{ width: "auto" }}
          label={messages?.profile?.enableMFAForm?.cancel}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={submitting}
          style={{ width: "auto" }}
          label={messages?.profile?.enableMFAForm?.enableMFA}
        />
      </FormRow>
    </Form>
  );
};

export default EnableMFAForm;
