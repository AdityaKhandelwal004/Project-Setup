import { borderRadius, fontSize, fontWeight, greyScaleColour } from '@mono/theme';
import styled from 'styled-components';
import TextInput from '../textInput/index.tsx';

export const StyledOTPInputBox = styled.div`
  display: flex;
  gap: 22px;
  justify-content: flex-start;
`;

export const StyledOTPInput = styled(TextInput)`
  width: 50px;
  height: 48px;
  text-align: center;
  & input {
     text-align: center;
  }

`;
