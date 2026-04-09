import { ButtonProps } from '@mui/material';
import React from 'react';
import { StyledButton } from './styles';

type ButtonCustomProps = ButtonProps & {
  onClick?: () => void;
  fullWidth?: boolean;
  label?: string;
  btnType?: string;
};

const Button = ({ label, ...props }: ButtonCustomProps) => <StyledButton {...props}>{label}</StyledButton>;

export default Button;
