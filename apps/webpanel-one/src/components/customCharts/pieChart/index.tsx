import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Sector } from 'recharts';
import { darkenColor } from '../../../utils/constant';

interface ChartEntry {
  name: string;
  value: number;
}

interface PieChartProps {
  /** Data for the pie chart */
  data: ChartEntry[];
  /** Colors for each segment of the pie chart */
  colors: string[];
  /** Width of the pie chart */
  width?: number;
  /** Height of the pie chart */
  height?: number;
  /** X-coordinate of the center of the pie chart */
  cx?: number;
  /** Y-coordinate of the center of the pie chart */
  cy?: number;
  /** Inner radius of the pie chart */
  innerRadius?: number;
  /** Outer radius of the pie chart */
  outerRadius?: number;
  /** Angle between sectors in degrees */
  paddingAngle?: number;
  /** Stroke width of the pie chart */
  strokeWidth?: number;
}



const CustomPieChart: React.FC<PieChartProps> = ({
  data,
  colors: COLORS,
  width = 400,
  height = 400,
  cx = 200,
  cy = 200,
  innerRadius = 30,
  outerRadius = 80,
  paddingAngle = 0,
  strokeWidth = 2,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        fontSize='10px'
        data-testID={`text-${index}`}
      >
        {radius > 30 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={width} height={height}>
      <Pie
        labelLine={false}
        label={renderCustomizedLabel}
        activeIndex={activeIndex}
        activeShape={(props: any) => {
          const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
          } = props;

          const sin = Math.sin(-RADIAN * midAngle);
          const cos = Math.cos(-RADIAN * midAngle);
          const sx = cx + (outerRadius + 10) * cos;
          const sy = cy + (outerRadius + 10) * sin;
          const mx = cx + (outerRadius + 30) * cos;
          const my = cy + (outerRadius + 30) * sin;
          const ex = mx + (cos >= 0 ? 1 : -1) * 22;
          const ey = my;
          const textAnchor = cos >= 0 ? 'start' : 'end';

          return (
            <g>
              {innerRadius >= 50 && (
                <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
                  {payload.name}
                </text>
              )}
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={0}
                textAnchor={textAnchor}
                fill={fill}
              >
                {payload.name}
              </text>
              <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={25}
                textAnchor={textAnchor}
                fill='#333'
              >
                {`${(percent * 100).toFixed(2)}%`}
              </text>
              <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
              />
              <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
              />
              <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill='none'
              />
              <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
            </g>
          );
        }}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill='#8884d8'
        paddingAngle={paddingAngle}
        dataKey='value'
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              activeIndex === index
                ? darkenColor(COLORS[index % COLORS.length], 20)
                : COLORS[index % COLORS.length]
            }
            strokeWidth={strokeWidth}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
