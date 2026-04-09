import { Typography } from '@mui/material';
import styled from 'styled-components';
import { brand, colors } from '../../theme/style.palette';
import { fontSize } from '../../theme/style.typography';

export const StyledContainer = styled.div``;
export const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
export const Container = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledHeading = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  color: ${brand.primaryMain};
`;

export const StyledSubHeading = styled.div`
  font-size: 16px;
  color: ${colors.grey100};
`;

export const StepInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 50px;
`;

export const StyledProgressBarWrapper = styled.div`
  padding: 0 50px;
`;

export const StyledFormTitle = styled.div<{ color?: string; fontSize?: string }>`
  font-size : ${(props) => props.fontSize ? props.fontSize : fontSize.h4};
  color : ${(props) => props.color ? props.color : brand.primaryMain};
`;

export const StyledFormContainer = styled.div`
  padding : 0 50px;
  `
  
  export const StyledButtonGroup = styled.div`
  padding : 0 50px;
`