import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { Grid2 } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionTitle,
  CheckCircleIcon,
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledHistoryToggleIcon,
  StyledSubtitle,
  StyledTimeOutIcon,
} from './styles.tsx';

interface Props {
  children: JSX.Element | JSX.Element[];
  header?: JSX.Element | JSX.Element[];
  headerCss?: SxProps<Theme>;
  detailsCss?: SxProps<Theme>;
  title?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onHeaderClick: () => void;
  handleSectionCompleted?: () => void;
  noGreyBorder?: boolean;
  isEmployee?: boolean;
  formValues?: any;
  selectedCount?: any;
  subFactors?: any;
  onExpandNext?: (nextSectionTitle: string) => void;
  isExpanded?: boolean;
}

type SectionCount = {
  title: string;
  count: number;
  totalCount: number;
};

const Accordion: React.FC<Props> = ({
  header,
  title,
  children,
  detailsCss,
  headerCss,
  selectedCount,
  isExpanded,
  noGreyBorder,
  isEmployee,
  onHeaderClick,
  handleSectionCompleted,
}) => {
  // Find section count
  const section = selectedCount?.find(
    (item: SectionCount) => item.title === title
  );
  const count = section?.count || 0;
  const totalCount = section?.totalCount || 0;

  // Effect to auto-collapse when completed & open the next section
  useEffect(() => {
    if (count === totalCount && totalCount > 0 && handleSectionCompleted) {
      //Auto-collapse
      handleSectionCompleted();
    }
  }, [count, totalCount]);
  return (
    <StyledAccordion
      expanded={!!isExpanded}
      noGreyBorder={noGreyBorder}
      isEmployee={isEmployee}
      id={title}
    >
      <StyledAccordionSummary
        onClick={onHeaderClick}
        sx={headerCss}
        expandIcon={<ExpandMoreIcon sx={{ pointerEvents: 'auto' }} />}
        isExpanded={!!isExpanded}
      >
        {header}
        <StyledSubtitle>
          <Grid2>
          </Grid2>
        </StyledSubtitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={detailsCss}>
        {children}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;
