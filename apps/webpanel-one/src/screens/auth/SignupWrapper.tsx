import { useHistory } from 'react-router-dom';
import { Signup } from './Signup';
import { routes } from '../../myUtils';

export function SignupWrapper() {
  const history = useHistory();

  const handleComplete = () => {
    // Navigate to onboarding after successful signup
    history.push(routes.onboarding);
  };

  const handleSignIn = () => {
    // Navigate to login page
    history.push(routes.login);
  };

  return (
    <Signup
      onComplete={handleComplete}
      onSignIn={handleSignIn}
    />
  );
}
