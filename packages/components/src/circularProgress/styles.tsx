import { colors, fontFamilies, fontSize, fontWeight } from "@mono/theme";
import { Typography } from "@mui/material";
import styled from "styled-components";



export const CircularProgressContainer = styled.div<{progressWidth?: string, progressHeight?: string}>`
  position: relative;
  width: ${({progressWidth}) => progressWidth || '80px'};
  height: ${({progressHeight}) => progressHeight || '80px'};
`;

export const CircularProgressText = styled.span<{ color: string, largeText?: boolean }>`
  font-size: ${props => props.largeText ? fontSize.barText : fontSize.textSm};
  font-weight: ${fontWeight.semiBold};
  color: ${props => props.color};
`;

export const StyledProgressText = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.inputTitle};
  font-family: ${fontFamilies.secondary};

`;


export const StyledTextContainer = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


