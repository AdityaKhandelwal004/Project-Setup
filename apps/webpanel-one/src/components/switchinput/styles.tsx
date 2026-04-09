import styled from "styled-components";
import { Typography } from "@mui/material";
import { colors } from "../../theme/style.palette";

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledError = styled(Typography)`
  margin-top: 8px !important;
  color: ${colors.red100};
`;
