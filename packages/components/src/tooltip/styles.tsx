import React from 'react';
import {styled} from 'styled-components';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import type { TooltipProps } from '@mui/material/Tooltip';
import { brand, colors } from '@mono/theme/style.palette.ts';
import { fontSize } from '@mono/theme/style.typography.ts';



export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: brand.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: brand.white,
      color : brand.black,
      fontSize : `${fontSize.b2}`,
      padding: '8px 16px',
      textAlign : 'center',
      border: `1px solid ${colors.tableBorder}`
    },

  }));