import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { ModuleThemeProvider } from '@mono/theme/providers/ModuleThemeProvider';
import { toast } from 'react-toastify';
import { Toast } from '@mono/components';
import { ToastType } from '@mono/models';
import messages from '../../messages';
import { routes } from '../../myUtils';
import { apiCall, } from '../../redux/actions';
import { VERIFY_EMAIL } from '../../api';
import {
  MainContainer,
} from './styles';
import { HttpMethods } from '@mono/utils';
import { sanitizeServerError } from '../../myUtils/commonFunctions';
import { LoaderStructure } from '../../myComponents/CustomLoader';
import StepCompletionToast, { successToastConfig, toastSuccessMessages, ToastVariants } from '../../myComponents/stepCompletionToast';

function VerifyEmailContent() {
  const reduxDispatch: any = useDispatch();
  const { token } = useParams<{ token: string }>();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (!token) {
      toast(() => (
        <Toast
          text={messages?.verifyEmail?.invalidToken || 'Invalid verification token'}
          type={ToastType.ERROR}
        />
      ));

      // Redirect to login immediately
      reduxDispatch(push(routes.login));
      return;
    }

    reduxDispatch(
      apiCall(
        VERIFY_EMAIL,
        (res) => {


          toast(
            <StepCompletionToast
              variant={ToastVariants.PURPLE}
              title={toastSuccessMessages.emailVerified?.title}
              message={toastSuccessMessages.emailVerified?.message}

            />,
            successToastConfig as any
          );
          reduxDispatch(push(routes.overview));


        },
        (error) => {


          const errorMsg = sanitizeServerError(messages?.verifyEmail?.error)
          toast(() => (
            <Toast
              text={errorMsg}
              type={ToastType.ERROR}
            />
          ));
          reduxDispatch(push(routes.login));

        },
        HttpMethods.POST,
        { token }
      )
    );
  }, []);

  return (
    <MainContainer>
      <LoaderStructure />
    </MainContainer>
  );
}

export function VerifyEmail() {
  return (
    <ModuleThemeProvider module="auth">
      <VerifyEmailContent />
    </ModuleThemeProvider>
  );
}
