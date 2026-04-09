import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

interface PolarGridProps {
  /** A boolean value indicating whether to display radial lines */
  radialLines?: boolean;
  
  /** Additional props for configuring the radial lines */
  radialLinesProps?: object;

  /** The type of grid to be displayed */
  gridType?: 'polygon' | 'circle';

  /** The angle of the grid lines in degrees */
  gridAngle?: number;

  /** Additional props for configuring the grid lines */
  gridProps?: object;
}

interface PolarAngleAxisProps {
  /** The data key corresponding to the angle axis */
  dataKey?: string;

  /** The type of scale for the angle axis */
  scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'band' | 'point' | 'ordinal' | 'quantile' | 'quantize' | 'utc' | 'time' | 'sequential' | 'threshold';

  /** The minimum value of the axis domain */
  domainMin?: number | string | 'auto';

  /** The maximum value of the axis domain */
  domainMax?: number | string | 'auto';

  /** The ticks on the axis */
  ticks?: TickItem[];

  /** The size of the tick marks */
  tickSize?: number;

  /** The padding between the ticks and the axis */
  tickPadding?: number;

  /** The format of the tick values */
  tickFormatter?: (value: any, index: number) => string;

  /** The angle at which the axis is rotated in degrees */
  angle?: number;

  /** Additional props for configuring the axis line */
  axisLineProps?: object;

  /** Additional props for configuring the tick lines */
  tickLineProps?: object;

  /** Additional props for configuring the tick text */
  tickTextProps?: object;
}

interface PolarRadiusAxisProps {
  /** The data key corresponding to the radius axis */
  dataKey?: string;

  /** The type of scale for the radius axis */
  scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity';

  /** The minimum value of the axis domain */
  domainMin?: number | string | 'auto';

  /** The maximum value of the axis domain */
  domainMax?: number | string | 'auto';

  /** The ticks on the axis */
  ticks?: TickItem[];

  /** The size of the tick marks */
  tickSize?: number;

  /** The padding between the ticks and the axis */
  tickPadding?: number;

  /** The format of the tick values */
  tickFormatter?: (value: any, index: number) => string;

  /** The orientation of the axis */
  orientation?: 'left' | 'right' | 'middle';

  /** Additional props for configuring the axis line */
  axisLineProps?: object;

  /** Additional props for configuring the tick lines */
  tickLineProps?: object;

  /** Additional props for configuring the tick text */
  tickTextProps?: object;

  axisLine?:boolean

  tickLine?:boolean
  tick?:object
  stroke?:string
  tickMargin?: number
  angle?:number
  dx?:number
  dy?:number
}

interface TickItem {
  value: string | number;
  coordinate: number;
}

/**
 * Props for CustomRadarChart component
 */
interface RadarChartProps {
  /** Data for rendering the radar chart */
  data: {
    subject: string;
    [key: string]: any;
  }[];
  /** Width of the radar chart */
  width?: number;
  /** Height of the radar chart */
  height?: number;
  /** Outer radius of the radar chart */
  outerRadius?: number;
  /** X-coordinate of the center of the radar chart */
  cx?: number;
  /** Y-coordinate of the center of the radar chart */
  cy?: number;
  /** Data keys for rendering multiple radar components */
  dataKeys: string[];
  /** Fill opacity of the radar chart */
  fillOpacity?: number;
  /** Name of the radar component */
  name?: string;
  /** Stroke color of the radar component */
  stroke?: string;
  /** Stroke width of the radar component */
  strokeWidth?: number; 
  /** Fill color of the radar component */
  fill?: string;
  /** Props for configuring the radius axis */
  radiusAxisProps?: PolarRadiusAxisProps;
  /** Props for configuring the angle axis */
  angleAxisProps?: PolarAngleAxisProps;
  /** Props for configuring the polar grid */
  polarGridProps?: PolarGridProps;

  colors?:string[]
  strokeColors?:string[]
}

/**
 * Custom Radar Chart component
 * @param props Props for CustomRadarChart component
 */
const CustomRadarChart: React.FC<RadarChartProps> = ({
  data,
  width = 700,
  height = 700,
  outerRadius = 150,
  cx = 300,
  cy = 250,
  dataKeys,
  fillOpacity = 0.6,
  name = "Data",
  stroke = "red",
  strokeWidth = 2,
  radiusAxisProps,
  angleAxisProps,
  polarGridProps,
  colors = [],
  fill="red",
  strokeColors = []
}) => {
  return (
    <RadarChart
      cx={cx}
      cy={cy}
      outerRadius={outerRadius}
      width={width}
      height={height}
      data={data}
    >
      <PolarGrid {...polarGridProps} />
      <PolarAngleAxis {...angleAxisProps} dataKey="subject" tickSize={20} />
      <PolarRadiusAxis {...radiusAxisProps}/> 
      
      {dataKeys &&
        dataKeys.map((key, index) => (
          <Radar
            key={key}
            name={name || key}
            dataKey={key}
            stroke={strokeColors.length > 0 ? strokeColors[index] : stroke}
            strokeWidth={strokeWidth}
            fill={colors.length > 0 ? colors[index] : fill}
            fillOpacity={fillOpacity}
          />
        ))}
    </RadarChart>
  );
};

export default CustomRadarChart;
