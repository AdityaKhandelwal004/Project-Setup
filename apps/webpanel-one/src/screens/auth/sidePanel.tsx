import React from 'react';
import { Grid } from '@mui/material';
import {
  StyledGridContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledPanel,
  StyledPanelInfo,
  StyledPanelSubInfo,
  StyledImageContent,
  StyledWord,
  StyledImageContainer,
} from './styles';
import { fontSize, fontWeight } from '../../theme/style.typography';

const SidePanel: React.FC = () => (
  <StyledPanel>
    <StyledGridContainer container>
      <h1>Enter Login Credentials</h1>
    </StyledGridContainer>
  </StyledPanel>
);

export default SidePanel;
