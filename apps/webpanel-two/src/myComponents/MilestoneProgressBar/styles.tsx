import styled from '@emotion/styled';
import { fontFamilies } from '@mono/theme/style.typography';

export const MilestoneContainer = styled.div`
  position: relative;
`;

export const MilestoneIconsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MilestoneIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MilestoneIcon = styled.div<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

export const ProgressLineContainer = styled.div<{ bgColor: string }>`
  position: relative;
  left: 0;
  right: 0;
  height: 8px;
  background-color: ${props => props.bgColor};
  border-radius: 9999px;
`;

export const ProgressBar = styled.div<{ width: number; color: string }>`
  height: 100%;
  background-color: ${props => props.color};
  border-radius: 9999px;
  width: ${props => props.width}%;
  transition: width 500ms ease-in-out;
`;

export const MilestoneLabelsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 8px;
`;

export const MilestoneLabelWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.width};
`;

export const MilestoneLabel = styled.p<{ color: string }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.color};
  margin-bottom: 4px;
  white-space: nowrap;
`;

export const MilestoneDate = styled.p<{ color: string }>`
  font-family: ${fontFamilies.secondary};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.color};
`;
