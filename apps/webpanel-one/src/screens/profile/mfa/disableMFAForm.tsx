import React from "react";
import { useDispatch } from "react-redux";
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
import { apiCall } from "../../../redux/actions";
import { StyledUpdateMultiFactorAuthenticationNote } from "../styles";
import messages from "../../../messages";
import { toast } from "react-toastify";
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
    resendOTP: () => void
    }>
  ) => void;
}

const DisableMFAForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  showVerifySecureCodeForm,
}) => {
  const reduxDispatch = useDispatch();

  const { submitting, submitError, handleSubmit, setSubmitError } = useFormReducer();

  const handleResendOTP = () => {
    if(onSubmit)
    onSubmit()
    .then(() => {
          //  toast(({ closeToast }) => (
          //         <Toast
          //           text={messages?.twoFactorAuthentication?.sentMessage}
          //           type={ToastType.SUCCESS}
          //           closeToast={closeToast}
          //         />
          //       ),
          //       {
          //         closeButton: false,
          //       }
          //     );
    })
    .catch((err) => {
            // toast(({ closeToast }) => (
            //       <Toast
            //         text={messages?.general?.errorOccur}
            //         type={ToastType.ERROR}
            //         closeToast={closeToast}
            //       />
            //     ),
            //     {
            //       closeButton: false,
            //     }
            //   );

      setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[err?.message] || messages?.general?.generalError);
    });
  }

  const onSubmit = async () => new Promise<any>((resolve, reject) => {
      reduxDispatch(apiCall(USER_TWO_FA_AUTENTICATION, resolve, reject));
    })
    
      .then(async (res) =>
        new Promise<void>((resolve, reject) => {
          const sanitizedBody = {
            methodId: Number(res?.method?.id),
            senderDetail: res?.senderDetail,
            actionType: VerificationActionType.DISABLE,
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

              //  toast(({ closeToast }) => (
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

            if(onSuccess)
             onSuccess();

            showVerifySecureCodeForm({
              method: Number(res?.method?.id),
              value: res?.senderDetail,
              verificationActionType: VerificationActionType.DISABLE,
              resendOTP: handleResendOTP
            });
          })
          .catch((err) => {
            setSubmitError(err.message);
          })
      )
      .catch((err) => {
        setSubmitError(err.message);
      });

  // })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} hasPadding hasGap>
      <FormRow >
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.disableMFAForm?.note}
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
      <FormRow justifySelf='end' width='fit-content' mb={0}>
          <Button
            variant="outlined"
            onClick={onCancel}
            style={{ width: "auto" }}
            label={messages?.profile?.disableMFAForm?.cancel}
          />
          <Button
            variant="contained"
            color="error"
            type="submit"
            disabled={submitting}
            style={{ width: "auto" }}
            label={messages?.profile?.disableMFAForm?.disableMFA}
          />
      </FormRow>
    </Form>
  );
};

export default DisableMFAForm;
