import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { fontSize, fontWeight } from '../../theme/style.typography';
import { brand, colors} from '../../theme/style.palette';

export const DetailCardHeading = styled(Typography)``;

export const StyledImageContainer = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  padding: 8px;
  border: 1px solid ${colors.grey30};
  cursor: pointer;
`;

export const StyledImage = styled.img`
  width: 100%;
`;

export const StyledChildren = styled(Grid)<{ gap: any }>`
  display: flex;
  flex-direction: column !important;
  gap: ${({ gap }) => gap};
`;

export const StyledCardContent = styled(Typography)`
  font-size: ${fontSize.b1};
  font-weight: ${fontWeight.regular};
  color: ${colors.grey100};
  line-height: normal !important;
`;

export const StyledLink = styled(Typography)`
  font-size: ${fontSize.b1};
  font-weight: ${fontWeight.medium} !important;
  color: ${brand.primaryMain};
  text-decoration: underline;
  cursor: pointer;
`;

export const StyledTableHeading = styled(Typography)`
  font-size: ${fontSize.b1} !important;
  font-weight: ${fontWeight.regular} !important;
  color: ${colors.grey100};
  margin-bottom: 8px !important;
  line-height: normal !important;
  min-width: 300px;
`;

export const StyledTableContent = styled(Typography)`
  font-size: ${fontSize.b1} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${colors.black};
  line-height: normal !important;
  min-width: 300px;
`;

export const StyledPhotoContainer = styled.div`
  width: 100px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 0px;
  border-radius: 9999px;
  background-color: ${brand.primaryMain};
`;

export const StyledPhoto = styled(Typography)`
  font-size: 52px !important;
  font-weight: ${fontWeight.regular} !important;
  cursor: pointer;
`;

export const StyledProfileContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 9999px;
`;

export const StyledProfile = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
`;

export const StyledPhotoContent = styled(Typography)`
  font-size: ${fontSize.b1} !important;
  font-weight: ${fontWeight.regular} !important;
  color: ${brand.primaryMain} !important;
  cursor: pointer;
`;

export const StyledFileInput = styled.input`
  display: none;
`;
