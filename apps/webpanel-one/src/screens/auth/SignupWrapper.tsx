import { useHistory } from 'react-router-dom';
import { Signup } from './Signup';
import { routes } from '../../myUtils';

export function SignupWrapper() {
  const history = useHistory();

  const handleComplete = () => {
    history.push(routes.onboardingIntro);
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
