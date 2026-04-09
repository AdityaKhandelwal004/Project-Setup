import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  OtpInput,
  Toast,
} from "@mono/components";
import { useFormReducer } from "@mono/hooks";
import { HttpMethods, maskEmail } from "@mono/utils";
import { type Id, ToastType, VerificationActionType } from "@mono/models";
import messages from "../../../messages";
import { StyledUpdateMultiFactorAuthenticationNote } from "../styles";
import { apiCall } from "../../../redux/actions";
import { fontWeight } from "@mono/theme/style.typography";
import { toast } from "react-toastify";
// import { ToastType } from "../../../models/genericEntities";
import { VERIFY_USER_TWO_FA_AUTHENTICATION } from "../../../api";
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from "../../auth/styles";
import { AlertCircle } from "lucide-react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  method: Id;
  value: string;
  actionType: VerificationActionType;
  showRecoveryCodeForm: (metaData?: Partial<unknown>) => void;
  resendOTP?: () => void;
}

const validators = {};

const VerifySecureCodeForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  method,
  value,
  actionType,
  showRecoveryCodeForm,
  resendOTP,
}) => {
  const reduxDispatch = useDispatch();

  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

  const { submitting, submitError, handleSubmit, setSubmitError } =
    useFormReducer(validators);

  const onSubmit = async () =>
    new Promise<any>((resolve, reject) => {
      if (otpValues?.some((value) => value === "")) {
        reject({ message: messages?.twoFactorAuthentication?.blankOTPWarning });
      } else {
        const sanitizedBody = {
          actionType,
          methodId: method,
          senderDetail: value,
          verificationToken: otpValues?.join(""),
        };
        reduxDispatch(
          apiCall(
            VERIFY_USER_TWO_FA_AUTHENTICATION,
            resolve,
            reject,
            HttpMethods.POST,
            sanitizedBody
          )
        );
      }
    })
      .then((res) => {
        if (onSuccess) onSuccess();

        toast(
          ({ closeToast }) => (
            <Toast
              text={messages?.general?.verified?.replace(
                "action",
                actionType === VerificationActionType.DISABLE
                  ? "disabled"
                  : "enabled"
              )}
              type={ToastType.SUCCESS}
            />
          ),
          {
            closeButton: false,
          }
        );
      })
      .catch((error) => {
        setSubmitError(
          messages?.twoFactorAuthentication?.form?.errors?.[error?.message] || messages?.general?.generalError);
      });

  useEffect(() => {
    setSubmitError("");
  }, [otpValues]);

  const handleResendOTP = () => {
    setOtpValues(Array(6).fill(""));
    if (resendOTP) resendOTP();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} hasPadding hasGap>
      <FormRow>
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote
            fontWeight={`${fontWeight.semiBold} !important`}
          >
            {messages?.profile?.verifySecureCode?.note
              ?.replace("email", maskEmail(value))
              ?.replace(
                "disabling",
                actionType === VerificationActionType.ENABLE
                  ? "enabling"
                  : "disabling"
              )}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <FormRow>
        <FormRowItem>
          <OtpInput otpValues={otpValues} setOtpValues={setOtpValues} />
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
          label={messages?.profile?.verifySecureCode?.cancel}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={submitting}
          style={{ width: "auto" }}
          label={messages?.profile?.verifySecureCode?.verify}
        />
      </FormRow>
      {/* <StyledResendContainer>
        {messages?.twoFactorAuthentication?.resendText}<StyledResendText onClick={handleResendOTP} >{messages?.twoFactorAuthentication?.resend}</StyledResendText>
      </StyledResendContainer> */}
    </Form>
  );
};

export default VerifySecureCodeForm;
