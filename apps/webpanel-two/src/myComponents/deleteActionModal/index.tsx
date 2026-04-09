import Modal from '@mono/components/src/modal';

import deleteModalIcon from '../../../public/assets/images/deleteModalIcon.png';
import ModalButtonWrapper from '../../../src/myComponents/ModalButtonWrapper/ModalButtonWrapper';

import { greyScaleColour } from '@mono/theme/style.palette';

import {
  StyledDeleteModalMessage,
  StyledDeleteButton,
} from "./styles";
import { useDispatch } from 'react-redux';
import { apiCall } from '../../redux/actions';
import { HttpMethods } from '@mono/utils';
import { toast } from 'react-toastify';
import { Toast } from '@mono/components';
import messages from '../../messages';
import { ToastType } from '../../models/genericEntities';
import { useFormReducer } from '@mono/hooks';
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorText } from '../../screens/auth/styles';
import { AlertCircle } from 'lucide-react';

interface ModalInterface {
  onClose?: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
  api: string;
  body?: unknown;
  apiMethod?: HttpMethods;
  toastText?:string;
}

const DeleteActionModal = ({ onClose, onSuccess, description, title = "Delete", show = true, api, body, apiMethod, toastText}: Omit<ModalInterface, 'title'> & { title?: string; show?: boolean }) => {

  const reduxDispatch = useDispatch() as any;

  const { submitting, submitError, handleSubmit, setSubmitError } = useFormReducer();


  const onSubmit = async () => {
     new Promise<void>((resolve, reject) => {
      reduxDispatch(
        apiCall(
          api,
          resolve,
          reject,
          apiMethod || HttpMethods.DELETE,
          body || null
        )
      );
    }).then((response) => {
      onSuccess?.();
        toast(() => (
            <Toast
              text={toastText || messages?.general?.deleteSuccess}
              type={ToastType.SUCCESS}
            />
          )
        )
      })
      .catch((err) => {
        
        setSubmitError(messages?.deleteModal?.error?.[err?.message] || messages?.general?.deleteError);
      });
  };


  return (
    <Modal
      show={show}
      onClose={onClose}
      heading={title}
      headingImgSrc={deleteModalIcon}
      headingColor={greyScaleColour.grey100}
      hasCloseIcon
    >
      <div>
        <StyledDeleteModalMessage>{description}</StyledDeleteModalMessage>
             {submitError && (
                    <ErrorContainer style={{marginTop: '24px'}}>
                      <ErrorContent>
                        <ErrorIcon>
                          <AlertCircle size={16} />
                        </ErrorIcon>
                        <ErrorText>{submitError}</ErrorText>
                      </ErrorContent>
                    </ErrorContainer>
                  )}
        <StyledDeleteButton>
          <ModalButtonWrapper
            onCancel={onClose || (() => {})}
            onSubmit={onSubmit}
            submitLabel="Delete"
            cancelLabel="Cancel"
            submitVariant="contained"
            cancelVariant="outlined"
            disabled={submitting}
          />
        </StyledDeleteButton>
      </div>
    </Modal>
  );
};

export default DeleteActionModal;
