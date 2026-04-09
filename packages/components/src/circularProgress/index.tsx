import { Grid2, Typography } from "@mui/material";
import { CircularProgressContainer, CircularProgressText, StyledProgressText, StyledTextContainer } from "./styles.tsx";
import { fontFamilies } from "@mono/theme";


interface Props {
percentage?: number; 
color: string; 
bgColor: string; 
useGradient?: boolean;
 progessText?: any;
 progressWidth?: string;
 progressHeight?: string
 textColor?: string;
 largeText?: boolean;
textStyles?: React.CSSProperties;
strokeWidth?: number; 
progessTextStyle?: React.CSSProperties;
}

const CircularProgress: React.FC<Props> = ({
  percentage,
  color,
  bgColor,
  useGradient = false,
  progessText,
  progressWidth,
  progressHeight,
  textColor,
  largeText=false,
  textStyles,
  strokeWidth=3,
  progessTextStyle

}) => {
  const sanitizedPercentage = Math.min(percentage ?? 100, 100);
  const gradientId = `gradient-${sanitizedPercentage}`;
  
  return (
    <CircularProgressContainer progressWidth={progressWidth} progressHeight={progressHeight}>
      <svg width="100%" height="100%" viewBox="0 0 36 36">
        {useGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D492" />
              <stop offset="50%" stopColor="#00BC7D" />
              <stop offset="100%" stopColor="#00BBA7" />
            </linearGradient>
          </defs>
        )}
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={useGradient ? `url(#${gradientId})` : color}
          strokeWidth={strokeWidth}
          strokeDasharray="100 100"
          strokeDashoffset={100 - sanitizedPercentage}
          strokeLinecap="round"
          transform="rotate(0 18 18)"
          style={{ filter: 'drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))' }}
        />
      </svg>
      <StyledTextContainer>
       {percentage !== undefined && percentage !== null && <CircularProgressText style={textStyles} largeText={largeText} color={textColor? textColor : useGradient ? '#00D492' : color}>{percentage}%</CircularProgressText>}
      {progessText && <StyledProgressText sx={progessTextStyle} variant="subtitle1">{progessText}</StyledProgressText>}
      </StyledTextContainer>
    </CircularProgressContainer>
  );
};

export default CircularProgress;