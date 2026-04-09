import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getModuleTheme } from '../modules/index.ts';
import type { ModuleName } from '../modules/index.ts';

interface ModuleThemeProviderProps {
  children: React.ReactNode;
  module: ModuleName;
}

export const ModuleThemeProvider: React.FC<ModuleThemeProviderProps> = ({
  children,
  module,
}) => {
  const moduleTheme = getModuleTheme(module);

  return (
    <StyledThemeProvider theme={moduleTheme}>
      {children}
    </StyledThemeProvider>
  );
};
