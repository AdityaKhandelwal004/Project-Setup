import styled from 'styled-components';
import { optimiseTheme } from '@mono/theme/modules/optimise.theme';
import { moduleStyles } from '@mono/utils';
import { TabModule } from '../../../models';
import { fontFamilies, fontSize, fontWeight, greyScaleColour } from '@mono/theme';

export const HeaderContainer = styled.div<{ centered?: boolean }>`
  margin-bottom: ${optimiseTheme.components.header.primary.marginBottom};
  text-align: ${props => props.centered ? 'center' : 'left'};
`;

export const Title = styled.h1<{currentModule?: string}>`
  font-family: ${optimiseTheme.components.header.primary.fontFamily};
  font-size: ${optimiseTheme.components.header.primary.fontSize};
  font-weight: ${optimiseTheme.components.header.primary.fontWeight};
  line-height: ${optimiseTheme.components.header.primary.lineHeight};
  letter-spacing: ${optimiseTheme.components.header.primary.letterSpacing};
  color: ${({currentModule}) => currentModule ? moduleStyles[currentModule]?.color : optimiseTheme.components.header.primary.color};
  margin: 0;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-family: ${fontFamilies.secondary};
  font-size: ${fontSize.textMd}
  font-weight: ${fontWeight.medium};
  line-height: 24px;
  letter-spacing: ${optimiseTheme.components.header.subtitle.letterSpacing};
  color: ${greyScaleColour.grey50};
  margin: 0;
`;
