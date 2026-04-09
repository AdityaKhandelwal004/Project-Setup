import Button from '@mui/material/Button';
import styled from 'styled-components';

export const StyledButton = styled(Button)<{
  fullWidth?: boolean;
  btnType?: string;
}>`
  padding: ${(props) => (props.btnType === 'primary' ? '8px 18px' : '16px 18px ')} !important;
  white-space: nowrap;
`;
