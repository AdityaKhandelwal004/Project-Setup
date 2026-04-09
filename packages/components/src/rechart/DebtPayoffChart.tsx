import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Legend,
} from 'recharts';
import { primitiveColors, greyScaleColour } from '@mono/theme/style.palette.ts';
import { ChartWrapper } from './styles.tsx';

interface ChartDataPoint {
  year: string;
  withAccelerator: number;
  withoutAccelerator: number;
}

interface DebtPayoffChartProps {
  data?: ChartDataPoint[];
  height?: number;
}


const DebtPayoffChart: React.FC<DebtPayoffChartProps> = ({
  data = [],
  height = 300,
}) => {

  const withAcceleratorColor = primitiveColors.orange500;
  const withoutAcceleratorColor = primitiveColors.neutral600;
  
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <Legend 
            verticalAlign="top" 
            height={36} 
            formatter={(value) => {
              if(value === 'withAccelerator') {
                return 'With Accelerator';
              } else {
                return 'Without Accelerator';
              }
            }}
          />
          {/* Gradients */}
          <defs>
            {/* Orange gradient */}
            <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={withAcceleratorColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={withAcceleratorColor} stopOpacity={0.05} />
            </linearGradient>

            {/* Purple #6828E8 gradient */}
            {/* <linearGradient id="colorPurpleDebt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={withoutAcceleratorColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={withoutAcceleratorColor} stopOpacity={0.05} />
            </linearGradient> */}
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke={greyScaleColour.grey15}
            vertical={false}
          />

          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: greyScaleColour.grey60, fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: greyScaleColour.grey60, fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000) return `${value / 1000}k`;
              return value.toString();
            }}
          />

          {/* Area for accelerated payoff */}
          <Area
            type="monotone"
            dataKey="withAccelerator"
            stroke={primitiveColors.orange500}
            strokeWidth={2}
            fill="url(#colorDebt)"
            dot={false}
          />

          {/* Area for without accelerator – purple gradient */}
          <Area
            type="monotone"
            dataKey="withoutAccelerator"
            stroke={primitiveColors.neutral600}
            strokeWidth={2}
            fill="url(#colorPurpleDebt)"
            dot={false}
          />

        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default DebtPayoffChart;
