import React from 'react';

import {
  EmergencySummaryContainer,
  EmergencySummaryFlex,
  EmergencySummaryItem,
  EmergencySummaryLabel,
  EmergencySummaryValue,
} from './styles';

interface SummarySectionItem {
  label: string;
  value: string | number;
}

interface SummarySectionProps {
  items: SummarySectionItem[];
}

export const SummarySection: React.FC<SummarySectionProps> = ({ items }) => {
  return (
    <EmergencySummaryContainer>
      <EmergencySummaryFlex>
        {items.map((item, index) => (
          <EmergencySummaryItem key={index}>
            <EmergencySummaryLabel>{item.label}</EmergencySummaryLabel>
            <EmergencySummaryValue>{item.value}</EmergencySummaryValue>
          </EmergencySummaryItem>
        ))}
      </EmergencySummaryFlex>
    </EmergencySummaryContainer>
  );
};

export default SummarySection;
