import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  // PhoneInput,
  TextInput,
  Toast,
} from '@mono/components';
import { useFormReducer } from '@mono/hooks';
import {
  emailValidator,
  HttpMethods,
  // phoneValidator,
  required,
  trimWordWrapper,
} from '@mono/utils';
import { type Id, VerificationActionType } from '@mono/models';
import { apiCall, USER_TWO_FA_AUTENTICATION, TWO_FA_AUTHENTICATION_METHOD } from '../../../redux/actions';
import messages from '../../../messages';
import { toast } from 'react-toastify';
import type { UserProfile } from '../../../models';
import { StyledUpdateMultiFactorAuthenticationNote } from '../styles';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  showUpdateMFAForm: (
    metaData?: Partial<{
    method: Id;
    value: string;
    verificationActionType: VerificationActionType;
    prevMethod: Id;
    prevMethodValue: string;
    resendOTP?: () => void;
    }>
  ) => void;
  isEnable?: boolean;
  userProfile?: UserProfile
}

interface FormData{
  methodId: Id;
  mobile?: string;
  email?: string;
  value: any;
}

const validators = {
  email: [required(messages?.login?.form?.errors?.emailRequired), emailValidator]
};

const UpdateMultiFactorAuthenticationForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  showUpdateMFAForm,
  isEnable,
  userProfile
  
}) => {
  const reduxDispatch = useDispatch();
  const [twoFaMethods, setTwoFaMethods] = useState<Array<{
    id: Id;
    name: 'Mobile' | 'Email';
    code: 'SMS' | 'EMAIL';
    }>>([]);

  const {
    submitting,
    submitError,
    handleSubmit,
    connectField,
    change,
    formValues,
    setSubmitError,
  } = useFormReducer(validators);

  const handleResendOTP = () => {
    return onSubmit(formValues?.mobile)
      .then(() => {
        toast(() => (
          <Toast subText= {messages?.twoFactorAuthentication?.sentMessage} />
        ));
      })
      .catch((err) => {
        setSubmitError(err.message);
      });
  };
  
  const onSubmit = async (data: FormData) => {
    // return new Promise((resolve, reject) => {
    //   const methodId = twoFaMethods?.find((item) => item?.name?.toLowerCase() === messages?.twoFactorAuthentication?.mobile)?.id;
    //   const sanitizedMobile = data?.mobile || data?.value;
        
    //   const modifySanitizedBody = {
    //     methodId,
    //     senderDetail: trimWordWrapper(sanitizedMobile?.replace("-", "")),
    //     actionType: VerificationActionType.MODIFY,
    //   };
  
    //   const setupModifyBody = {
    //     methodId,
    //     senderDetail: trimWordWrapper(sanitizedMobile?.replace("-", ""))
    //   };
  
    //   reduxDispatch(
    //     apiCall(
    //       USER_TWO_FA_AUTENTICATION,
    //       resolve,
    //       reject,
    //       HttpMethods.POST,
    //       isEnable ? setupModifyBody : modifySanitizedBody
    //     )
    //   );
    // })
    //   .then(async (res: any) => {
        onSuccess();
        showUpdateMFAForm({
          // method: twoFaMethods?.find((item) => item?.name?.toLowerCase() === messages?.twoFactorAuthentication?.mobile)?.id,
          // value: trimWordWrapper(data?.mobile?.replace("-", "")),
          // verificationActionType: isEnable ? VerificationActionType.SETUP : VerificationActionType.MODIFY,
          // prevMethod: !isEnable && res?.method?.id,
          // prevMethodValue: !isEnable && res?.senderDetail,
          // resendOTP: handleResendOTP,

           method: '1',
            value: 'abc',
            verificationActionType: VerificationActionType.DISABLE,
            prevMethod: '1',
            prevMethodValue: 'abc',
            resendOTP: handleResendOTP
        });
      // })
      // .catch((error) => {
      //   setSubmitError(error?.message);
      // });
  };

  // useEffect(() => {
  //   if(isEnable)
  //   change('mobile', userProfile?.mobile)
  //   reduxDispatch(
  //     apiCall(
  //       TWO_FA_AUTHENTICATION_METHOD,
  //       (res) => {
  //         if (res) {
  //           setTwoFaMethods(res);
  //         }
  //       },
  //       (err) => err,
  //     ),
  //   );
  // }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow >
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.updateMultiFactorAuthentication?.note}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <FormRow mb={3}>
        <FormRowItem>
          {connectField('email', {
          label: messages?.profile?.editForm?.emailAddress,
          required: true,
        })(TextInput)}
        </FormRowItem>
      </FormRow>
      {submitError && (
        <FormRow>
          <FormRowItem>
            <FormError
              message={messages?.profile?.form?.errors?.serverErrors?.[submitError]}
            />
          </FormRowItem>
        </FormRow>
      )}
      <FormRow justifySelf="end" mb={0} width='fit-content'>
        <Button
          variant="outlined"
          onClick={onCancel}
          style={{width: 'auto'}}
          label={messages?.general?.cancel}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={submitting}
          style={{width: 'auto'}}
          label={messages?.general?.[isEnable ? 'setup' : 'update']}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateMultiFactorAuthenticationForm;
