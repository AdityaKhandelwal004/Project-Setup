import React from 'react';
import type { JSX } from 'react';
import type { AlertProps, Grid2Props } from '@mui/material';
import {
  StyledForm,
  StyledFormError,
  StyledFormRow,
  StyledFormRowItem,
} from './styles.tsx';
import messages from '@mono/messages';

interface FormProps {
  children?: JSX.Element | JSX.Element[];
  onSubmit?: any;
  style?: any;
  hasPadding?: boolean;
}

export const Form: React.FC<FormProps> = ({ children, ...props }) => (
  <StyledForm {...props} noValidate>
    {children}
  </StyledForm>
);

interface FormRowProps extends Grid2Props {
  children?: JSX.Element | JSX.Element[];
}

export const FormRow: React.FC<FormRowProps> = ({ children, ...props }) => (
  <StyledFormRow {...props} container>
    {children}
  </StyledFormRow>
);

interface FormRowItemProps extends Grid2Props {
  children?: JSX.Element | JSX.Element[];
}

export const FormRowItem: React.FC<FormRowItemProps> = ({
  children,
  ...props
}) => (
  <StyledFormRowItem {...props} >
    {children}
  </StyledFormRowItem>
);

interface FormErrorProps extends AlertProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, severity }) => (
  <StyledFormError severity={severity || 'error'}>
    {message || messages?.general?.errors?.serverError}
  </StyledFormError>
);
