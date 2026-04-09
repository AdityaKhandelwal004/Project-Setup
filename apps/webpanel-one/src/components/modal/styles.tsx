import { Typography } from '@mui/material';
import { css, styled } from 'styled-components';
import { colors } from '../../theme/style.palette';
import { fontWeight } from '../../theme/style.typography';

export const StyledContainer = styled.div<{ fitContent?: boolean }>`
  width: ${({ fitContent }) => (fitContent ? 'fit-content' : '25%')};
  min-width: 374px;
  margin: 0 auto;
  margin-top: 128px;
  ${({ fitContent }) => fitContent
    && css`
      max-width: 560px;
    `};
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-direction: column;
`;

export const StyledHeading = styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 20px;
`
export const StyledMainHeading = styled(Typography)`
  color: ${colors.black};
  line-height: normal !important;
`;

export const StyledSubHeading = styled(Typography)`
  color: ${colors.grey50};
  font-weight: ${fontWeight.medium} !important;
`;

export const StyledCloseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  cursor: pointer;
  margin-left: auto;
  margin-top: 5px;
  margin-bottom : 10px;
`;


export const StyledHeadingImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledHeadingImg = styled.img`
  width: 72px;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
