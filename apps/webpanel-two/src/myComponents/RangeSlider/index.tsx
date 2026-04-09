import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Slider, SliderThumb } from '@mui/material';
import React from 'react';

import {
  RangeSliderContainer,
  RangeSliderHeading,
  AmountDisplay,
  AmountValue,
  AmountSeparator,
  SliderWrapper,
  SliderLabels,
} from './styles';

export interface RangeSliderProps {
  heading: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  currencySymbol?: string;
  formatValue?: (value: number) => string;
  formatMinLabel?: (value: number) => string;
  formatMaxLabel?: (value: number) => string;
  trackColor?: string;
  railColor?: string;
  className?: string;
  disabled?: boolean;
}

// Create the custom thumb component outside of render
interface CustomThumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

const CustomThumb = React.forwardRef<HTMLSpanElement, CustomThumbProps>((props, ref) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other} ref={ref as any}>
      {children}
      <NavigateBeforeOutlinedIcon />
      <NavigateNextOutlinedIcon />
    </SliderThumb>
  );
});

CustomThumb.displayName = 'CustomThumb';

const ConnectedSlider = ({ value: fieldValue, onChange, ...props }: { value: any; onChange: any; [key: string]: any }) => {
  const getSliderValue = () => {
    if (fieldValue === null || fieldValue === undefined) return 0;
    if (typeof fieldValue === 'number') return fieldValue;
    if (typeof fieldValue === 'object' && fieldValue.value !== undefined) return fieldValue.value;
    return Number(fieldValue) || 0;
  };

  const sliderValue = getSliderValue();

  return (
    <Slider
      {...props}
      value={sliderValue}
      onChange={(_, newValue) => {
        const numValue = Array.isArray(newValue) ? (newValue[0] || 0) : (newValue || 0);
        onChange(numValue);
      }}
    />
  );
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  heading,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 1,
  currencySymbol = '$',
  formatValue,
  formatMinLabel,
  formatMaxLabel,
  trackColor = '#FF4B00',
  railColor = '#FFEDE6',
  className,
  disabled = false,
}) => {
  // Default format functions
  const defaultFormatValue = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;
  
  const defaultFormatMinLabel = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;
  
  const defaultFormatMaxLabel = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;

  const displayValue = formatValue ? formatValue(value) : defaultFormatValue(value);
  const minLabel = formatMinLabel ? formatMinLabel(min) : defaultFormatMinLabel(min);
  const maxLabel = formatMaxLabel ? formatMaxLabel(max) : defaultFormatMaxLabel(max);

  const sliderStyles = {
    color: trackColor,
    height: 8,
    '& .MuiSlider-track': {
      backgroundColor: trackColor,
      border: 'none',
      height: 8,
    },
    '& .MuiSlider-rail': {
      backgroundColor: railColor,
      height: 8,
    },
    '& .MuiSlider-thumb': {
      backgroundColor: '#2D2D2D',
      border: 'none',
      width: 28,
      height: 18,
      borderRadius: '6px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'none',
      },
      '& svg': {
        fontSize: '12px',
        color: 'white',
      },
    },
  };

  return (
    <RangeSliderContainer className={className}>
      <RangeSliderHeading>{heading}</RangeSliderHeading>
      <AmountDisplay>
        <AmountValue>{displayValue}</AmountValue>
        <AmountSeparator />
        <SliderWrapper>
          <Slider
            value={value}
            onChange={(_, newValue) => {
              const numValue = Array.isArray(newValue) ? (newValue[0] || 0) : (newValue || 0);
              onChange(numValue);
            }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            sx={sliderStyles}
            slots={{
              thumb: CustomThumb,
            }}
          />
          <SliderLabels>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </SliderLabels>
        </SliderWrapper>
      </AmountDisplay>
    </RangeSliderContainer>
  );
};

export interface RangeSliderConnectedProps extends Omit<RangeSliderProps, 'value' | 'onChange'> {
  connectField: (_fieldName: string, _config: any) => (_component: any) => React.ReactNode;
  fieldName: string;
  formValues?: any;
  getValue?: (_fieldName: string) => number;
}

export const RangeSliderConnected: React.FC<RangeSliderConnectedProps> = ({
  connectField,
  fieldName,
  formValues,
  getValue,
  heading,
  min = 0,
  max = 100000,
  step = 1,
  currencySymbol = '$',
  formatValue,
  formatMinLabel,
  formatMaxLabel,
  trackColor = '#FF4B00',
  railColor = '#FFEDE6',
  className,
}) => {
  // Get current value from form
  const getFieldValue = () => {
    if (getValue) {
      return getValue(fieldName);
    }
    if (formValues && formValues[fieldName] !== undefined) {
      const value = formValues[fieldName];
      if (typeof value === 'object' && value !== null && value.value !== undefined) {
        return Number(value.value) || 0;
      }
      return Number(value) || 0;
    }
    return 0;
  };

  const currentValue = getFieldValue();

  // Default format functions
  const defaultFormatValue = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;
  
  const defaultFormatMinLabel = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;
  
  const defaultFormatMaxLabel = (val: number) => 
    `${currencySymbol}${val.toLocaleString()}`;

  const displayValue = formatValue ? formatValue(currentValue) : defaultFormatValue(currentValue);
  const minLabel = formatMinLabel ? formatMinLabel(min) : defaultFormatMinLabel(min);
  const maxLabel = formatMaxLabel ? formatMaxLabel(max) : defaultFormatMaxLabel(max);

  const sliderStyles = {
    color: trackColor,
    height: 8,
    '& .MuiSlider-track': {
      backgroundColor: trackColor,
      border: 'none',
      height: 8,
    },
    '& .MuiSlider-rail': {
      backgroundColor: railColor,
      height: 8,
    },
    '& .MuiSlider-thumb': {
      backgroundColor: '#2D2D2D',
      border: 'none',
      width: 28,
      height: 18,
      borderRadius: '6px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'none',
      },
      '& svg': {
        fontSize: '12px',
        color: 'white',
      },
    },
  };

  return (
    <RangeSliderContainer className={className}>
      <RangeSliderHeading>{heading}</RangeSliderHeading>
      <AmountDisplay>
        <AmountValue>{displayValue}</AmountValue>
        <AmountSeparator />
        <SliderWrapper>
          {connectField(fieldName, {
            min,
            max,
            step,
            sx: sliderStyles,
            slots: {
              thumb: CustomThumb,
            },
          })(ConnectedSlider)}
          <SliderLabels>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </SliderLabels>
        </SliderWrapper>
      </AmountDisplay>
    </RangeSliderContainer>
  );
};

export default RangeSlider;
