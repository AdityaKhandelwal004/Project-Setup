import { useHistory } from 'react-router-dom';

import { routes } from '../../myUtils';

import { ForgotPassword } from './ForgotPassword';

export function ForgotPasswordWrapper() {
  const history = useHistory();

  const handleSignIn = () => {
    // Navigate back to login page
    history.push(routes.login);
  };

  return (
    <ForgotPassword
      onSignIn={handleSignIn}
    />
  );
}
