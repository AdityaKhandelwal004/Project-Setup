import { fontFamilies, fontSize, fontWeight, greyScaleColour, otherColour } from "@mono/theme";
import { Typography } from "@mui/material";
import styled from "styled-components";

export const StyledCardContent = styled.div`
border: 1px solid ${greyScaleColour.grey15};
padding: 16px 24px;
border-radius: 10px;
display: flex;
flex-direction: column;
width: 269px;
gap: 6px;
flex: 1;
height: 100%;
`


export const StyledValue = styled(Typography)`
font-size: ${fontSize.h3} !important;
font-weight: ${fontWeight.semiBold} !important;
font-family: ${fontFamilies.secondary} !important;
`


export const StyledRowContent = styled.div`
display: flex;
align-items: center;
gap: 8px;
justify-content: space-between;
margin-top: 6px;
`

export const StyledHeadingText  = styled(Typography)`
font-size: ${fontSize.h5} !important;
font-weight: ${fontWeight.medium} !important;
font-family: ${fontFamilies.secondary} !important;
color: ${otherColour.cardText};
`
export const StyledCardContainer = styled.div`
display: flex;
gap: 24px;
align-items: center;

`

export const StyledNamecolumn = styled(Typography)`
  font-weight: ${fontWeight.semiBold} !important;
  font-size: ${fontSize.h5} !important;
  font-family: ${fontFamilies.secondary} !important;
`;



export const StyledEmailCoulmn = styled(Typography)`
  font-family: ${fontFamilies.secondary} !important;
  color: #484964;
`;


export const Avatar = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;
  `;
  

export const Header = styled(Typography)`
   font-size: ${fontSize.h2} !important;
   font-weight: ${fontWeight.medium} !important;
    margin-top: 16px;

    `;