import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

/**
 * Props for CustomBarChart component
 */
interface BarChartProps {
  /** Data for rendering the chart */
  data: {
    name: string;
    [key: string]: number | string;
  }[];
  /** Width of the chart */
  width?: number;
  /** Height of the chart */
  height?: number;
  /** Margin of the chart */
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /** Size of each bar in the chart */
  barSize?: number;
  /** Data key for X-axis */
  xAxisDataKey: string;
  /** Data keys for Y-axis */
  yAxisDataKeys: string[];
  /** Scale for X-axis */
  xAxisScale?: any;
  /** Padding for X-axis */
  xAxisPadding?: { left?: number; right?: number };
  /** Padding for Y-axis */
  yAxisPadding?: { top?: number; bottom?: number };
  /** Stroke dash array for grid lines */
  gridStrokeDasharray?: string;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Enable legend */
  legend?: boolean;
  /** Colors for bars */
  colors?: string[]; 
  /** Array for stacking bars */
  stackArray?:string[]
}

/**
 * Custom Bar Chart component
 * @param props Props for CustomBarChart component
 */
const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  width = 500,
  height = 300,
  margin={
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
  barSize = 40,
  xAxisDataKey = 'name',
  yAxisDataKeys = [],
  xAxisScale = 'point',
  xAxisPadding,
  yAxisPadding = {},
  gridStrokeDasharray = '3 3',
  tooltip = false,
  legend = false,
  colors = [], 
  stackArray = []

}) => {
  // Function to calculate dy for X-axis ticks
  const calculateDy = (index: number) => {
    const tickWidth = width / data.length;
    const thresholdWidthForOverlap = 50;
    const defaultDy = 10;

    if (tickWidth < thresholdWidthForOverlap) {
      return index % 2 === 0 ? 25 : 10;
    }

    return defaultDy;
  };

  // Customized axis tick component
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={15}
          y={0}
          dy={calculateDy(payload.index)}
          textAnchor='end'
          fill='#666'
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Determine the colors to use
  let barColors: string[];
  if (colors.length >= 3) {
    barColors = colors.slice(0, 3);
  } else {
    barColors = ['#0088FE', '#00C49F', '#FFBB28'];
  }

  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={margin}
      barSize={barSize}
    >
      <ReferenceLine y={0} stroke="#000" />
      <XAxis
        dataKey={xAxisDataKey}
        scale={yAxisDataKeys.length <= 1 ? xAxisScale : undefined}
        padding={xAxisPadding}
        tick={(props) => <CustomizedAxisTick {...props} />}
      />
      <YAxis padding={yAxisPadding} />
      {tooltip && <Tooltip />}
      {legend && (
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      )}
      <CartesianGrid strokeDasharray={gridStrokeDasharray} />
      {yAxisDataKeys.map((key, index) => (
        <Bar
          key={index}
          dataKey={key}
          fill={
            index < barColors.length
              ? barColors[index]
              : `#${Math.floor(Math.random() * 16777215).toString(16)}`
          } 
          background={{ fill: yAxisDataKeys.length <= 1 ? '#eee' : "transparent" }}
          stackId={stackArray[index] !== "" ? stackArray[index] : undefined}
        />
      ))}
    </BarChart> 
  );
};

export default CustomBarChart;
