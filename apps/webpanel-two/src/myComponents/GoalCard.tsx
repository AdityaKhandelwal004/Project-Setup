import React from 'react';
import styled from 'styled-components';
import { Card } from '@mono/components';

interface GoalCardProps {
  title: string;
  description?: string;
  amount?: number;
  targetAmount?: number;
  progress?: number;
  onClick?: () => void;
  className?: string;
}

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const GoalCard: React.FC<GoalCardProps> = ({
  title,
  description,
  amount,
  targetAmount,
  progress,
  onClick,
  className
}) => {
  return (
    <StyledCard
      className={className}
      onClick={onClick}
      noHeader
      cardCss={{
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
      }}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
        
        {amount !== undefined && targetAmount !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Current</span>
              <span className="text-sm font-medium">${amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Target</span>
              <span className="text-sm font-medium">${targetAmount.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </StyledCard>
  );
};

export default GoalCard;
