import { Typography } from "@mui/material";
import { styled } from "styled-components";
import { fontFamilies, fontSize, fontWeight } from "@mono/theme/style.typography.ts";



export const StyledContainer = styled.div`

`

export const StyledInfoContainer = styled.div`
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const StyledTitle = styled(Typography)`

`


export const StyledInfo = styled(Typography)`
    font-size : ${fontSize?.h5} !important;

`

export const StyledCtaContainer = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
`