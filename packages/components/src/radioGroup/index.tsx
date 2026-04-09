import React from 'react';
import {RadioGroup } from '@mui/material';
import { brand } from '@mono/theme/style.palette.ts';
import { StyledError, StyledFormControlLabel, StyledInputContainer, StyledLabel, StyledRadio } from './styles.tsx';

export interface Option {
  id: number | string;
  label: string;
}

interface Props {
  title: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disableErrorMode?: boolean;
  isModal?:boolean;
}

const ReadioGroupInput: React.FC<Props> = ({
  title,
  options,
  value,
  onChange,
  error,
  disableErrorMode,
  isModal
}) => {
  return (
  <StyledInputContainer>
     {title && <StyledLabel isModal={isModal}>{title}</StyledLabel>}
    <RadioGroup
      row
      value={value}
      onChange={(event) => {
        if (onChange) {
          onChange(event?.currentTarget?.value);
        }
      }}
    >
      {options?.map(({ label, id }) => {
        const isActive = value === id;
        return (<StyledFormControlLabel
          key={`radio-${id}`}
          control={<StyledRadio checked={isActive}  />}
          value={id}
          label={label}
          sx={{ color: brand.black }}
          isModal={isModal}
        />
      )})}
    </RadioGroup>
    {!disableErrorMode && error && <StyledError>{error}</StyledError>}
  </StyledInputContainer>)
};

export default ReadioGroupInput;
