import { TextField } from '@mui/material';
import {styled} from 'styled-components';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { colors, greyScaleColour } from '@mono/theme/style.palette.ts';

export const StyledDateRangeWrapper = styled.div`
  & .MuiList-root {
    display: none !important;
  }
  & .MuiFormControl-root {
    & .MuiList-root {
      display: block !important;
    }
  }
  position: relative;
`;

export const StyledDateRangeTextFieldContainer = styled.div`
  & + .MuiBox-root {
    position: absolute;
    right: 0;
    z-index: 99999 !important;
    & .MuiBox-root:nth-of-type(2) {
      & .MuiPaper-root {
        & .MuiGrid-root {
          & .MuiGrid-root:nth-of-type(2) {
            & .MuiGrid-root:nth-of-type(1) {
              padding: 0px;
              h6,
              .MuiSvgIcon-root[data-testid='ArrowRightAltIcon'] {
                display: none !important;
              }
            }
          }
        }
      }
    }
  }
  .MuiFormControl-root {
    min-width: 100% !important;
  }
`;

export const StyledDateRangeTextField = styled(TextField)`
  max-width: 244px !important;
`;

export const StyledCalendarIcon = styled(CalendarTodayOutlinedIcon)`
  color: ${greyScaleColour.grey100} !important;
`;
