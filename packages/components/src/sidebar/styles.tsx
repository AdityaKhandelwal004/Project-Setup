import { brand, colors, fontFamilies, fontSize, fontWeight, greyScaleColour, primitiveColors } from "@mono/theme"
import { css, styled } from "styled-components"
import { Link } from "react-router-dom"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export const StyledContainer = styled.div<{sidebarOpen:boolean}>`
    width:${({sidebarOpen})=> sidebarOpen ? 264 : 112}px;
    min-height: calc(100vh - 32px);
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-right: 1px solid ${greyScaleColour.grey15};
`

export const StyledLogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 16px;
    border-radius: 22px;
    background-color: ${colors.white};
`

export const StyledMenuContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    border-radius: 22px;
    background-color: ${colors.white};
    flex-direction: column;
    margin-top : 24px;
    flex : 1;
    // padding-top: 56px;
    position:relative;
`

export const StyledLogo = styled.img`

`

export const StyledMenuListContainer = styled.div`
    display: flex;
    flex : 1;
    flex-direction: column;
    gap: 16px;
`

export const StyledMenuListItemContainer = styled(Link)<{active?:boolean, sidebarOpen?:boolean}>`
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    padding : 12px 16px;
    border-radius: 10px;
    color : ${greyScaleColour.grey100};
    font-size : ${fontSize.b1};
    font-weight : ${fontWeight.medium};
    &:hover {
        background-color: ${({active}) => !active &&'rgba(0, 0, 0, 0.04)'};
    }
    ${({active})=>active && css`
        background: ${primitiveColors.midNight};
        color : ${colors.white};
        font-weight : ${fontWeight.semiBold} !important;
    `}
    ${({sidebarOpen})=>!sidebarOpen && css`
        padding : 12px 24px;
        justify-content: center;
    `}

`

export const StyledMenuItemIcon = styled.div<{active?:boolean}>`
    width : 24px !important;
    height : 24px !important;
    filter: grayscale(100%) brightness(28%) hue-rotate(-190deg) saturate(720%) contrast(0.8);
    ${({active})=>active && css`
        filter : none;
    `}
`
export const StyledMenuItemLabel = styled.span<{active: boolean}>`
  font-size: ${fontSize.h5} !important;
  font-family: ${fontFamilies.secondary} !important;
  color: ${({active}) => active ? brand.white : greyScaleColour.grey100};
  font-weight: ${({active}) => active ? fontWeight.semiBold : fontWeight.regular} !important;

`

export const StyledLogoutContainer = styled.div`

`

export const StyledMenuToggleContainer = styled.div`
    background-color : ${brand.secondaryMain};
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: absolute;
    top: 40px;
    right: -10px;
    cursor : pointer;
`

export const StyledSidebarIcon = styled(KeyboardArrowLeftIcon)`
    object-fit: contain;
    width: 19px !important;
    height: 17px !important;
  
`;

export const StyledSidebarRightIcon = styled(KeyboardArrowRightIcon)`
    object-fit: contain;
    width: 19px !important;
    height: 17px !important;
  
`;