import React from 'react';

import TagGenerator from '../tagGenerator';
import {
  CardContainer,
  ContentWrapper,
  SectionContainer,
  SectionLabel,
  AmountText,
  AmountContainer,
} from './styles';

interface SavingsInfoCardProps {
  currentSavings?: number;
  monthlyContribution: number;
  showCurrentSavings?: boolean;
  frequency?: string;
}

export function SavingsInfoCard({ currentSavings, monthlyContribution, showCurrentSavings = true, frequency = 'monthly' }: SavingsInfoCardProps) {
  // Map frequency to display label
  const getFrequencyLabel = (freq: string) => {
    // Handle if freq is not a string or is undefined
    if (!freq || typeof freq !== 'string') {
      return 'Per month';
    }
    const frequencyMap: Record<string, string> = {
      'weekly': 'Per week',
      'fortnightly': 'Per fortnight',
      'monthly': 'Per month',
      'yearly': 'Per year',
      'annually': 'Per year',
    };
    return frequencyMap[freq.toLowerCase()] || 'Per month';
  };
  return (
    <CardContainer showCurrentSavings={showCurrentSavings}>
      <ContentWrapper showCurrentSavings={showCurrentSavings}>
        {showCurrentSavings && currentSavings !== undefined && (
          <SectionContainer isFlexOne>
            <SectionLabel title="Current Cash Savings">
              Current Cash Savings
            </SectionLabel>
            <AmountText>
              ${currentSavings.toLocaleString()}
            </AmountText>
          </SectionContainer>
        )}
        <SectionContainer isFlexOne={showCurrentSavings}>
          <SectionLabel title="Income Savings">
            Income Savings
          </SectionLabel>
          <AmountContainer>
            <AmountText>
              ${monthlyContribution.toLocaleString()}
            </AmountText>
            <TagGenerator type="perMonth" label={getFrequencyLabel(frequency)} />
          </AmountContainer>
        </SectionContainer>
      </ContentWrapper>
    </CardContainer>
  );
}

export default SavingsInfoCard;
