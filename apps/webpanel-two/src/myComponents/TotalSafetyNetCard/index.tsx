import React from 'react';

import {
  TotalSafetyNetContainer,
  TotalSafetyNetLeftSection,
  TotalSafetyNetIcon,
  TotalSafetyNetContent,
  TotalSafetyNetTitle,
  TotalSafetyNetDescription,
  TotalSafetyNetAmount,
} from './styles';

interface TotalSafetyNetCardProps {
  totalAmount: string;
}

export const TotalSafetyNetCard: React.FC<TotalSafetyNetCardProps> = ({ totalAmount }) => (
  <TotalSafetyNetContainer>
    <TotalSafetyNetLeftSection>
      <TotalSafetyNetIcon src="/assets/images/totalSafetyNetStar.png" alt="Total Safety Net" />
      <TotalSafetyNetContent>
        <TotalSafetyNetTitle>Your Total Safety Net Goals</TotalSafetyNetTitle>
        <TotalSafetyNetDescription>
          An at-a-glance total of all your safety net funds, combining your emergency fund, lumpy and 3-month expenses savings.
        </TotalSafetyNetDescription>
      </TotalSafetyNetContent>
    </TotalSafetyNetLeftSection>
    <TotalSafetyNetAmount>{totalAmount}</TotalSafetyNetAmount>
  </TotalSafetyNetContainer>
);

export default TotalSafetyNetCard;
