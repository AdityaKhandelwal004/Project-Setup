import React, { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStatus } from '@mono/redux-global/src/reducers';
import { Right, Role } from '@mono/redux-global/src/reducers/auth';
import type { StoreStates } from './redux/reducers';
interface Props {
  right?: Right;
  status?: AuthenticationStatus;
  featureLevel?: FeatureLevel;
  role?: Role;
  children?: JSX.Element | JSX.Element[];
  isApplicableFeatureLevel?: (level: FeatureLevel) => boolean;
}

enum FeatureLevel {
  production = 'production',
  staging = 'staging',
  development = 'development',
}

const OnlyWith: React.FC<Props> = ({
  status,
  right,
  featureLevel,
  role,
  children,
  isApplicableFeatureLevel,
}) => {
  const auth = useSelector((state: StoreStates) => state.auth);
  if (auth.hasStatusAndRight(status, right)) {
    if (!featureLevel || (isApplicableFeatureLevel && isApplicableFeatureLevel(featureLevel))) {
      if (role) {
        if (auth.hasRole(role)) {
          return <>{children}</>;
        }
      } else {
        return <>{children}</>;
      }
    }
  }
  return null;
};
export default OnlyWith;
