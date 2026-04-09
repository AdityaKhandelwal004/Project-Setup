import { css, styled } from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Select, Typography } from '@mui/material';
import { fontSize } from '../../theme/style.typography';
import { brand, colors } from '../../theme/style.palette';

export const StyledTableContainer = styled(TableContainer)``;

export const StyledTable = styled(Table)``;

export const StyledTableHead = styled(TableHead)``;
export const StyledTableBody = styled(TableBody)``;
export const StyledTableRow = styled(TableRow)`
  /* th:first-child {
      padding-left: 0 !important;
    } */
  th:last-child {
    padding-right: 0 !important;
  }
  th {
    font-weight: 700;
    padding-left: 0;
    padding-right: 40px;
  }
  td {
    padding-left: 0;
  }
`;
export const StyledTableCell = styled(TableCell)`
  font-size: ${fontSize.b1} !important;
`;

export const StyledCellContainer = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const StyledLoadmoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;
export const StyledLoadmoreCta = styled(Typography)`
  font-size: ${fontSize.b3};
  color: ${brand.primaryMain};
  cursor: pointer;
`;

export const StyledActionListContainer = styled.div`
  display: flex;
`;

export const StyledActionItem = styled.div`
  color: ${brand.secondaryMain} !important;
  cursor: pointer;
`;

export const StyledNoDataInfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const StyledNoDataInfo = styled(Typography)``;

export const StyledPaginationContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

export const StyledPaginationLimitContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
export const StyledInfo = styled(Typography)`
  color: ${colors.grey100};
`;

export const StyledSelectPage = styled(Select)`
  & .MuiSelect-select {
    padding: 8px 16px;
    padding-right: 40px !important;
    color: ${brand.secondaryMain} !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${colors.grey30} !important;
  }

  & .MuiSvgIcon-root {
    color: ${brand.secondaryMain} !important;
  }
`;

export const StyledPagesContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const StyledPageContainer = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 4px 8px;
  height: 29px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 24px;
  cursor: pointer;
  background: ${colors.grey30};
  color: ${colors.grey100};
  ${({ active }) => active
    && css`
      background: ${brand.primaryMain};
      color: ${colors.grey30};
    `}
`;

export const SpaceIndicator = styled.div`
  height: 10px; /* Adjust the height of the space as needed */
  background-color: transparent; /* Set the color of the space */
`;
