import styled from 'styled-components';
import { brand, colors } from '../../../theme/style.palette';
import { fontSize, fontWeight } from '../../../theme/style.typography';

export const StyledStepNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 50px;
`;

export const StyledStepContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const StyledIconContainer = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? brand.primaryMain : '#ccc')}; /* Use different color for active step */
  color: #fff;
  border-radius: 50%; /* Make it a circle */
  width: 64px;
  height: 64px;
  font-size: 12px; /* Adjust font size as needed */
  margin-top: 14px;
`;

export const StyledTitle = styled.div<{active ?: boolean}>`
  margin-top: 8px;
  color : ${(props) => props.active ? brand.primaryMain : colors.grey50};
  font-size: ${fontSize.h4};
`;

export const StyledStepLineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const StyledStepLine = styled.div<{active ?: boolean}>`
  flex: 1;
  height: 2px;
  background-color: ${(props) => props.active ? brand.primaryMain : "#ccc"} ;
`;

export const StyledIcon = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  font-size : 25px;
`
export const StyledIndex = styled.div`
  font-size : ${fontSize.h3};
  font-weight : ${fontWeight.medium}
`