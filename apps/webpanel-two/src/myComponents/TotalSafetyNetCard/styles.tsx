import { fontFamilies } from '@mono/theme';
import styled from 'styled-components';

export const TotalSafetyNetContainer = styled.div`
  background-color: #F9F6FF;
  border-radius: 12.75px;
  padding: 16px 20px;
  border: 1px solid #D0BCF8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

export const TotalSafetyNetLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const TotalSafetyNetIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const TotalSafetyNetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TotalSafetyNetTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2D2D2D;
  line-height: 22px;
  font-family: ${fontFamilies.secondary};
`;

export const TotalSafetyNetDescription = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #737373;
  line-height: 18px;
  font-family: ${fontFamilies.secondary};
`;

export const TotalSafetyNetAmount = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #FF4B00;
  font-style: bold;
  line-height: 28px;
  white-space: nowrap;
`;
