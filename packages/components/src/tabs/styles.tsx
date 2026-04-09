import {styled} from 'styled-components';
import { brand, greyScaleColour } from '@mono/theme/style.palette.ts';

export const StyledTabsContainer = styled.div<{ orientation?: string }>`
  width: 100%;
  display: ${(props) => (props.orientation === 'vertical' ? 'flex' : 'block')};
`;

export const StyledTabsHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
`;

export const StyledTabsItem = styled.button<{ active?: boolean }>`
  padding: 8px 16px;  /* Adjust padding for better spacing */
  font-size: 14px;
  // font-weight: 600;
  background-color: ${(props) => (props.active ? brand.primary100 : greyScaleColour.grey10)}; /* Active background */
  color: ${(props) => (props.active ? '#fff' : greyScaleColour.grey100)}; /* Active text color */
  transition: background-color 300ms ease, color 300ms ease;
  cursor: pointer;
  
  /* Remove the border and adjust spacing */
  border: none;
  border-radius: 3px; /* Optional: Round the edges of the tabs */

  &:not(:last-child) {
    margin-right: -1px; /* Stick tabs together */
  }
`;

export const StyledTabsInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
