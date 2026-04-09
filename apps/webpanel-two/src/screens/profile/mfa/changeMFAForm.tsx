import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormError,
  FormRow,
  FormRowItem,
  OTPInput,
  Toast,
} from '@mono/components';
import { useFormReducer } from '@mono/hooks';
import { HttpMethods, maskData } from '@mono/utils';
import messages from '../../../messages';
import { VERIFY_USER_TWO_FA_AUTHENTICATION } from '../../../api';
import { StyledResendContainer, StyledResendText, StyledSeparator, StyledUpdateMultiFactorAuthenticationNote } from '../styles';
import type { VerificationActionType } from '../../../models';
import { ToastType, type Id } from '@mono/models';
import { apiCall } from '../../../redux/actions';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  method: Id;
  value: string;
  prevMethod: Id;
  prevMethodValue: string;
  actionType: VerificationActionType;
  resendOTP?: ()=> void;
}

const ChangeMFAForm: React.FC<Props> = ({
  onSuccess,
  onCancel,
  method,
  value,
  actionType,
  prevMethod,
  prevMethodValue,
  resendOTP
}) => {
  const reduxDispatch = useDispatch();

  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [prevMethodOtpValues, setPrevMethodOtpValues] = useState<string[]>(Array(6).fill(''));

  const {
    submitting,
    submitError,
    handleSubmit,
    setSubmitError,
  } = useFormReducer();

  const onSubmit = async () => new Promise<void>((resolve, reject) => {
    if (otpValues.some((value) => value === '')) {
      reject({ message: messages?.twoFactorAuthentication?.blankOTPWarning });
    } else {
      const sanitizedBody = {
        actionType,
        methodId: method,
        senderDetail: value,
        verificationToken: prevMethodOtpValues.join(''),
        newMethodVerificationToken: otpValues.join(''),
      };
      reduxDispatch(
        apiCall(
          VERIFY_USER_TWO_FA_AUTHENTICATION,
          resolve,
          reject,
          HttpMethods.POST,
          sanitizedBody,
        ),
      );
    }
  })
    .then(() => {
      if(onSuccess)
        onSuccess();

         toast(({ closeToast }) => (
                  <Toast
                    text={messages?.profile?.updateVerifyCode?.success}
                    type={ToastType.SUCCESS}
                    closeToast={closeToast}
                  />
                ),
                {
                  closeButton: false,
                }
              );
    })
    .catch((error) => {
      setSubmitError(messages?.twoFactorAuthentication?.form?.errors?.[error?.message]);
    });

    useEffect(() => {
      setSubmitError('')
    }, [otpValues, prevMethodOtpValues])
    
    const handleResendOTP = () => {
      setPrevMethodOtpValues(Array(6).fill(''))
      setOtpValues(Array(6).fill(''))
      if(resendOTP)
        resendOTP();
      };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow width="386px">
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.updateVerifyCode?.note}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <FormRow width="386px">
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.updateVerifyCode?.deviceNote}
            {prevMethod === '1' ? messages?.profile?.updateVerifyCode?.mobile : messages?.profile?.updateVerifyCode?.email}
            {prevMethod === '1' ? `"+${maskData(prevMethodValue)}"` : `"${maskData(prevMethodValue)}"`}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <FormRow>
        <FormRowItem>
          <OTPInput
            otpValues={prevMethodOtpValues}
            setOtpValues={setPrevMethodOtpValues}
          />
        </FormRowItem>
      </FormRow>
      <FormRow>
        <FormRowItem>
          <StyledSeparator />
        </FormRowItem>
      </FormRow>
      <FormRow width="386px">
        <FormRowItem>
          <StyledUpdateMultiFactorAuthenticationNote>
            {messages?.profile?.updateVerifyCode?.deviceNote}
            {method === '1' ? 'mobile number ' : 'email address '}
            {method === '1'  ? `"+${maskData(value)}"` : `"${maskData(value)}"`}
          </StyledUpdateMultiFactorAuthenticationNote>
        </FormRowItem>
      </FormRow>
      <FormRow>
        <FormRowItem>
          <OTPInput otpValues={otpValues} setOtpValues={setOtpValues} />
        </FormRowItem>
      </FormRow>
      {submitError && (
        <FormRow maxWidth="386px">
          <FormRowItem>
            <FormError
              message={submitError || messages?.profile?.updateVerifyCode?.error?.serverError?.[submitError]}
            />
          </FormRowItem>
        </FormRow>
      )}
      <FormRow justifySelf="end" mb={0} width='fit-content'>
        <Button
          variant="contained"
          color="warning"
          onClick={onCancel}
          style={{width: 'auto'}}
          label={messages?.profile?.verifySecureCode?.cancel}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={submitting}
          style={{width: 'auto'}}
          label={messages?.profile?.verifySecureCode?.verify}
        />
      </FormRow>
      <StyledResendContainer>
        {messages?.twoFactorAuthentication?.resendText}<StyledResendText onClick={handleResendOTP} >{messages?.twoFactorAuthentication?.resend}</StyledResendText>
      </StyledResendContainer>
    </Form>
  );
};

export default ChangeMFAForm;
