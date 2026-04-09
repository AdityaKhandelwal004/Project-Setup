import React from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { StyledDatePicker } from './styles';
import { colors } from '../../theme/style.palette';
import { StyledError, StyledInputContainer } from '../materialTextInput/styles';


interface Props {
    label?: string;
    value?: string;
    onChange?: any;
    error?: string;
    disableErrorMode?: boolean;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    dateFormat?:string;
    onReadOnlyCtaClick?: () => void;
}


const DateInput: React.FC<Props> = ({
    label,
    error,
    value,
    onChange,
    disableErrorMode,
    required,
    readOnly,
    disabled,
    fullWidth,
    dateFormat,
    onReadOnlyCtaClick,
    ...props
}) => {
   
    return (
        <StyledInputContainer>
            <StyledDatePicker
                {...props}
                label={label}
                format={dateFormat || 'DD/MM/YYYY'}
                fullWidth={fullWidth}
                disabled={disabled}
                value={value || null}
                onChange={(newValue) => {
                    if (onChange) {
                        onChange(newValue);
                    }
                }}
                slotProps={{
                    textField : {
                        required,
                        error:disableErrorMode ? undefined : !!error
                    }
                }}
                slots={{
                    openPickerIcon :()=>(
                        <CalendarMonthOutlinedIcon
                            style={{
                                color : colors.grey100
                            }}
                        />
                    ),
                }}
            />
            {!disableErrorMode && <StyledError variant='body2'>{error || ''}</StyledError>}
        </StyledInputContainer>
    )

}

export default DateInput;