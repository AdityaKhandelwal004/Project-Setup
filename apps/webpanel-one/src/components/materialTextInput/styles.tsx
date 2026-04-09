import { Typography } from '@mui/material';
import styled from 'styled-components';
import { colors } from '../../theme/style.palette';


export const StyledInputContainer = styled.div`
    width : 100%;
    min-width: 344px;
`

export const StyledError = styled(Typography)`
    color : ${colors.danger};
    margin-top:8px !important;
`