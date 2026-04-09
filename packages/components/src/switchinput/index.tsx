import { Switch, styled } from '@mui/material';
import type { SwitchProps } from '@mui/material';
import React from 'react';
import { StyledContainer, StyledError ,StyledFormControlLabel} from './styles.tsx';
import { brand, colors, otherColour, primitiveColors } from '@mono/theme/style.palette.ts';
import { StyledLabel } from '../textInput/styles.tsx';


interface IOSSwitchProps extends SwitchProps {
  labelPlacement?: "start" | "end";
  trackColor?: string
}

const IOSSwitch = styled(({ labelPlacement,trackColor, ...props }: IOSSwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, labelPlacement }) => ({
  width: 48,
  height: 26,
  padding: 0,
  margin: labelPlacement !== 'end' ? '0 12px' : '0 12px 0 0',
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(23px)',
      color: brand.white,
        '& .MuiSwitch-thumb': {
          backgroundColor: brand.white,
        },
      '& + .MuiSwitch-track': {
        backgroundColor: primitiveColors.green900,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: brand.white,
      border: `6px solid ${brand.white}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwprimitiveColorsitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    color: otherColour.switchThumb,
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    backgroundColor: otherColour.greyChip,
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
  title?: string;
  trackColor?: string
}

const SwitchInput: React.FC<Props> = ({
  label,
  error,
  value,
  onChange,
  disableErrorMode,
  readOnly,
  labelPlacement,
  title,
  trackColor,
  ...props
}) => (
  <StyledContainer>
     {title && (
            <StyledLabel style={{marginBottom: '14px'}} readOnly={readOnly}>
              {title}
            </StyledLabel>
          )}
    <StyledFormControlLabel
      {...props}
      control={<IOSSwitch checked={!!value} trackColor={trackColor} labelPlacement={labelPlacement}/>}
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
