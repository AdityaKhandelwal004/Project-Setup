import {
  CardContainer,
  ContentWrapper,
  SectionContainer,
  SectionLabel,
  AmountText,
  AmountContainer,
} from './styles';

import { Chip } from '@mono/components'
import { ChipSize } from '@mono/components/src/customChip/styles';
import { primitiveColors } from '@mono/theme';

interface StepHeaderCardProps {
  currentSavings?: number;
  monthlyContribution: string;
  showCurrentSavings?: boolean;
}

const StepHeaderCard = ({ currentSavings, monthlyContribution, showCurrentSavings = true }: StepHeaderCardProps) => {
  return (
    <CardContainer >
      <ContentWrapper >
        {/* {showCurrentSavings && currentSavings !== undefined && (
          <SectionContainer isFlexOne>
            <SectionLabel title="Current Cash Savings">
              Current Cash Savings
            </SectionLabel>
            <AmountText>
              ${currentSavings.toLocaleString()}
            </AmountText>
          </SectionContainer>
        )} */}
        <SectionContainer isFlexOne={showCurrentSavings}>
          <SectionLabel title="Income Savings">
            Income to Invest
          </SectionLabel>
          <AmountContainer>
            <AmountText>
              ${monthlyContribution?.toLocaleString()}
            </AmountText>
                <Chip
                text={ 'Per month'}
                bgColor= {primitiveColors.purple100}
                textColor={primitiveColors.purple500}
                chipSize={ChipSize.Large}
            />
          </AmountContainer>
        </SectionContainer>
      </ContentWrapper>
    </CardContainer>
  );
}       

export default StepHeaderCard;
