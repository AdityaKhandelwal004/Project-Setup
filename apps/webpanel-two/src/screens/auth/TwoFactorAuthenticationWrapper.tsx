import { useHistory } from 'react-router-dom';
import { routes } from '../../myUtils';
import { TwoFactorAuthentication } from './twoFactorAuthentication';

export const TwoFactorAuthenticationWrapper = () => {
  const history = useHistory();

  const handleSignIn = () => {
    // Navigate back to login page
    history.push(routes.login);
  };

  return (
    <TwoFactorAuthentication
      onSignIn={handleSignIn}
    />
  );
};
