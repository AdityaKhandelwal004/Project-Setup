import { Typography } from "@mui/material";
import styled, { css } from "styled-components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  brand,
  colors,
  fontWeight,
  greyScaleColour,
  fontSize,
  primitiveColors
} from "@mono/theme";

export const StyledMultiTabMainContainer = styled.div<{
  orientation?: "horizontal" | "vertical";
  noBackgroundColor?: boolean;
  border?: boolean;
}>`

  max-width: 1500px;
  margin: 0 auto;
  gap: 10px;
  display: flex;
  overflow: auto hidden;
  white-space: nowrap;
  width:100%;
  scrollbar-width: none !important;
  // padding: ${({ border }) => border && "18px 60px 0px 60px"};
  position: sticky;
  top: 76px;
  background-color: ${({ noBackgroundColor }) =>
    noBackgroundColor ? "transparent" : brand.white};
  z-index: 999;
  border-bottom: ${({ border }) => border && `1px solid ${primitiveColors.grey401}`};
  ::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
  }
  ::-webkit-scrollbar-thumb {
    background: none !important;
  }
  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      padding: 0px;
      /* height: 100%; */
      flex-direction: column;
    `};
`;

export const StyledMultiTabButton = styled(Typography)<{
  active?: boolean;
  orientation?: "horizontal" | "vertical";
  disableCursor?: boolean;
  customizeColor?: string;
  isSubtab?: boolean;
  isDashboard?: boolean;
}>`
  font-weight: ${fontWeight.medium} !important;
  font-size: ${({ isDashboard }) => isDashboard ? fontSize.b1 : fontSize.b0} !important;
  color: ${({ isDashboard }) => isDashboard ? brand.white : primitiveColors.grey400} !important;
  cursor: pointer;
  word-break: break-word !important;
  height: fit-content;
  margin: ${({ isDashboard }) => isDashboard ? "0 15px 5px 15px !important" : "0px !important"};
  padding: ${({ isDashboard }) => !isDashboard && "0px 24px"} !important;

  ${({ active, isDashboard }) =>
    active &&
    css`
      color: ${isDashboard ? brand.white : primitiveColors.purple500} !important;
      border-bottom: ${isDashboard ? `1px solid ${brand.white}` : `3px solid ${primitiveColors.purple500}`};
    `}
`;


export const StyledChevronRightIcon = styled(ChevronRightIcon)`
  color: ${brand.primaryMain} !important;
`;

export const StyledSubLabelTypography = styled(Typography)<{
  inputColor?: string;
}>`
  font-size: ${fontSize.b2} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${greyScaleColour.grey50} !important;
`;
