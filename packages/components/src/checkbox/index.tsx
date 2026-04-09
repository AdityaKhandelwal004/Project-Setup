import React from "react";
import type { JSX } from "react";
import { StyledError } from "../materialTextInput/styles.tsx";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  StyledCheckBoxWrapper,
  StyledCheckImg,
  StyledLabel,
  CustomCheckboxContainer,
  CustomCheckboxInner,
} from "./styles.tsx";
import { styled } from "styled-components";
import { moduleStyles } from "@mono/utils";

// Import orange-red color from theme
const CHECKBOX_SELECTION_COLOR = "#FF4B00"; // This matches brandColors.orangeRed

const StyledCheckbox = styled(Checkbox)<{ currentModule?: string }>`
  &.MuiCheckbox-root {
    color: #e5e7eb;

    &.Mui-checked {
      color: ${({ currentModule }) =>
        currentModule
          ? moduleStyles[currentModule]?.color
          : CHECKBOX_SELECTION_COLOR} !important;
    }

    &:hover {
      background-color: ${({ currentModule }) =>
        currentModule
          ? moduleStyles[currentModule]?.bgColor
          : `${CHECKBOX_SELECTION_COLOR}10`} !important;
    }

    &.Mui-checked:hover {
      background-color: ${({ currentModule }) =>
        currentModule
          ? moduleStyles[currentModule]?.bgColor
          : `${CHECKBOX_SELECTION_COLOR}20`} !important;
    }
  }
`;

interface Props {
  label?: string | JSX.Element;
  value?: boolean;
  onChange?: any;
  error?: string;
  disableErrorMode?: boolean;
  disabled?: boolean;
  currentModule?: string;
  variant?: "default" | "custom";
  checkedColor?: string;
  uncheckedBorderColor?: string;
  innerColor?: string;
  size?: number;
  borderRadius?: number;
  innerSize?: number;
}

const CheckedIcon: React.FC<{ checked?: boolean }> = ({ checked }) => {
  return (
    <StyledCheckImg
      src={`/assets/images/${checked ? "checked.svg" : "unchecked.svg"}`}
    />
  );
};

const MuiCheckBox: React.FC<Props> = ({
  label,
  value,
  onChange,
  error,
  disableErrorMode,
  disabled,
  currentModule,
  variant = "default",
  checkedColor,
  uncheckedBorderColor,
  innerColor,
  size,
  borderRadius,
  innerSize,
}) => {
  const labelIsString = typeof label === "string";

  // Render custom checkbox variant
  if (variant === "custom") {
    return (
      <StyledCheckBoxWrapper>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CustomCheckboxContainer
            $checked={!!value}
            $checkedColor={checkedColor}
            $uncheckedBorderColor={uncheckedBorderColor}
            $size={size}
            $borderRadius={borderRadius}
            $disabled={disabled}
            onClick={() => {
              if (!disabled && onChange) {
                onChange(!value);
              }
            }}
          >
            <CustomCheckboxInner
              $checked={!!value}
              $innerColor={innerColor}
              $innerSize={innerSize}
            />
          </CustomCheckboxContainer>
          {label && (
            <div
              onClick={() => {
                if (!disabled && onChange) {
                  onChange(!value);
                }
              }}
            >
              {labelIsString ? (
                <StyledLabel variant="body2">{label}</StyledLabel>
              ) : (
                label
              )}
            </div>
          )}
        </div>
        {!disableErrorMode && error && (
          <StyledError variant="body2">{error}</StyledError>
        )}
      </StyledCheckBoxWrapper>
    );
  }

  // Render default MUI checkbox
  return (
    <StyledCheckBoxWrapper>
      <FormControlLabel
        sx={{
          marginLeft: "-8px",
          marginRight: "0px",
        }}
        disabled={disabled}
        label={
          labelIsString ? (
            <StyledLabel variant="body2">{label}</StyledLabel>
          ) : (
            label
          )
        }
        control={
          <StyledCheckbox
            // checkedIcon={<CheckedIcon checked />}
            // icon={<CheckedIcon />}
            checked={!!value}
            onChange={() => {
              if (onChange) {
                onChange(!value);
              }
            }}
            currentModule={currentModule}
          />
        }
      />
      {!disableErrorMode && error && (
        <StyledError variant="body2">{error}</StyledError>
      )}
    </StyledCheckBoxWrapper>
  );
};

export default MuiCheckBox;
