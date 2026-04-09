import {
  Grid, Link, Typography, Chip,
} from '@mui/material';
import styled from 'styled-components';
import { respondTo } from '../../theme/style.layout';
import { fontSize, fontWeight } from '../../theme/style.typography';
import { brand, colors } from '../../theme/style.palette';

export const StyledPanel = styled.div`
  display: flex;
  width: 696px;
  height: calc(100vh - 50px);
  border-radius: 16px;
  background: ${brand.secondaryMain};
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  ${respondTo.mdDown} {
    width: 450px;
  }
  ${respondTo.screenDown(850)} {
    width: 360px;
  }
  ${respondTo.smOnly} {
    display: none;
  }
`;

export const StyledGridContainer = styled(Grid)`
  padding: 40px;
  padding-bottom: 142px;
  display: flex;
  flex-direction: column;
  color : white;
`;

export const StyledScreenWrapper = styled.div`
  display: flex;
  gap: 64px;
  padding: 24px;
  padding-right: 32px;
  ${respondTo.mdDown} {
    gap: 20px;
  }
`;

export const StyledFormContainer = styled.div`
  margin: 0 auto;
  align-self: center;
  ${respondTo.mdDown} {
    width: 300px;
  }
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 310px;
`;
export const StyledFormHeading = styled(Typography)`
  font-weight: ${fontWeight.semiBold} !important;
  font-size: ${fontSize.h1} !important;
  margin-top: 18px !important;
`;
export const StyledFormSubHeading = styled(Typography)`
  margin-top: 18px !important;
  font-weight: ${fontWeight.regular} !important;
  font-size: ${fontSize.b1} !important;
  color: ${colors.grey100};
`;
export const StyledLink = styled(Link)`
  font-size: ${fontSize.b2} !important;
  font-weight: ${fontWeight.regular} !important;
`;

export const StyledLogoContainer = styled(Grid)`
  width: 141px;
  height: 37px;
`;

export const StyledLogo = styled.img`
  width: 100%;
`;

export const StyledPanelInfo = styled(Typography)`
  color: ${colors.white};
  font-size: 56px !important;
  font-weight: ${fontWeight.semiBold} !important;
  line-height: 120% !important;
  ${respondTo.mdDown} {
    font-size: 44px !important;
  }
`;
export const StyledPanelSubInfo = styled(Typography) <{
  fontsize?: string;
  fontweight?: number;
}>`
  color: ${colors.white};
  font-size: ${({ fontsize }) => fontsize || fontSize.b1} !important;
  font-weight: ${({ fontweight }) => fontweight || fontWeight.regular} !important;
  line-height: normal !important;
  ${respondTo.mdDown} {
    font-size: ${fontSize.b2} !important;
  }
`;
export const StyledWord = styled.span`
  color: ${brand.primaryMain};
`;

export const StyledLinkContainer = styled.a`
  &:hover {
    color: ${brand.primaryMain} !important;
    & .MuiSvgIcon-root {
      color: ${brand.primaryMain} !important;
    }
  }
  text-decoration: none;
`;

export const StyledImageContainer = styled(Grid)`
  padding: 0 !important;
  padding-left: 1px !important;
`;

export const StyledImageContent = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 113px;
  padding: 0 !important;
`;

export const StyledLoginChip = styled(Chip)`
  &&.MuiChip-root {
    height: 26px !important;
    padding: 12px 4px !important;
    font-size: ${fontSize.b2} !important;
    background-color: ${brand.primaryMain} !important;
    font-weight: ${fontWeight.medium} !important;
    color: ${brand.primaryMain} !important;
  }
`;
