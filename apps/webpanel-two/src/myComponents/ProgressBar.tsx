import { optimiseColors } from '@mono/theme/modules/optimise.theme';
import { shadows } from '@mono/theme/style.layout';
import { primitiveColors } from '@mono/theme/style.palette';
import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  type: 'living' | 'savings';
  className?: string;
}

const ProgressContainer = styled.div`
  width: 100%;
  height: 11px;
  background-color: ${primitiveColors.neutral100};
  border-radius: 0;
  overflow: hidden;
  box-shadow: ${shadows.none};
  opacity: 1;
`;

const ProgressFill = styled.div<{ width: number; type: 'living' | 'savings' }>`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.type === 'living'
    ? `linear-gradient(90deg, ${primitiveColors.purple500} 0%, ${primitiveColors.purple400} 50%, ${primitiveColors.purple300} 100%)`
    : `linear-gradient(90deg, #00D492 0%, #00BC7D 50%, #00BBA7 100%)`
  };
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transition: width 0.3s ease;
  border-radius: 0;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  type,
  className = ''
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressContainer className={className}>
      <ProgressFill width={clampedValue} type={type} />
    </ProgressContainer>
  );
};

export default ProgressBar;
