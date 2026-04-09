import styled from 'styled-components';
import { optimiseTheme } from '@mono/theme/modules/optimise.theme';


export const CardContainer = styled.div`
  background: ${optimiseTheme.colors.background};
  border-radius: 10px;
  padding: 18px 14px;
  position: relative;
  border: 1px solid rgba(97, 48, 223, 0.3);
`;

export const ContentWrapper = styled.div<{ centered: boolean; sectionCount: number }>`
  display: flex;
  gap: ${props => props.sectionCount > 1 ? '24px' : '0'};
  align-items: flex-start;
  justify-content: ${props => props.centered ? 'center' : 'flex-start'};
  flex-wrap: wrap;
`;

export const SectionContainer = styled.div<{ isFlexOne?: boolean }>`
  ${props => props.isFlexOne ? 'flex: 1;' : ''}
  min-width: 0;
`;

export const SectionLabel = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #474747;
  margin-bottom: 7.5px;
  white-space: nowrap;
`;

export const AmountText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: ${optimiseTheme.components.header.primary.letterSpacing};
  color: #2D2D2D;
  white-space: nowrap;
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
