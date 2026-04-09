import { css, styled } from 'styled-components';
import { Typography } from '@mui/material';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { respondTo } from '@mono/theme/style.layout.ts';
import { fontSize } from '@mono/theme/style.typography.ts';

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 6px;
    align-items: start;
    justify-content: space-between;
    gap: 24px;
    ${respondTo.mdDown}{
        flex-direction: column;
        align-items: baseline;
    }
`

export const StyledActionItemContainer = styled.div<{ justifyContent?: string }>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width:100%;
    justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
    gap: 16px;
    ${respondTo.smOnly}{
        flex-direction: column;
        align-items: baseline;
    }
`

export const StyledActionItem = styled.div<{ lastItem?: boolean, isFullWidth?: boolean }>`
    
    display: flex;
    white-space: nowrap;
    ${({ lastItem }) => lastItem && css`
       
    `}
    ${respondTo.smOnly}{
        margin: 8px 0px;
    }

   ${respondTo.smOnly}{
    width:${({ isFullWidth }) => isFullWidth && '100%'};
   }     
`

export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${greyScaleColour.grey60};
    border-radius: 10px;
    &:hover {
        border-color: ${brand.primaryMain};
    }
    &:focus-within{
        border-color: ${brand.primaryMain};
    }

`

export const StyledSearchInput = styled.input`
    min-width: 344px;
    padding : 12px 0px;
    border: none;
    outline: none;
    font-size:${fontSize.b2};
    line-height: 24px;
    border-radius: 10px;
    color:  ${brand.black};
    font-size : ${fontSize.b1};

   
`
export const StyledFilterSection=styled.div<{ isFullWidth?: boolean }>`
    display:flex;
    justify-content:space-between;
    gap:16px;
    ${respondTo.smOnly}{
       width:${({ isFullWidth }) => isFullWidth && '100%'};
    }
`
export const StyledSearchDiv=styled.div<{ isFullWidth?: boolean }>`
    width: 280px;
    height:42px;

   ${respondTo.smOnly}{
    width:${({ isFullWidth }) => isFullWidth && '100%' };
   } 
`
export const StyledFilterDiv=styled.div`
    display:flex;
    justify-content:space-between;
    width:556px;
`
export const StyledAutoCompleteWrapper=styled.div`
    width:275px;
`