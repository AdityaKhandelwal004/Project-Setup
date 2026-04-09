import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { primitiveColors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { formatAUD, percentageOf } from '@mono/utils';
import {
  ChartWrapper,
  TooltipContainer,
  TooltipLabel,
  TooltipItem,
  ReferenceLineLabel,
} from './styles.tsx';
import { fontSize, fontWeight } from '@mono/theme';

interface ChartDataPoint {
  month: string;
  spending: number;
  savings: number;
}

interface SpendingChartProps {
  data: ChartDataPoint[];
  height?: number;
  totalIncome: number;
}

// Default data matching the image
const defaultData: ChartDataPoint[] = [
  { month: 'Jan', spending: 7000, savings: 2000 },
  { month: 'Feb', spending: 8500, savings: 4000 },
  { month: 'Mar', spending: 7000, savings: 2000 },
  { month: 'Apr', spending: 6000, savings: 2500 },
  { month: 'May', spending: 9000, savings: 1500 },
  { month: 'Jun', spending: 9500, savings: 4500 },
  { month: 'Jul', spending: 9000, savings: 6000 },
  { month: 'Aug', spending: 4000, savings: 1500 },
  { month: 'Sep', spending: 8000, savings: 3000 },
  { month: 'Oct', spending: 3000, savings: 3000 },
  { month: 'Nov', spending: 60000, savings: 6000 },
  { month: 'Dec', spending: 9500, savings: 2000 },
];

function monthNumberToMMM(monthNumber: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Handle invalid month numbers
    if (monthNumber < 1 || monthNumber > 12) {
        return 'Invalid';
    }
    
    return months[monthNumber - 1];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipLabel>{monthNumberToMMM(Number(label))}</TooltipLabel>
        {payload.map((entry, index) => (
          <TooltipItem key={index} color={entry.color || '#000'}>
            <span>
              {entry.name === 'spending' ? 'Spending' : 'Savings'}:{' '}
              {formatAUD(entry.value as number)}
            </span>
          </TooltipItem>
        ))}
      </TooltipContainer>
    );
  }
  return null;
};

const CustomReferenceLabel: React.FC<{
  viewBox?: any;
  value?: string;
  color?: string;
}> = ({ viewBox, value, color }) => {
  const { y, x, width } = viewBox || {};

  return (
    <g>
      <foreignObject x={width-50} y={y} width={40} height={24}>
        <ReferenceLineLabel color={color}>{value}</ReferenceLineLabel>
      </foreignObject>
    </g>
  );
};



const SpendingChart: React.FC<SpendingChartProps> = ({
  data = [],
  height = 400,
  totalIncome,
}) => {

  
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke={greyScaleColour.grey20}
            vertical={false}
          />

          {/* Reference lines */}
          <ReferenceLine
            y={percentageOf(70, totalIncome)}
            stroke={primitiveColors.orange300}
            strokeDasharray="5 5"
            label={{   
              value: '70%',   
              position: 'right',
              fill : primitiveColors.orange500,
              fontSize: fontSize.textXs,
              fontWeight:fontWeight.medium,
              offset: -5
            }}
          />

          <ReferenceLine
            y={percentageOf(30, Number(totalIncome))}
            stroke={primitiveColors.purple300}
            strokeDasharray="5 5"
             label={{   
              value: '30%',   
              position: 'right',
              fill : primitiveColors.purple500,
              fontSize: fontSize.textXs,
              fontWeight:fontWeight.medium,
              offset: -5
            }}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: greyScaleColour.grey60, fontSize: 12 }}
            dy={10}
            height={60}
            tickFormatter={(value) => monthNumberToMMM(value)}
            padding={{left:0, right : 20}}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: greyScaleColour.grey60, fontSize: 12 }}
            domain={[0, (dataMax: number) => Math.max(dataMax, totalIncome)]}
            tickFormatter={(value) =>
              value >= 1000 ? `${value / 1000}k` : value.toString()
            }
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="spending"
            stroke={primitiveColors.orange500}
            strokeWidth={2}
            dot={{
              fill: primitiveColors.orange500,
              strokeWidth: 2,
              r: 4,
              stroke: primitiveColors.neutral0,
            }}
            activeDot={{
              r: 6,
              fill: primitiveColors.orange500,
              stroke: primitiveColors.neutral0,
              strokeWidth: 2,
            }}
          />

          <Line
            type="monotone"
            dataKey="savings"
            stroke={primitiveColors.purple500}
            strokeWidth={2}
            dot={{
              fill: primitiveColors.purple500,
              strokeWidth: 2,
              r: 4,
              stroke: primitiveColors.neutral0,
            }}
            activeDot={{
              r: 6,
              fill: primitiveColors.purple500,
              stroke: primitiveColors.neutral0,
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default SpendingChart;
