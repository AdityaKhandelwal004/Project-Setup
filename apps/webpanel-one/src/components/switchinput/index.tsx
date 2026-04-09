import { Switch, SwitchProps, styled } from '@mui/material';
import React from 'react';
import { StyledContainer, StyledError } from './styles';
import { StyledFormControlLabel } from '../layout/sidebar/styles';
import { brand, colors } from '../../theme/style.palette';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 26,
  padding: 0,
  marginLeft: 12,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(23px)',
      color: colors.white,
      '& + .MuiSwitch-track': {
        backgroundColor: brand.primaryMain,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: brand.primaryMain,
      border: `6px solid ${colors.white}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface Props {
  label?: string;
  value?: string;
  onChange?: any;
  error?: string;
  disableErrorMode?: boolean;
  required?: boolean;
  readOnly?: boolean;
  labelPlacement?:'end' | 'start' | 'top' | 'bottom';
}

const SwitchInput: React.FC<Props> = ({
  label,
  error,
  value,
  onChange,
  disableErrorMode,
  readOnly,
  labelPlacement,
  ...props
}) => (
  <StyledContainer>
    <StyledFormControlLabel
      {...props}
      control={<IOSSwitch checked={!!value} />}
      label={label}
      labelPlacement={labelPlacement || "start"}
      onChange={() => {
        if (onChange && !readOnly) {
          onChange(!value);
        }
      }}
    />
    {!disableErrorMode && (
      <StyledError variant="body2">{error || ''}</StyledError>
    )}
  </StyledContainer>
);

export default SwitchInput;
