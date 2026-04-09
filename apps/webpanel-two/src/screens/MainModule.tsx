import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mono/components';
import { Separator } from '../myComponents/separator';
import { Header } from '../myComponents/layout';
import { OptimiseModule } from './optimise/OptimiseModule';
import { MaximiseModule } from './maximise';
import { ProtectModule } from './protect';
import routes, { mainModuleTabs, type MainModuleTab } from '../myUtils/routes';
import optimiseIcon from '../../public/assets/images/optimiseIcon.png';
import protect from '../assets/protect.png';
import maximise from '../assets/maximise.png';
import { moduleStyles } from '@mono/utils';
import { TabModule } from '../models';
import { fontFamilies } from '@mono/theme';


const MainNavigationContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
`;

const StyledMainNavigationButton = styled(Button)<{
  $isActive: boolean;
  currentModule: string;
}>`
  && {
    display: flex !important;
    flex-direction: row !important;
    line-height: 18px !important;
    align-items: center !important;
    gap: 14px !important;
    padding: 16px 24px !important;
    width: 183px !important;
    height: 50px !important;
    text-transform: none !important;
    color: ${props => props.$isActive ? moduleStyles[props.currentModule]?.color : '#9ca3af'} !important;
    background-color: transparent !important;
    border-bottom: ${props => props.$isActive ? `4px solid ${moduleStyles[props.currentModule]?.color}` : '4px solid transparent'} !important;
    border-radius: 0 !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    opacity: 1 !important;
    transform: rotate(0deg) !important;
    font-family: ${fontFamilies.primary} !important;

    &:hover {
      background-color: transparent !important;
      color: ${props => props.$isActive ?  moduleStyles[props.currentModule]?.color : '#6b7280'} !important;
    }

    img {
      width: 36px !important;
      height: 36px !important;
    }
  }
`;

interface MainModuleProps {
  onComplete?: (data: any) => void;
  onBack?: () => void;
  initialMainTab?: MainModuleTab;
  initialSubTab?: string;
}

export function MainModule({ onComplete, onBack, initialMainTab, initialSubTab }: MainModuleProps) {
  const [activeMainTab, setActiveMainTab] = useState<MainModuleTab>(initialMainTab || mainModuleTabs.optimize);
  const history = useHistory();

  // Sync activeMainTab when initialMainTab changes (from URL navigation)
  useEffect(() => {
    if (initialMainTab && initialMainTab !== activeMainTab) {
      setActiveMainTab(initialMainTab);
    }
  }, [initialMainTab]);


  const handleMainTabChange = (tab: MainModuleTab) => {
    setActiveMainTab(tab);
    
    switch (tab) {
      case mainModuleTabs.optimize:
        history.push(routes.budget);
        break;
      case mainModuleTabs.maximise:
        history.push(routes.super);
        break;
      case mainModuleTabs.protect:
        history.push(routes.insurance);
        break;
    }
  };

  const renderMainContent = () => {
    switch (activeMainTab) {
      case mainModuleTabs.optimize:
        return <OptimiseModule onComplete={onComplete} onBack={onBack} initialSubTab={initialSubTab} />;
      case mainModuleTabs.maximise:
        return <MaximiseModule initialSubTab={initialSubTab} />;
      case mainModuleTabs.protect:
        return <ProtectModule initialSubTab={initialSubTab} />;
      default:
        return <OptimiseModule onComplete={onComplete} onBack={onBack} initialSubTab={initialSubTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto w-[900px]">
        {/* Header - Common for all tabs */}
        <Header />

        {/* Main Navigation Tabs */}
        <MainNavigationContainer>
          <StyledMainNavigationButton
            variant="text"
            onClick={() => handleMainTabChange(mainModuleTabs.optimize)}
            img={optimiseIcon}
            label="Optimise"
            $isActive={activeMainTab === mainModuleTabs.optimize}
            currentModule= {TabModule.OPTIMISE}
          />
          <StyledMainNavigationButton
            variant="text"
            onClick={() => handleMainTabChange(mainModuleTabs.maximise)}
            img={maximise}
            label="Maximise"
            $isActive={activeMainTab === mainModuleTabs.maximise}
            currentModule= {TabModule.MAXIMISE}
          />
          <StyledMainNavigationButton
            variant="text"
            onClick={() => handleMainTabChange(mainModuleTabs.protect)}
            img={protect}
            label="Protect"
            $isActive={activeMainTab === mainModuleTabs.protect}
            currentModule= {TabModule.PROTECT}
          />
        </MainNavigationContainer>

        {/* Divider below main navigation */}
        <Separator className="border-b-2 border-brand-bottomBorderColor mb-[22px]" />

        {renderMainContent()}
      </div>
    </div>
  );
}
