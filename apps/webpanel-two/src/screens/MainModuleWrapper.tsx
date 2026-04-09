import { MainModule } from './MainModule';
import { mainModuleTabs, optimiseSubTabs, type MainModuleTab } from '../myUtils/routes';
import { maximiseSubTabs } from '../models/maximise';
import { protectSubTabs } from '../models';
import { SubtabModuleRoutes, TabModuleRoutes } from '../models/genericEntities';


  // Wrapper component that reads URL parameters and passes them to MainModule

export function MainModuleWrapper() {
  const pathSegments = window.location.pathname?.split('/')?.filter(Boolean);
  const module = pathSegments?.[0];
  const subModule = pathSegments?.[1];

  let initialMainTab: MainModuleTab = mainModuleTabs.optimize;
  let initialSubTab: string | undefined;

  switch (module) {
    case TabModuleRoutes.MAXIMISE:
      initialMainTab = mainModuleTabs.maximise as MainModuleTab;
      switch (subModule) {
        case SubtabModuleRoutes.SUPER:
          initialSubTab = maximiseSubTabs.super;
          break;
        case SubtabModuleRoutes.INVESTING:
          initialSubTab = maximiseSubTabs.investing;
          break;
      }
      break;

    case TabModuleRoutes.PROTECT:
      initialMainTab = mainModuleTabs.protect as MainModuleTab;
      switch (subModule) {
        case SubtabModuleRoutes.INSURANCE:
          initialSubTab = protectSubTabs.insurance;
          break;
        case SubtabModuleRoutes.ASSET_PROTECTION:
          initialSubTab = protectSubTabs.assetProtection;
          break;
        case SubtabModuleRoutes.ESTATE_PLANNING:
          initialSubTab = protectSubTabs.estatePlanning;
          break;
      }
      break;

    case TabModuleRoutes.OPTIMISE:
      initialMainTab = mainModuleTabs.optimize;
      switch (subModule) {
        case SubtabModuleRoutes.BUDGET:
          initialSubTab = optimiseSubTabs.budget;
          break;
        case SubtabModuleRoutes.SAFETY_NET:
          initialSubTab = optimiseSubTabs.safetynet;
          break;
        case SubtabModuleRoutes.DEBT:
          initialSubTab = optimiseSubTabs.debt;
          break;
        case SubtabModuleRoutes.SAVINGS:
          initialSubTab = optimiseSubTabs.savings;
          break;
      }
      break;
  }

  return <MainModule initialMainTab={initialMainTab} initialSubTab={initialSubTab} />;
}
