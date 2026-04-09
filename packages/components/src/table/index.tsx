import React, { useState } from 'react';
import type { JSX } from 'react';
import moment from 'moment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Chip, Grid2, MenuItem, Typography } from '@mui/material';
import type { statusEntities } from '@mono/models';
import { otherColour } from '@mono/theme/style.palette.ts';
import type { MetaData } from '@mono/models';
import MuiCheckBox from '../checkbox/index.tsx';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette.ts';
import messages from '@mono/messages';
import {
  StyledActionItem,
  StyledActionListContainer,
  StyledArrowDropIcon,
  StyledCellContainer,
  StyledInfo,
  StyledNoDataInfo,
  StyledNoDataInfoContainer,
  StyledPageContainer,
  StyledPagesContainer,
  StyledPaginationContainer,
  StyledPaginationLimitContainer,
  StyledPaginationMainContainer,
  StyledPaginationShowContainer,
  StyledSelectPage,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from './styles.tsx';
import { Status } from '@mono/models/src/modules.tsx';
import { fontFamilies, fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { formatStatus as formatCustomStatus } from '@mono/utils/src/commonFunctions.tsx';
export const formatStr = (str: string): string => str;
export const formatDate = (str: string): string =>
  str ? moment(str).format('DD MMM YYYY') : '';
export const formatStatus = (row: any) => (
  <Chip
    label={formatCustomStatus(row?.status)}
    sx={{
      backgroundColor:
        row?.status === Status.active ? colors.successBg : colors.errorBg,
      borderRadius: '4px',
      padding: '4px 8px',
      color:
        row?.status === Status.active
          ? colors.successDefault
          : colors.errorDefault,
    }}
  />
);
export const leaderRoleChip = (role: string) => {
  const isLeader = role === 'LEADER';

  return isLeader ? (
    <Chip
      label="Leader"
      sx={{
        backgroundColor: brand.primary20,
        borderRadius: '6px',
        padding: '4px 8px 4px 8px',
        fontSize: `${fontSize.b1}`,
        height: '26px',
        gap: '10px',
        width: '58px',
        color: brand.primary100,
      }}
    />
  ) : null;
};
export const entityStatusTag = (status: statusEntities) => {
  const statusCategory = (() => {
    if (['Completed', 'Assessment Ended', 'Report Sent'].includes(status))
      return 'completed';
    if (['Not Started', 'Not Sent', 'Scheduled', 'Queued'].includes(status))
      return 'notStarted';
    return 'inProgress';
  })();

  return (
    <Chip
      label={formatCustomStatus(status)}
      sx={{
        backgroundColor: otherColour[`${statusCategory}Bg`],
        borderRadius: '6px',
        padding: '4px 8px',
        fontSize: fontSize.b1,
        height: '26px',
        minWidth: '90px',
        gap: '10px',
        color: otherColour[`${statusCategory}Default`],
      }}
    />
  );
};

const paginationLimitOpts = [10, 20, 50];
export interface TableSpec {
  id: string;
  label?: string;
  minWidth?: string | number;
  format?(val: any): JSX.Element | string;
  getValue?(row: any): any;
  customCellStyle?: {};
}
export interface ActionSpec {
  id: string;
  component?: JSX.Element;
  render?: (row: any) => JSX.Element;
  onClick(event: React.MouseEvent<HTMLElement>, row: any): void;
  renderAction?: (row: any) => void;
}
export interface TableProps {
  specs: TableSpec[];
  data: Record<string, any>[];
  metadata?: MetaData<any>;
  emptyMessage?: string;
  disableSorting?: string[];
  disableTableSorting?: boolean;
  actions?: ActionSpec[];
  actionLabel?: string;
  renderColumn?(column: string): boolean;
  updateFilters?(param: Partial<MetaData<any>>): void;
  getId?(param: Record<string, any>): any;
  fetchPage?(page?: number): void;
  updateLimit?(limit?: number): void;
  handleSort?: (id: string) => void;
  dragItem?: React.MutableRefObject<any>;
  dragOverItem?: React.MutableRefObject<any>;
  smHeader?: boolean;
  tableMaxheight?: string;
  tableOverflow?: string;
  noPagination?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  enableRowSelection?: boolean;
}
export const ActionMenu: React.FC<{
  actions: ActionSpec[];
  row: Record<string, any>;
}> = ({ actions, row }) => {
  const handleClick = (actionClick?: any) => {
    if (actionClick) {
      actionClick(row);
    }
  };
  return (
    <StyledActionListContainer>
      {actions
        .filter(action =>
          action?.renderAction ? action?.renderAction(row) : true
        )
        .map(action => (
          <StyledActionItem
            key={action.id}
            onClick={() => handleClick(action.onClick)}
          >
            {action.component}
            {action.render?.(row)}
          </StyledActionItem>
        ))}
    </StyledActionListContainer>
  );
};
const Table: React.FC<TableProps> = ({
  data,
  specs,
  onSelectionChange,
  metadata,
  disableSorting,
  actions,
  emptyMessage,
  disableTableSorting,
  actionLabel,
  updateFilters,
  renderColumn,
  getId,
  fetchPage,
  enableRowSelection,
  updateLimit,
  handleSort,
  dragItem = { current: null },
  dragOverItem = { current: null },
  smHeader,
  tableMaxheight,
  tableOverflow,
  noPagination,
}) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const shouldRenderColumn = (column: string): boolean =>
    !renderColumn || renderColumn(column);
  const hasActions = () => actions && actions?.length > 0;
  const getRowId = (row: Record<string, any>) => (getId ? getId(row) : row.id);

  const handleSelectRow = (id: string) => {
    const newSelectedRows = {
      ...selectedRows,
      [id]: !selectedRows[id],
    };

    const filteredSelectedRows = Object.fromEntries(
      Object.entries(newSelectedRows).filter(([_, isSelected]) => isSelected)
    );

    setSelectedRows(filteredSelectedRows);

    if (onSelectionChange) {
      const selectedIds = Object.keys(filteredSelectedRows);
      onSelectionChange(selectedIds);
    }
  };

  const handleSelectAll = () => {
    const allSelected = Object.keys(selectedRows).length === data.length;
    const newSelections = allSelected
      ? {}
      : Object.fromEntries(data.map(row => [getRowId(row), true]));

    setSelectedRows(newSelections);

    // Emit selected IDs to Parent Component
    if (onSelectionChange) {
      const selectedIds = allSelected ? [] : data.map(row => getRowId(row));
      onSelectionChange(selectedIds);
    }
  };

  const titles = () => {
    const updatePagination = updateFilters || (() => undefined);
    const clickTitle = (spec: TableSpec) => {
      if (
        metadata &&
        !disableTableSorting &&
        !disableSorting?.includes?.(spec.id)
      ) {
        const toggleOrder = metadata.order === spec.id;
        const newDirection =
          toggleOrder && metadata.direction === 'asc' ? 'desc' : 'asc';
        updatePagination({
          order: spec.id,
          direction: newDirection,
        });
      }
    };

    return [
      ...(enableRowSelection && data.length > 0
        ? [
            <StyledTableCell key="selectAll">
              <MuiCheckBox
                value={
                  Object.keys(selectedRows).length === data.length || false
                }
                onChange={handleSelectAll}
              />
            </StyledTableCell>,
          ]
        : []),
      ...specs
        .filter(spec => shouldRenderColumn(spec.id))
        .map(spec => {
          const canSort =
            !disableTableSorting && !disableSorting?.includes?.(spec.id);
          const showIcon = metadata && canSort && metadata?.order === spec.id;
          return (
            <StyledTableCell
              key={spec.label || `_id_${spec.id}`}
              onClick={() => clickTitle(spec)}
              style={{
                minWidth: spec?.minWidth || 'auto',
                display: spec?.id === 'draggable' && 'none',
              }}
            >
              <StyledCellContainer>
                {spec.label || ''}
                {showIcon && (
                  <>
                    {metadata?.direction === 'asc' ? (
                      <ArrowDownwardIcon
                        fontSize="medium"
                        style={{ color: greyScaleColour.grey100 }}
                      />
                    ) : (
                      <ArrowUpwardIcon
                        fontSize="medium"
                        style={{ color: greyScaleColour.grey100 }}
                      />
                    )}
                  </>
                )}
              </StyledCellContainer>
            </StyledTableCell>
          );
        }),
    ].concat(
      hasActions()
        ? [<StyledTableCell key={'actions'}>{actionLabel}</StyledTableCell>]
        : []
    );
  };

  const fields = () => {
    let immutableData = [...data];
    specs.forEach(spec => {
      if (spec.getValue) {
        immutableData = immutableData.map((row: Record<string, any>) => ({
          ...row,
          [spec.id]: spec.getValue?.(row),
        }));
      }
    });
    Object.freeze(immutableData);
    return immutableData.map((row: Record<string, any>, index?: number) => (
      <StyledTableRow
        key={getRowId(row)}
        draggable={!!row?.draggable}
        onDragStart={() => (dragItem.current = index)}
        onDragEnter={() => (dragOverItem.current = index)}
        onDragEnd={() => handleSort && handleSort(row?.id)}
        onDragOver={e => e.preventDefault()}
      >
        {enableRowSelection && data.length > 0 && (
          <StyledTableCell>
            <MuiCheckBox
              value={!!selectedRows[getRowId(row)] || false}
              // checked={!!selectedRows[getRowId(row)]}
              onChange={() => handleSelectRow(getRowId(row))}
            />
          </StyledTableCell>
        )}
        {specs
          .filter(spec => shouldRenderColumn(spec.id))
          .map(field => {
            const formatter = (param: any) =>
              field.format ? field.format(param) : formatStr(param);

            return (
              <StyledTableCell
                key={`${field.label}@${field.id}`}
                style={{
                  minWidth: field?.minWidth || 'auto',
                  wordBreak: 'break-word',
                  display: field?.id === 'draggable' && 'none',
                  width: field?.id === 'drag' && '70px',
                   textAlign: field?.align || 'left',
                  ...(field?.customCellStyle || {}),
                }}
              >
                {field.id === 'sno' &&
                  formatter((metadata?.page - 1) * metadata?.limit + index + 1)}
                {formatter(row[field.id])}
              </StyledTableCell>
            );
          })}
        {hasActions() && (
          <StyledTableCell key="actionButtons">
            <ActionMenu actions={actions} row={row} />
          </StyledTableCell>
        )}
      </StyledTableRow>
    ));
  };
  const pagination = () => {
  const pageCount = Math.ceil(Number(metadata?.total) / Number(metadata?.limit));
  const currentPage = Number(metadata?.page);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < pageCount;

  const pages = [];

  // Previous
  pages.push(
    <ChevronLeftRoundedIcon
      style={{
        color: hasPrev ? brand.black : greyScaleColour.grey20,
        cursor: hasPrev ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (hasPrev && fetchPage) {
          fetchPage(currentPage - 1);
        }
      }}
    />
  );

  // Next
  pages.push(
    <ChevronRightRoundedIcon
      style={{
        color: hasNext ? brand.black : greyScaleColour.grey20,
        cursor: hasNext ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (hasNext && fetchPage) {
          fetchPage(currentPage + 1);
        }
      }}
    />
  );

  return pages;
};
  return (
    <StyledTableContainer MaxHeight={tableMaxheight} Overflow={tableOverflow}>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow smHeader={smHeader}>{titles()}</StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>{[fields()]}</StyledTableBody>
      </StyledTable>
      {data.length === 0 && (
        <StyledNoDataInfoContainer>
          <StyledNoDataInfo variant="body1">
            {emptyMessage || messages?.general?.noData}
          </StyledNoDataInfo>
        </StyledNoDataInfoContainer>
      )}

      {data.length !== 0 && fetchPage && (
        <StyledPaginationContainer noPagination={noPagination}>
          <StyledPaginationMainContainer>
            <StyledPaginationLimitContainer>
              <StyledInfo variant="body1">
                {messages?.general?.showing}
              </StyledInfo>
              <StyledSelectPage
                IconComponent={StyledArrowDropIcon}
                value={metadata?.limit}
                onChange={(event: any) => {
                  if (updateLimit) {
                    updateLimit(event?.target?.value);
                  }
                }}
              >
                {paginationLimitOpts?.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </StyledSelectPage>
            </StyledPaginationLimitContainer>
            <Grid2 display={'flex'} alignItems={'center'}>
            <StyledPaginationShowContainer>
              <Typography fontWeight={fontWeight.semiBold} fontFamily={fontFamilies.secondary}>
                {(metadata?.page - 1) * metadata?.limit + 1}-
                {metadata?.limit * metadata?.page > metadata?.total
                  ? metadata?.total
                  : metadata?.limit * metadata?.page}{' '}
                of {metadata?.total}
              </Typography>
            </StyledPaginationShowContainer>
            <StyledPagesContainer>{pagination()}</StyledPagesContainer>
            </Grid2>
          </StyledPaginationMainContainer>
        </StyledPaginationContainer>
      )}
    </StyledTableContainer>
  );
};

export default React.memo(Table);
