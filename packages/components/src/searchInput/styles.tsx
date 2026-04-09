import {styled} from 'styled-components';
import { brand, fontFamilies, fontSize, fontWeight } from '@mono/theme';
import {  colors, greyScaleColour } from '@mono/theme';

export const StyledSearchInput = styled.input`
  padding: 12px 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: ${fontSize.b1};
  font-weight: ${fontWeight.medium};
  font-family: ${fontFamilies.secondary}!important;
  line-height: 20px;
  border-radius: 10px;
  color: ${brand.black};
  &::placeholder {
    font-family: 'DM Sans', sans-serif !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 20px !important;
    letter-spacing: 0 !important;
    color: #B5B3C1 !important;
  }
`;

export const StyledActionItem = styled.div<{ lastItem?: boolean }>`
    display: flex;
    white-space: nowrap;
    width: 100%;
`;

export const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row-reverse;
    border: 1px solid #D0D0D2;
    border-radius: 4px;
    &:focus-within{
        border-color: ${brand.black};
    }

`;