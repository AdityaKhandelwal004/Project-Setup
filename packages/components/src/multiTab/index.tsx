import React from "react";
import {
  StyledChevronRightIcon,
  StyledMultiTabButton,
  StyledMultiTabMainContainer,
  StyledSubLabelTypography,
} from "./styles.tsx";
// import { Id, TabsInterface } from "../../models/baseEntities";
import { useDispatch } from "react-redux";
import type { Id, TabsInterface as BaseTabsInterface } from "@mono/models";

type TabsInterface = BaseTabsInterface & {
  role?: string | string[];
};

interface Props {
  tabs: TabsInterface[];
  activeTabName?: string;
  activeTab?: Id;
  setActiveTab?: (tab:TabsInterface) => void;
  push?: any;
  orientation?: "horizontal" | "vertical";
  noBackgroundColor?: boolean;
  onTabChange?: any;
  customColor?: boolean;
  isSubtab?: boolean;
  border?: boolean;
  isDashboard?: boolean;
  tabStyle?: React.CSSProperties;
}

const MultiTabComponent: React.FC<Props> = ({
  tabs,
  activeTab,
  setActiveTab,
  activeTabName,
  push,
  noBackgroundColor = true,
  orientation = "horizontal",
  onTabChange,
  isSubtab = false,
  customColor = false,
  border = false,
  isDashboard = false,
  tabStyle
}) => {
  

  // const handleChange = async (tab: TabsInterface) => {
  //   if (onTabChange) {
  //     const data = await onTabChange();
  //     if (data) {
  //       setActiveTab(tab?.id);
  //     }
  //   } else {
  //     setActiveTab(tab?.id);
  //   }
  // }

  
  return (
    <StyledMultiTabMainContainer
      orientation={orientation}
      noBackgroundColor={noBackgroundColor}
      border={border}
      style={tabStyle}
    >
      {tabs?.map((tab) => (
        <StyledMultiTabButton
          disableCursor={tab?.disabledRoute}
          onClick={() => {
            setActiveTab && setActiveTab(tab);
          }}
          active={tab?.label == activeTab || activeTab === tab?.id}
          key={tab?.id}
          orientation={orientation}
          customizeColor={customColor}
          isSubtab={isSubtab}  
          isDashboard={isDashboard}
        >
          {tab?.label}
          {orientation === "vertical" &&
            (tab?.label === activeTabName || activeTab === tab?.id) && (
              <StyledChevronRightIcon />
            )}
        </StyledMultiTabButton>
      ))}
    </StyledMultiTabMainContainer>
  );
};

export default MultiTabComponent;
