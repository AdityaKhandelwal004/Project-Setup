import React from 'react';

interface ProgressSegment {
  value: number;
  color: string;
  label?: string;
}

interface MultiColorProgressBarProps {
  segments: ProgressSegment[];
  height?: string;
  className?: string;
  showLabels?: boolean;
  total?: number;
}

const MultiColorProgressBar: React.FC<MultiColorProgressBarProps> = ({
  segments,
  height = 'h-8',
  className = '',
  showLabels = false,
  total
}) => {
  // Calculate total value if not provided
  const totalValue = total || segments.reduce((sum, segment) => sum + segment.value, 0);
  
  // Calculate percentages for each segment
  const segmentsWithPercentages = segments.map(segment => ({
    ...segment,
    percentage: totalValue > 0 ? (segment.value / totalValue) * 100 : 0
  }));

  return (
    <div className={`mt-4 mb-6 ${className}`}>
      {/* Progress Bar */}
      <div className={`w-full bg-gray-200 rounded-full ${height} mb-4`}>
        <div className={`flex ${height} rounded-full overflow-hidden`}>
          {segmentsWithPercentages.map((segment, index) => (
            <div
              key={index}
              className={`${segment.color}`}
              style={{
                width: `${segment.percentage}%`,
                minWidth: segment.percentage > 0 ? '2px' : '0px' // Ensure small segments are visible
              }}
              title={segment.label ? `${segment.label}: ${segment.value}` : `${segment.value}`}
            />
          ))}
        </div>
      </div>

      {/* Optional Labels */}
      {showLabels && (
        <div className="flex justify-between mt-4 text-sm text-gray-600 pr-4">
          {segmentsWithPercentages.map((segment, index) => (
            <div key={index} className="flex items-center mr-3">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${segment.color}`}
              />
              <span className="text-sm font-medium">{segment.label || `Segment ${index + 1}`}: {segment.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiColorProgressBar;
