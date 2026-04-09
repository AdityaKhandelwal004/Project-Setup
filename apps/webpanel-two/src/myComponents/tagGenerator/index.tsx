import { MaterialChip } from "@mono/components";

import React from "react";

import { StyledTagContainer, TAG_COLORS } from "./styles";

interface TagColors {
  bg: string;
  text: string;
  border?: string;
  padding?: string;
  borderRadius?: string;
  fontWeight?: string | number;
  fontSize?: string;
  lineHeight?: string;
}

interface TagGeneratorProps {
  type: 'primary' | 'percentage' | 'perMonth' | 'livingExpensesBadge' | 'savingsBadge' | 'goalPercentageBadge' | 'goalPercentageBadgeOverBudget' | 'interestRate';
  label?: string;
  width?: string;
  onClick?: () => void;
}



const getTagColors = (type: string): TagColors => {
  switch (type) {
    case 'primary':
      return TAG_COLORS.primary;
    case 'percentage':
      return TAG_COLORS.percentage;
    case 'perMonth':
      return TAG_COLORS.perMonth;
    case 'livingExpensesBadge':
      return TAG_COLORS.livingExpensesBadge;
    case 'savingsBadge':
      return TAG_COLORS.savingsBadge;
    case 'goalPercentageBadge':
      return TAG_COLORS.goalPercentageBadge;
    case 'goalPercentageBadgeOverBudget':
      return TAG_COLORS.goalPercentageBadgeOverBudget;
    case 'interestRate':
      return TAG_COLORS.interestRate;
    default:
      return TAG_COLORS.default;
  }
};

const TagGenerator: React.FC<TagGeneratorProps> = ({ 
  type,
  label,
  width,
  onClick
}) => {
  const getDisplayText = (): string => {
    if (label) return label;
    
    switch (type) {
      case 'primary':
        return 'Primary';
      default:
        return '';
    }
  };

  const displayText = getDisplayText();
  const tagColors = getTagColors(type);
  
  return (
    <StyledTagContainer onClick={onClick} style={{ width: width || 'auto' }}>
      <MaterialChip
        label={displayText}
        sx={{
          backgroundColor: tagColors.bg,
          color: tagColors.text,
          padding: tagColors.padding,
          fontWeight: tagColors.fontWeight,
          fontSize: tagColors.fontSize,
          borderRadius: tagColors.borderRadius,
          width: width || 'auto',
          height: 'auto',
          border: tagColors.border ? `1px solid ${tagColors.border}` : 'none',
          cursor: onClick ? 'pointer' : 'default',
          '&:hover': {
            opacity: onClick ? 0.8 : 1,
          },
        }}
        onClick={onClick}
      />
    </StyledTagContainer>
  );
};

export default TagGenerator;
