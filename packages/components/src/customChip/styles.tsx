import { styled } from "styled-components"
import { colors, Typography } from "@mui/material"
import { brand, fontFamilies, fontSize, fontWeight, greyScaleColour } from "@mono/theme";
// import { brandColour, colors, greyScaleColour } from "@wellCheck/theme/style.palette.ts";
// import { fontSize, fontWeight } from "@wellCheck/theme/style.typography.ts";

export interface StyledChipContainerProps {
    bgColor?: string;
    textColor?: string;
    width?:string;
    radius?: string
}

export enum ChipSize {
    Large = 'large',
    Regular = 'regular'
}

export const StyledChipContainer = styled.div<StyledChipContainerProps>`
    display : flex;
    padding : 4px 8px;
    border-radius : ${({radius}) => radius ? radius : '16px'};
    width: ${({width}) => width || ""};
    background : ${({bgColor})=>bgColor || brand.primaryMain};
    gap : 10px;
    color : ${({textColor})=>textColor || greyScaleColour.grey10};
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    // margin-bottom: 20px;
`

export const StyledChipText = styled(Typography)<{chipSize?:ChipSize, customWeight?: string}>`
    font-size : ${fontSize.b1} !important;
    font-weight: ${({customWeight})=> customWeight || fontWeight.medium} !important;
    font-family: ${fontFamilies.secondary} !important;
`

export const StyledChipShowMoreContainer = styled.div`
    cursor : pointer;
`

export const StyledPopoverWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StyledPopoverContainer = styled.div`
    background-color: ${brand.white};
    padding: 32px 16px;
    padding: 16px 16px;
    border-radius: 16px;
    border: 1px solid ${colors.grey};
    max-width : 600px;
    min-width : 200px;
    max-height : 400px;
    overflow-y : auto;
    padding : 16px;
    display : flex;
    flex-direction: column;
    gap: 24px;
`

export const StyledPopoverSectionContainer = styled.div`
    display : flex;
    flex-direction: column;
    flex-wrap : wrap;
    gap : 8px;
`
export const StyledPopoverSectionHeader = styled.span`
    font-size : ${fontSize.b1};
    font-weight : ${fontWeight.semiBold};
`

export const StyledPopoverChipGroup = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 8px; 
`