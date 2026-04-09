import styled from 'styled-components';

export const EmergencySummaryContainer = styled.div`
  background-color: #F9F6FF;
  border-radius: 12.75px;
  padding: 16px 20px;
  border: 1px solid #D0BCF8;
`;

export const EmergencySummaryFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EmergencySummaryItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmergencySummaryLabel = styled.div`
  font-size: 16px;
  color: #2D2D2D;
  font-weight: 600;
  font-style: semi-bold;
  padding-bottom: 9px;
`;

export const EmergencySummaryValue = styled.div`
  font-size: 28px;
  font-style: bold;
  font-weight: 700;
  color: #FF4B00;
`;
