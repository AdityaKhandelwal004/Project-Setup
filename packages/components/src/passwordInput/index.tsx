import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  StyledContainer,
  StyledError,
  StyledInputContainer,
  StyledLabel,
  StyledSuccess,
  StyledSuccessIcon,
  StyledTextField,
} from "../textInput/styles.tsx";
import { colors, greyScaleColour } from "@mono/theme/style.palette.ts";
import { inputSizes } from "@mono/theme/style.layout.ts";

interface Props {
  value?: string;
  onChange?: any;
  error?: string;
  success?: string;
  disableErrorMode?: boolean;
  disableSuccessMode?: boolean;
  label?: string;
  title?: string;
  maxWidth?: string;
  inputSize?: "small" | "medium" | "large" | "full";
  isHeader?: boolean;
  isAuth?: boolean;
}

const PasswordInput: React.FC<Props> = ({
  value,
  onChange,
  error,
  success,
  disableErrorMode,
  disableSuccessMode,
  maxWidth,
  inputSize,
  isHeader,
  title,
  isAuth=false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const iconStyle = {
    color: greyScaleColour.grey60,
  };
  return (
    <StyledContainer>
      {title && <StyledLabel isAuth={isAuth}>{title}</StyledLabel>}
      <StyledInputContainer
        maxWidth={
          maxWidth || (inputSize ? inputSizes[inputSize] : inputSizes.full)
        }
        isHeader={isHeader}
      >
        <StyledTextField
          {...props}
          value={value || ""}
          error={disableErrorMode ? undefined : !!error}
          onChange={(event: any) => {
            if (onChange) {
              onChange(event?.currentTarget?.value);
            }
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={togglePassword}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? (
                    <VisibilityOutlined style={iconStyle} />
                  ) : (
                    <VisibilityOffOutlined style={iconStyle} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!disableErrorMode && error && (
          <StyledError variant="body2">{error}</StyledError>
        )}
        {!disableSuccessMode && !error && success && (
          <StyledSuccess variant="body2">
            <StyledSuccessIcon />
            {success}
          </StyledSuccess>
        )}
      </StyledInputContainer>
    </StyledContainer>
  );
};

export default PasswordInput;
