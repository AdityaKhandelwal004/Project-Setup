import { css, styled } from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Select, Typography } from '@mui/material';
import { fontFamilies, fontSize, fontWeight } from '@mono/theme/style.typography.ts';
import {
  brand,
  colors,
  greyScaleColour,
  primitiveColors,
} from '@mono/theme/style.palette.ts';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const StyledTableContainer = styled(TableContainer)<{MaxHeight?:string,Overflow?:string;}>`
  border:1px solid #CCCCCC;
  border-radius:6px;
    ${({MaxHeight})=>(!!MaxHeight&&css`max-height:${MaxHeight};`)}
  ${({Overflow})=>(!!Overflow&&css`overflow:${Overflow};`)}
`;

export const StyledTable = styled(Table)`

`;

export const StyledTableHead = styled(TableHead)`
  border-bottom: 1px solid ${greyScaleColour.grey15};
  height: 52px;


`;
export const StyledTableBody = styled(TableBody)``;
export const StyledTableRow = styled(TableRow)<{smHeader?:boolean}>`
  ${({smHeader})=>smHeader &&
  css`
    th{
    line-height:18px !important;
    }
  `}}
  th:first-child {
    padding-left: 20px !important;
  }
  th:last-child {
    padding-right: 16px !important;
  }
  th {
    padding-left: 0;
    padding-right: 40px;
    font-size: ${fontSize.b1} !important;
    font-weight: ${fontWeight.semiBold} !important;
    font-family: ${fontFamilies.secondary} !important;
  }
  td {
    padding-left: 0;
    font-size: 16px !important;
    font-family: ${fontFamilies.secondary}!important;

  }
  td:first-child {
    padding-left: 20px !important;
  }

`;
export const StyledTableCell = styled(TableCell)<{smCell?:boolean}>`
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
  gap:10px;
`;

export const StyledActionItem = styled.div`
  color: ${brand.secondaryMain} !important;
  cursor: pointer;
`;

export const StyledNoDataInfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 50px;
`;

export const StyledNoDataInfo = styled(Typography)``;

export const StyledPaginationContainer = styled.div<{noPagination?:boolean}>`
  padding:2px 24px;
  display: flex;
  height:44px;
  justify-content: space-between;
  ${({noPagination})=>(noPagination &&`display:none;`)}
`;

export const StyledPaginationMainContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
`;

export const StyledPaginationLimitContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
export const StyledInfo = styled(Typography)`
  color: ${primitiveColors.neutral500};
  font-weight:${fontWeight.semiBold} !important;
  font-size:${fontSize.b1}!important;
  font-family: ${fontFamilies.secondary}!important;
  line-height:20px;
`;

export const StyledSelectPage = styled(Select)`
 border: none !important;
  width: fit-content !important;
  & .MuiSelect-select {
    padding: 0px;
    padding-right: 35px !important;
    color: ${brand.black} !important;
    border: none !important;
    font-size: ${fontSize.b1} !important;
    font-family: ${fontFamilies.secondary} !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  & .MuiSvgIcon-root {
    color: ${brand.black} !important;
  }
`;

export const StyledPagesContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const StyledPaginationShowContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${greyScaleColour.grey80};
  font-weight:${fontWeight.regular};
  font-size:${fontSize.b2};
  line-height:20px;
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
  background: ${greyScaleColour.grey10};
  color: ${greyScaleColour.grey100};
  ${({ active }) =>
    active &&
    css`
      background: ${brand.primaryMain};
      color: ${greyScaleColour.grey10};
    `}
`;

export const SpaceIndicator = styled.div`
  height: 10px; /* Adjust the height of the space as needed */
  background-color: transparent; /* Set the color of the space */
`;

export const StyledVisibilityIcon = styled(VisibilityOutlinedIcon)`
  color: ${brand.black} !important;
`;

export const StyledArrowDropIcon = styled(ArrowDropDownIcon)`
  color: ${greyScaleColour.grey100} !important;
`;
