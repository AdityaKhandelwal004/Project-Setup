import React from 'react';

import {
  HeaderContainer,
  Title,
  Subtitle,
} from './styles';
import { TabModule } from '../../models';

interface OptimiseHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
    currentModule?: string;
}

export const OptimiseHeader: React.FC<OptimiseHeaderProps> = ({
  title,
  subtitle,
  centered = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
   currentModule = TabModule.OPTIMISE
}) => (
  <HeaderContainer centered={centered} className={className} >
    <Title className={titleClassName}  currentModule={currentModule}>
      {title}
    </Title>
    {subtitle && (
      <Subtitle className={subtitleClassName}>
        {subtitle.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < subtitle.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </Subtitle>
    )}
  </HeaderContainer>
);

export default OptimiseHeader;
