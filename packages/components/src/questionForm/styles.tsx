import { brand, colors, fontFamilies, fontSize, fontWeight, greyScaleColour, primitiveColors, respondTo } from "@mono/theme"
import styled, { css } from "styled-components"



export const StyledQuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    // padding : 32px 0px;

`

export const StyledQuestion = styled.div`
    display: flex;
    align-items : center;
    gap : 16px;
`

export const StyledQuestionNumberContainer = styled.div`
    display: flex;
    width: 35px;
    height: 35px;
    align-items : center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid ${greyScaleColour.grey50};
    ${respondTo.smOnly}{
        width: 20px;
        height: 20px;
    }
`
export const StyledQuestionNumber = styled.span`
    font-size : ${fontSize.h5};
    font-weight : ${fontWeight.medium};
    color : ${brand.primaryLight};
    ${respondTo.smOnly}{
        font-size : ${fontSize.b2};
    }
`

export const StyledQuestionText = styled.p`
    font-size : ${fontSize.h5};
    font-weight : ${fontWeight.medium};
    color : ${brand.secondaryMain};
    margin: 0;
    ${respondTo.smOnly}{
        font-size : ${fontSize.b1};
    }

`

export const StyledOptionsContainer = styled.div`
    display: flex;
    align-items : center;
    justify-content: space-between;
    gap: 10px;
    ${respondTo.mdDown}{
       flex-direction: column;
       flex-wrap: wrap;
    }
`

export const StyledOptionContainer = styled.div<{selected?:boolean; disabled?:boolean}>`
    display: flex;
    width: 100%;
    height: -webkit-fill-available;
    padding: 16px 20px;
    justify-content: flex-start;
    align-items: center;
    border-radius: 16px;
    border: 2px solid #E7E6EB;
    gap: 24px;
    flex-wrap: wrap;
    color : ${greyScaleColour.grey100};
    cursor : pointer;
    ${({selected})=>selected && css`
        background: ${colors.purpleLightBg};
        border-color: ${primitiveColors.purple1000};
    `}
    ${({disabled})=>disabled && css`
        cursor : initial;
    `}

    ${respondTo.mdDown}{
        min-width : 80px;
        width: -webkit-fill-available;
    }
`

export const StyledOptionText= styled.span`
    font-size : ${fontSize.textLg};
    font-weight : ${fontWeight.bold};
    font-family: ${fontFamilies.secondary};
`

export const StyledQuestionBorder= styled.div`
    height: 1px;
    background : ${greyScaleColour?.grey25};
    width: 90%;
    align-self: center;
`