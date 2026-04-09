import styled from 'styled-components';
import { fontWeight, fontSize, greyScaleColour } from '@mono/theme';
import { primitiveColors } from '@mono/theme/style.palette';

export const StyledDeactivateModalMessage = styled.p`
  font-size: 16px;
  color: #232323;
  margin: 0;
  font-weight: 400;
  text-align: left;
`;

export const StyledDeactivateButton = styled.div<{ isActive?: boolean }>`
  button.MuiButton-containedPrimary {
    background-color: ${props => props.isActive ? '#EB4848' : primitiveColors.purple800} !important;
    border-color: ${props => props.isActive ? '#EB4848' : primitiveColors.purple800} !important;
    
    &:hover {
      background-color: ${primitiveColors.purple800} !important;
      border-color: ${primitiveColors.purple800} !important;
    }
  }
  
  button.MuiButton-outlined {
    &:hover {
      background-color: ${primitiveColors.purple800} !important;
      border-color: ${primitiveColors.purple800} !important;
      color: white !important;
    }
  }
`;
