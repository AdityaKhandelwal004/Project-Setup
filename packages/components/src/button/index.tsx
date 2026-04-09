import type { ButtonProps } from '@mui/material';
import React from 'react';
import { StyledButton, StyledIcon } from './styles.tsx';

type ButtonCustomProps = ButtonProps & {
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  label?: string;
  img?: string;
  isImg?: boolean;
  isJsx?: boolean;
  JsxImg?: any;
  isJsxRight?:boolean;
  imgRight?: boolean;
};

const Button = ({ label, size, isJsx,JsxImg ,img,isJsxRight,imgRight, ...props }: ButtonCustomProps) => (
  <StyledButton isImg {...props} addMinPadding size={size}>
    {img && !imgRight && <StyledIcon src={img} />}
    {isJsx && <JsxImg />}
    {label}
    {isJsxRight && <JsxImg />}
    {img && imgRight && <StyledIcon src={img} />}
  </StyledButton>
);

export default Button;
