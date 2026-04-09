import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "styled-components";


export const StyledDatePicker = styled(DatePicker)<{fullWidth?:boolean; }>`

    .MuiInputBase-input{
        width : 100%;
        min-width: 344px;
    }
   
`