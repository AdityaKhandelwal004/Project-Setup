import React from 'react';
import moment from 'moment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Chip, MenuItem } from '@mui/material';
import { MetaData } from '../../models';
import { colors } from '../../theme/style.palette';
import messages from '../../messages';
import {
  StyledActionItem,
  StyledActionListContainer,
  StyledCellContainer,
  StyledInfo,
  StyledNoDataInfo,
  StyledNoDataInfoContainer,
  StyledPageContainer,
  StyledPagesContainer,
  StyledPaginationContainer,
  StyledPaginationLimitContainer,
  StyledSelectPage,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from './styles';
import { Status } from '../../models/modules';

export const formatStr = (str: string): string => str;
export const formatDate = (str: string): string => (str ? moment(str).format('DD MMM YYYY') : '');
export const formatStatus = (row: any) => (
  <Chip
    label={row?.status}
    sx={{
      backgroundColor:
        row?.status === Status.active
          ? colors.green
          : colors.red20,
    }}
  />
)

const paginationLimitOpts = [10, 20, 50];

export interface TableSpec {
  id: string;
  label?: string;
  minWidth?: string | number;

  format?(val: any): JSX.Element | string;

  getValue?(row: any): any;
}

export interface ActionSpec {
  id: string;
  component?: JSX.Element;
  render?: (row: any) => JSX.Element;
  onClick(row: any): void;
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
        .filter((action) => (action?.renderAction ? action?.renderAction(row) : true))
        .map((action) => (
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
  updateLimit,
  handleSort,
  dragItem,
  dragOverItem,
}) => {
  const shouldRenderColumn = (column: string): boolean => !renderColumn || renderColumn(column);

  const hasActions = () => actions && actions?.length > 0;

  const getRowId = (row: Record<string, any>) => (getId ? getId(row) : row.id);

  const titles = () => {
    const updatePagination = updateFilters || (() => undefined);

    const clickTitle = (spec: TableSpec) => {
      if (
        metadata
        && !disableTableSorting
        && (!disableSorting?.includes?.(spec.id))
      ) {
        const toggleOrder = metadata.order === spec.id;
        const newDirection = toggleOrder && metadata.direction === 'asc' ? 'desc' : 'asc';
        updatePagination({
          order: spec.id,
          direction: newDirection,
        });
      }
    };

    return specs
      .filter((spec) => shouldRenderColumn(spec.id))
      .map((spec) => {
        const canSort = !disableTableSorting
          && (!disableSorting?.includes?.(spec.id));
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
                      style={{ color: colors.grey100 }}
                    />
                  ) : (
                    <ArrowUpwardIcon
                      fontSize="medium"
                      style={{ color: colors.grey100 }}
                    />
                  )}
                </>
              )}
            </StyledCellContainer>
          </StyledTableCell>
        );
      })
      .concat(
        hasActions()
          ? [
            <StyledTableCell key={"actions"}>
              {actionLabel || messages.general.action}
            </StyledTableCell>,
          ]
          : [],
      );
  };

  const fields = () => {
    let immutableData = [...data];
    specs.forEach((spec) => {
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
        onDragEnd={() => handleSort(row.id)}
        onDragOver={(e) => e.preventDefault()}
      >
        {specs
          .filter((spec) => shouldRenderColumn(spec.id))
          .map((field) => {
            const formatter = (param: any) => (field.format ? field.format(param) : formatStr(param));
            return (
              <StyledTableCell
                key={`${field.label}@${field.id}`}
                style={{
                  minWidth: field?.minWidth || 'auto',
                  wordBreak: 'break-word',
                  display: field?.id === 'draggable' && 'none',
                  width: field?.id === 'drag' && '70px',
                }}
              >
                {field.id === 'sno'
                  && formatter((metadata?.page - 1) * metadata?.limit + index + 1)}
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
    const pageCount = Math.ceil(metadata?.total / metadata?.limit);
    const pages = [];

    pages.push(
      <StyledPageContainer
        onClick={() => {
          if (pageCount > 1) {
            fetchPage(metadata?.page - 1);
          }
        }}
      >
        <ChevronLeftRoundedIcon
          style={{
            color: colors.grey100,
          }}
        />
      </StyledPageContainer>,
    );
    for (let i = 1; i <= pageCount; i += 1) {
      pages.push(
        <StyledPageContainer
          active={i === metadata?.page}
          onClick={() => fetchPage(i)}
        >
          {i}
        </StyledPageContainer>,
      );
    }
    pages.push(
      <StyledPageContainer
        onClick={() => {
          if (pageCount !== metadata?.page) {
            fetchPage(metadata?.page + 1);
          }
        }}
      >
        <ChevronRightRoundedIcon
          style={{
            color: colors.grey100,
          }}
        />
      </StyledPageContainer>,
    );

    return pages;
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>{titles()}</StyledTableRow>
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
        <StyledPaginationContainer>
          <StyledPaginationLimitContainer>
            <StyledInfo variant="body1">
              {messages?.general?.showing}
            </StyledInfo>
            <StyledSelectPage
              IconComponent={ExpandMoreRoundedIcon}
              value={metadata?.limit}
              onChange={(event: any) => {
                if (updateLimit) {
                  updateLimit(event?.target?.value);
                }
              }}
            >
              {paginationLimitOpts?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </StyledSelectPage>
          </StyledPaginationLimitContainer>
          <StyledPagesContainer>{pagination()}</StyledPagesContainer>
        </StyledPaginationContainer>
      )}
    </StyledTableContainer>
  );
};

export default React.memo(Table);
