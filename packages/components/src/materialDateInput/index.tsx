import React, { useCallback, useRef, useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { StyledDatePicker, ClearButton } from './styles.tsx';
import { StyledContainer, StyledError, StyledInputContainer, StyledLabel, StyledOptionalLabel, StyledSuccess, StyledSuccessIcon } from '../textInput/styles.tsx';
import moment from 'moment';

import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { inputSizes } from '@mono/theme/style.layout.ts';
import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
  label?: string;
  title?: string;
  value?: string | null;
  onChange?: (newValue: string | null) => void;
  error?: string;
  success?: string;
  disableErrorMode?: boolean;
  disableSuccessMode?: boolean;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  maxWidth?: string;
  inputSize?: 'small' | 'medium' | 'large' | 'full';
  dateFormat?: string;
  onReadOnlyCtaClick?: () => void;
  minDate?: any;
  maxDate?: any;
  enableClearable?: boolean;
  isAuth?: boolean;
  isModal?: boolean;
  showOptionalLabel?: boolean;
}
const DateInput: React.FC<Props> = ({
  label,
  title,
  error,
  success,
  value,
  onChange,
  disableErrorMode,
  disableSuccessMode,
  required,
  maxWidth,
  inputSize,
  readOnly,
  disabled,
  fullWidth,
  dateFormat,
  onReadOnlyCtaClick,
  minDate,
  maxDate,
  enableClearable = true,
  isAuth = false,
  isModal,
  showOptionalLabel = false,
  ...props
}) => {
  const [clearKey, setClearKey] = useState(0);

  // Force re-render when value is reset to null/empty from outside
  useEffect(() => {
    if (!value || value === '' || value === null) {
      setClearKey(prev => prev + 1);
    }
  }, [value]);

  const handleChange = useCallback(
    (newValue: any) => {
      if (onChange) {
        const dateString = newValue && newValue.isValid && newValue.isValid() ? newValue.format('YYYY-MM-DD') : newValue;
     
        onChange(dateString);
      }
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (onChange) {
        handleChange(null);
        setClearKey(prev => prev + 1);
      }
    },
    [onChange, value, handleChange]
  );
  return (
  <StyledInputContainer>
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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <StyledDatePicker
            {...props}
            key={clearKey}
            closeOnSelect
            label={label}
            format={dateFormat || 'DD/MM/YYYY'}
            // fullWidth={fullWidth}
            disabled={disabled}
            isAuth={isAuth}
            value={value && value !== '' && value !== null && value !== undefined && moment(value, dateFormat || 'YYYY-MM-DD').isValid() ? moment(value, dateFormat || 'YYYY-MM-DD') : null}
            onChange={handleChange}
            minDate={minDate && moment(minDate).isValid() ? moment(minDate) : undefined}
            maxDate={maxDate && moment(maxDate).isValid() ? moment(maxDate) : undefined}
            slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
            slotProps={{
              textField: {
                required,
                error: disableErrorMode ? undefined : !!error,
                fullWidth: fullWidth,
              },
            }}
          />
          {enableClearable && value && value !== '' && value !== null && value !== undefined && !disabled && (
            <ClearButton onClick={handleClear} type="button">
              <CloseIcon fontSize="small" />
            </ClearButton>
          )}
        </div>
      </LocalizationProvider>
      {!disableErrorMode && (
        <StyledError variant="body2">{error || ''}</StyledError>
      )}
    </StyledInputContainer>
  );
};
export default DateInput;