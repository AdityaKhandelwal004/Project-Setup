import React from 'react';
import { useLocation } from 'react-router-dom';
import { StyledTabsContainer, StyledTabsHeaderContainer, StyledTabsItem, StyledTabsInnerContainer } from './styles.tsx';

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

const CustomTabs: React.FC<Props> = ({ headerItems, orientation, children, value, setValue }) => {
  const location = useLocation();

  const handleTabChange = (index: number) => {
    setValue && setValue(index);
  };

  return (
    <StyledTabsContainer orientation={orientation}>
      <StyledTabsInnerContainer orientation={orientation}>
        <StyledTabsHeaderContainer>
          {headerItems?.map((headerItem, index) => (
            <StyledTabsItem
              key={headerItem.key}
              active={value === index} // Apply active styles based on current value
              onClick={() => handleTabChange(index)}
            >
              {headerItem.label}
            </StyledTabsItem>
          ))}
        </StyledTabsHeaderContainer>
      </StyledTabsInnerContainer>
      {React.Children.map(children, (child, childIndex) => value === childIndex && React.cloneElement(child))}
    </StyledTabsContainer>
  );
};

export default CustomTabs;
