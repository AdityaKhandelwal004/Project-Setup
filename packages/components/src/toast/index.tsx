import React from 'react';
import {
  StyledToastContainer,
  StyledToastIcon,
  StyledToastInfoContainer,
  StyledToastInfoSubText,
  StyledToastInfoText,
} from './styles.tsx';

// Placeholder assets - in a real app these would come from assets
const errorToast = '';
const successToast = '';
const infoToast = '';
const warningToast = '';

interface Props {
  text?: string;
  subText?: string;
  type?: string;
}


const icons = {
  error: errorToast,
  success: successToast,
  info: infoToast,
  warning: warningToast
};


const Toast: React.FC<Props> = ({ text, subText, type = 'success' }) => (
  <StyledToastContainer type={type}>
    <StyledToastIcon
      src={icons[type]}
      alt='toast'
    />
    <StyledToastInfoContainer>
      {text && <StyledToastInfoText>{text}</StyledToastInfoText>}
      {subText && <StyledToastInfoSubText>{subText}</StyledToastInfoSubText>}
    </StyledToastInfoContainer>
  </StyledToastContainer>
);

export default Toast;
