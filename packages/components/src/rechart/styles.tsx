import styled from 'styled-components';
import { primitiveColors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { fontSize, fontWeight } from '@mono/theme/style.typography.ts';

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ReferenceLineLabel = styled.div<{ color?: string }>`
  font-size: ${fontSize.textXs};
  font-weight: ${fontWeight.medium};
  color: ${({ color }) => color || greyScaleColour.grey60};
  background-color: ${primitiveColors.neutral0};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const TooltipContainer = styled.div`
  background-color: ${primitiveColors.neutral0};
  border: 1px solid ${greyScaleColour.grey20};
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TooltipLabel = styled.div`
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.semibold};
  color: ${greyScaleColour.grey90};
  margin-bottom: 8px;
`;

export const TooltipItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${fontSize.textSm};
  color: ${greyScaleColour.grey70};
  margin-bottom: 4px;

  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
