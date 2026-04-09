import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { StoreStates } from '../redux/reducers';
import { getStageByCode, getStepByCode } from '../myUtils/stageProgressUtils';
import { getStageConfigForRoute } from '../myUtils/stageRouteMapping';

export const CompletedStageRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const stageProgress = useSelector((state: StoreStates) => state.stageProgress);
  
  const stageConfig = getStageConfigForRoute(location.pathname);
  
  if (!stageConfig) {
    return <>{children}</>;
  }
  
  const stage = getStageByCode(stageProgress, stageConfig.stageCode);
  const step = getStepByCode(stage, stageConfig.stepCode);
 
  if (step?.status === 'COMPLETED') {
    return <Redirect to={stageConfig.dashboardRoute} />;
  }
  
  return <>{children}</>;
};
