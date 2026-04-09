import React from 'react';

import milestone01 from '../../../public/assets/images/milestone_01.png';
import milestone02 from '../../../public/assets/images/milestone_02.png';
import milestone03 from '../../../public/assets/images/milestone_03.png';
import milestone04 from '../../../public/assets/images/milestone_04.png';
import {
  MilestoneContainer,
  MilestoneIconsContainer,
  MilestoneIconWrapper,
  MilestoneIcon,
  ProgressLineContainer,
  ProgressBar,
  MilestoneLabelsContainer,
  MilestoneLabelWrapper,
  MilestoneLabel,
  MilestoneDate,
} from './styles';

export interface MilestoneData {
  id: string;
  label?: string;
  date: string | Date;
  icon?: string;
  alt: string;
}

export const defaultMilestoneIcons = {
  milestone01,
  milestone02,
  milestone03,
  milestone04,
};

export const calculateProgressFromDates = (
  milestones: MilestoneData[],
  currentDate: Date = new Date()
): number => {
  if (milestones.length < 2) return 0;

  const firstMilestone = milestones[0];
  const lastMilestone = milestones[milestones.length - 1];
  
  if (!firstMilestone || !lastMilestone) return 0;

  const startDate = typeof firstMilestone.date === 'string' 
    ? new Date(firstMilestone.date) 
    : firstMilestone.date;
  
  const endDate = typeof lastMilestone.date === 'string'
    ? new Date(lastMilestone.date)
    : lastMilestone.date;

  if (currentDate < startDate) return 0;
  
  if (currentDate >= endDate) return 100;

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = currentDate.getTime() - startDate.getTime();
  
  return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
};

export interface MilestoneProgressBarProps {
  title?: string;
  milestones: MilestoneData[];
  progressPercentage: number;
  containerClassName?: string;
  titleClassName?: string;
  progressBarColor?: string;
  progressBarBgColor?: string;
  labelColor?: string;
  dateColor?: string;
  iconSize?: {
    width: string;
    height: string;
  };
}

export const MilestoneProgressBar: React.FC<MilestoneProgressBarProps> = ({
  title = 'Milestone',
  milestones,
  progressPercentage,
  containerClassName = 'border border-purple-300 rounded-xl p-6 bg-white shadow-sm',
  titleClassName = 'text-[18px] font-semibold text-purple-500 mb-6',
  progressBarColor = '#6828E8',
  progressBarBgColor = '#E5E7EB',
  labelColor = '#FF4B00',
  dateColor = '#2D2D2D',
  iconSize = { width: '94px', height: '93px' },
}) => {
  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={containerClassName}>
      {title && <h2 className={titleClassName}>{title}</h2>}

      <MilestoneContainer>
        {/* Milestone Icons Container */}
        <MilestoneIconsContainer>
          {milestones.map((milestone) => (
            <MilestoneIconWrapper key={milestone.id}>
              <MilestoneIcon
                width={iconSize.width}
                height={iconSize.height}
              >
                <img
                  src={milestone.icon}
                  alt={milestone.alt}
                  className="object-contain"
                />
              </MilestoneIcon>
            </MilestoneIconWrapper>
          ))}
        </MilestoneIconsContainer>

        {/* Progress Line */}
        <ProgressLineContainer bgColor={progressBarBgColor}>
          <ProgressBar
            width={Math.min(Math.max(progressPercentage, 0), 100)}
            color={progressBarColor}
          />
        </ProgressLineContainer>

        {/* Labels Container */}
        <MilestoneLabelsContainer>
          {milestones.map((milestone) => (
            <MilestoneLabelWrapper
              key={`${milestone.id}-label`}
              width={iconSize.width}
            >
              <div className="text-center">
                {milestone.label && (
                  <MilestoneLabel color={labelColor}>
                    {milestone.label}
                  </MilestoneLabel>
                )}
                <MilestoneDate color={dateColor}>
                  {formatDate(milestone.date)}
                </MilestoneDate>
              </div>
            </MilestoneLabelWrapper>
          ))}
        </MilestoneLabelsContainer>
      </MilestoneContainer>
    </div>
  );
};

export default MilestoneProgressBar;
