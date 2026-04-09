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
import ModalButtonWrapper from "../../../myComponents/ModalButtonWrapper/ModalButtonWrapper";

interface Props {
  onSuccess: (data?: any) => void;
  onCancel: () => void;
  isSetup: boolean;
  verificationActionType?: VerificationActionType;
}

const RequestMFAForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  isSetup,
  verificationActionType
}) => {
  const isEnableForm = verificationActionType === VerificationActionType.ENABLE;
  const reduxDispatch = useDispatch();
  const userProfile = useSelector((state: ReduxState) => state.profile);
  const { submitting, submitError, handleSubmit, setSubmitError } = useFormReducer();

  const onSubmitSetup = async () =>
    new Promise<any>((resolve, reject) => {
        if(submitting) {
        return
      }
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
   
        if (onSuccess) {
          onSuccess({
            method: 1,
            value: userProfile?.email,
            verificationActionType: VerificationActionType.ENABLE,
          });
        }
      })
      .catch((err) => {
        setSubmitError(err.message);
      });

  const onSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      if(submitting) {
        return
      }
      reduxDispatch(apiCall(USER_TWO_FA_AUTENTICATION, resolve, reject));
    })
      .then(async (res) =>
        new Promise<void>((resolve, reject) => {
          const sanitizedBody = {
            methodId: res?.method?.id,
            senderDetail: res?.senderDetail,
            actionType: verificationActionType,
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
            if (onSuccess) {
              onSuccess({
                method: Number(res?.method?.id),
                value: res?.senderDetail,
                verificationActionType,
              });
            }
          })
          .catch((err) => {
            setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[err?.message] || messages?.general?.generalError);
          })
      )
      .catch((err) => {
        setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[err?.message] || messages?.general?.generalError);
      });

  return (
    <Form
      onSubmit={handleSubmit(!isSetup ? onSubmitSetup : onSubmit)}
      hasPadding
    >
      <FormRow>
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {isEnableForm ? messages?.profile?.enableMFAForm?.note : messages?.profile?.disableMFAForm?.note}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <>
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
      </>
      <ModalButtonWrapper
          onCancel={onCancel || (() => {})}
            onSubmit={handleSubmit(!isSetup ? onSubmitSetup : onSubmit)}
            submitLabel={isEnableForm ? messages?.profile?.enableMFAForm?.enableMFA : messages?.profile?.disableMFAForm?.disableMFA}
            cancelLabel="Cancel"
            submitVariant="contained"
            cancelVariant="outlined"
            isSubmitting={submitting}
      />
    </Form>
  );
};

export default RequestMFAForm;
