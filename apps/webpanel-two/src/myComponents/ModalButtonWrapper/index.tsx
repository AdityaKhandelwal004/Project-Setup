import React from 'react';
import Button from '@mono/components/src/button';
import { primitiveColors } from '@mono/theme';
import { StyledModalActions, StyledModalButton } from "./styles";

export interface ModalButtonWrapperProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  submitVariant?: "contained" | "outlined";
  cancelVariant?: "contained" | "outlined";
  submitType?: "button" | "submit";
  disabled?: boolean;
  submitStyle?: React.CSSProperties;
  cancelStyle?: React.CSSProperties;
  showCancel?: boolean;
}

const ModalButtonWrapper: React.FC<ModalButtonWrapperProps> = ({
  onCancel,
  onSubmit,
  submitLabel = "Update",
  cancelLabel = "Cancel",
  submitVariant = "contained",
  cancelVariant = "outlined",
  submitType = "submit",
  disabled = false,
  submitStyle,
  cancelStyle,
  showCancel = true,
}) => (
  <StyledModalActions>
    {showCancel && (
      <StyledModalButton>
        <Button
          variant={cancelVariant}
          onClick={onCancel}
          disabled={disabled}
          label={cancelLabel}
          sx={{
            ...cancelStyle,
            '&.MuiButton-outlined:hover': {
              backgroundColor: `${primitiveColors.purple800} !important`,
              color: 'white !important',
              border: `1px solid ${primitiveColors.purple800} !important`,
              boxShadow: 'none !important',
            },
            '&:hover': {
              backgroundColor: `${primitiveColors.purple800} !important`,
              color: 'white !important',
              border: `1px solid ${primitiveColors.purple800} !important`,
              boxShadow: 'none !important',
            },
          }}
        />
      </StyledModalButton>
    )}
    <StyledModalButton>
      <Button
        variant={submitVariant}
        type={submitType}
        onClick={onSubmit}
        disabled={disabled}
        label={submitLabel}
        sx={{
          ...submitStyle,
          backgroundColor: submitStyle?.backgroundColor || primitiveColors.purple800,
          '&:hover': {
            backgroundColor: primitiveColors.purple900,
          },
        }}
      />
    </StyledModalButton>
  </StyledModalActions>
);

export default ModalButtonWrapper;
