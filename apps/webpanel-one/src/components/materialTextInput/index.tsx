import React from 'react';
import {  TextField, TextFieldProps } from '@mui/material';
import { StyledError, StyledInputContainer } from './styles';

interface Props {
    value?:string;
    onChange?:any;
    error?:string;
    disableErrorMode?:boolean;
}


const MaterialTextInput:React.FC<Props & TextFieldProps> = ({
    value, onChange, error, 
    disableErrorMode, 
    ...props 
})=>(
    <StyledInputContainer>
        <TextField
            {...props}
            value={value || ''}
            error={disableErrorMode? undefined : !!error}
            onChange={(event) => {
                if (onChange) {
                    onChange(event?.currentTarget?.value);
                }
            }}
              
        />
        {!disableErrorMode && error && <StyledError variant='body2'>{error}</StyledError>}
    </StyledInputContainer>
);

export default MaterialTextInput;
