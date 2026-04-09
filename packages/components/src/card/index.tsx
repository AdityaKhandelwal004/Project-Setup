import React from 'react';
import type { JSX }  from 'react';
import { Grid2 } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import {
  CardTitle,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
} from './styles.tsx';

interface Props {
  children?: JSX.Element | JSX.Element[];
  cardCss?: SxProps<Theme>;
  contentCss?: SxProps<Theme>;
  header?: JSX.Element | JSX.Element[];
  headerCss?: React.CSSProperties;
  noHeader?: boolean;
  title?: string;
  noHeaderPadding?: boolean;
  index?: number;
  value?: number;
  // tabContent?: { heading: string; subHeading?: string; buttonComponent?: any };
  orientation?: 'vertical' | 'horizontal';
  onClick?: () => void;
}

const Card: React.FC<Props> = ({
  children,
  cardCss,
  header,
  contentCss,
  headerCss,
  noHeader,
  title,
  index,
  value,
  noHeaderPadding,
  ...other
}) => (
  <StyledCard sx={cardCss} hidden={value !== index} {...other}>
    {!noHeader && (
      <StyledCardHeader style={headerCss} noHeaderPadding={noHeaderPadding}>
        {header}
        {title && (
          <Grid2 container alignItems="center" justifyContent="space-between">
            <Grid2>
              <CardTitle variant="subtitle1">{title}</CardTitle>
            </Grid2>
          </Grid2>
        )}
      </StyledCardHeader>
    )}
    <StyledCardContent sx={contentCss}>{children}</StyledCardContent>
  </StyledCard>
);

export default Card;
