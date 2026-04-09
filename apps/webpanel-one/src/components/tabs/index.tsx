import React from 'react';
import {
  StyledTabsContainer,
  StyledTabsHeaderContainer,
  StyledTabsInnerContainer,
  StyledTabsItem,
} from './styles';
import { useLocation } from 'react-router-dom';

interface HeaderItemProps {
  key: string;
  label: string;
}

interface Props {
  headerItems?: HeaderItemProps[];
  orientation: 'vertical' | 'horizontal';
  children?: any;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  value?: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabs: React.FC<Props> = ({
  headerItems,
  orientation,
  children,
  value,
}) => {
  const location = useLocation();

  return (
    <StyledTabsContainer orientation={orientation}>
      <StyledTabsInnerContainer orientation={orientation}>
        <StyledTabsHeaderContainer
          value={value}
          orientation={orientation}
        >
          {headerItems.map((headerItem: HeaderItemProps, index: number) => (
            <StyledTabsItem
              key={headerItem.key}
              label={headerItem.label}
              disableRipple
              href={location.pathname.split('/').slice(0,-1).join('/') + `/${headerItem.key}`}
              component="a" 
              {...a11yProps(index)}
            />
          ))}
        </StyledTabsHeaderContainer>
      </StyledTabsInnerContainer>
      {React.Children.map(children, (child, childIndex) => value === childIndex && React.cloneElement(child))}
    </StyledTabsContainer>
  );
};

export default CustomTabs;
