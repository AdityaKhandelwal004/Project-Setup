import { useState } from 'react';
import Modal from '@mono/components/src/modal';
import deactivateModalIcon from '../../assets/deactivateModalIcon.png';
import ModalButtonWrapper from '../ModalButtonWrapper';
import { greyScaleColour } from '@mono/theme/style.palette';
import {
  StyledDeactivateModalMessage,
  StyledDeactivateButton,
} from "./styles";

interface ModalInterface {
  onClose?: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
  isActive: boolean;
}

const DeactivateAccountModal = ({ 
  onClose, 
  onSuccess, 
  description, 
  title = "Deactivate Account", 
  show = true,
  isActive = true 
}: Omit<ModalInterface, 'title' | 'isActive'> & { title?: string; show?: boolean; isActive?: boolean }) => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      await onSuccess();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      heading={title}
      headingImgSrc={deactivateModalIcon}
      headingColor={greyScaleColour.grey100}
      hasCloseIcon
    >
      <div>
        <StyledDeactivateModalMessage>{description}</StyledDeactivateModalMessage>
        <StyledDeactivateButton isActive={isActive}>
          <ModalButtonWrapper
            onCancel={onClose || (() => {})}
            onSubmit={onSubmit}
            submitLabel={isActive ? "Deactivate" : "Activate"}
            cancelLabel="Cancel"
            submitVariant="contained"
            cancelVariant="outlined"
            disabled={submitting}
          />
        </StyledDeactivateButton>
      </div>
    </Modal>
  );
};

export default DeactivateAccountModal;
