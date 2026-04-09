import React, { cloneElement, isValidElement, type ReactElement } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  ChipSize,
  StyledChipContainer,
  type StyledChipContainerProps,
  StyledChipText,
} from "./styles.tsx";
import Tooltip from "../tooltip/index.tsx";
// import { StyledTooltipText } from "../pieChart/styles.tsx";

interface Props extends StyledChipContainerProps {
  text: any;
  iconCtaClick?: () => void;
  chipSize?: ChipSize;
  width?: string;
  icon?: ReactElement;
  paletteColor?: any;
  comment?: string;
  isCapitalize?: boolean
  radius?: string
  customWeight?:number;
  tableChip?: boolean
  customStyle?: any
  customChipStyle?: any
}

const Chip: React.FC<Props> = ({
  text,
  iconCtaClick,
  bgColor,
  textColor,
  chipSize,
  width,
  icon,
  comment,
  isCapitalize = true,
  radius,
  customWeight,
  tableChip,
  customStyle,
  customChipStyle
}) => {
  return (
    <StyledChipContainer style={customChipStyle} bgColor={bgColor} textColor={textColor} width={width} radius={radius}>
      <StyledChipText chipSize={chipSize} customWeight={customWeight} sx={customStyle}>
        {isCapitalize && text ? text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase() : text}
      </StyledChipText>
          {isValidElement(icon) ? cloneElement(icon) : null}
    </StyledChipContainer>
  );
};

export default Chip;
