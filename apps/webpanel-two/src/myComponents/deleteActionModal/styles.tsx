import styled from 'styled-components';
import { fontWeight, fontSize, greyScaleColour } from '@mono/theme';
import { primitiveColors } from '@mono/theme/style.palette';

export const StyledDeleteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

export const StyledDeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 20px;
`;

export const StyledDeleteModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  // margin-bottom: 8px;
`;

export const StyledDeleteModalIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 28px;
  border: 8px #FEF3F2;
`;

export const StyledDeleteModalTitle = styled.h2`
  font-size: ${fontSize.h3};
  font-weight: ${fontWeight.medium};
  color: ${greyScaleColour.grey100};
  margin: 0;
  line-height: 1.2;
`;

export const StyledDeleteModalMessage = styled.p`
  font-size: 16px;
  color: #232323;
  margin: 0;
  // line-height: 1.5;
  font-weight: 400;
  text-align: left;
`;

export const StyledDeleteButton = styled.div`
  button.MuiButton-containedPrimary {
    background-color: #EB4848 !important;
    border-color: #EB4848 !important;
    
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

export const StyledModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 20px 18px 20px 18px;
  background-color: #f5f5f5;
  border-radius: 0 0 10px 10px;
  margin: 14px 0px 0px -18px;
`;

export const StyledModalButton = styled.div`
  display: flex;
  align-items: center;
`;
