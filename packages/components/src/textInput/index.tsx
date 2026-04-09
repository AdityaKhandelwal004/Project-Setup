import React from "react";
import {
  StyledContainer,
  StyledError,
  StyledInputContainer,
  StyledInputText,
  StyledLabel,
  StyledOptionalLabel,
  StyledSuccess,
  StyledSuccessIcon,
  StyledTextField,
} from "./styles.tsx";
import { inputSizes } from "@mono/theme/style.layout.ts";
interface Props {
  label?: string;
  value?: string;
  title?: string;
  onChange?: any;
  error?: string;
  success?: string;
  disableErrorMode?: boolean;
  disableSuccessMode?: boolean;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minWidth?: string;
  maxWidth?: string;
  inputSize?: "small" | "medium" | "large" | "full";
  onReadOnlyCtaClick?: () => void;
  isModal?:boolean;
  isDollar?: boolean;
  isAuth?: boolean;
  className?: string;
  showOptionalLabel?: boolean;
}
const TextInput: React.FC<Props> = ({
  label,
  error,
  success,
  value,
  onChange,
  disableErrorMode,
  disableSuccessMode,
  maxWidth,
  inputSize,
  onReadOnlyCtaClick,
  title,
  readOnly,
  required,
  disabled,
  minWidth,
  placeholder,
  isModal=false,
  isDollar=false,
  isAuth=false,
  className,
  showOptionalLabel = false,
  ...props
}) => {
  return (
    <StyledContainer className={className}>
      {title && (
          <StyledLabel
            readOnly={readOnly}
            required={required}
            disabled={disabled}
            isModal={isModal}
            isAuth={isAuth}
          >
            {title}
             {showOptionalLabel && <StyledOptionalLabel>(optional)</StyledOptionalLabel>}
          </StyledLabel>
      )}
      <StyledInputContainer
        minWidth={minWidth}
        maxWidth={
          maxWidth || (inputSize ? inputSizes[inputSize] : inputSizes.full)
        }
        isAuth={isAuth}
      >
        {readOnly ? (
          <StyledInputText
            onClick={onReadOnlyCtaClick}
            disabled={disabled}
            variant="body2"
          >
            {value || ""}
          </StyledInputText>
        ) : (
          <StyledTextField
            {...props}
            disabled={disabled}
            label={label}
            placeholder={placeholder}
            error={disableErrorMode ? false : !!error}
            value={value || ""}
            isDollar={isDollar}
            isAuth={isAuth}
            onChange={(event) => {
              if (onChange) {
                onChange(event?.currentTarget?.value);
              }
            }}
          />
        )}
      </StyledInputContainer>
      {!disableErrorMode && error && (
        <StyledError variant="body2">{error}</StyledError>
      )}
      {!disableSuccessMode && !error && success && (
        <StyledSuccess variant="body2">
          <StyledSuccessIcon />
          {success}
        </StyledSuccess>
      )}
    </StyledContainer>
  );
};
export default TextInput;
