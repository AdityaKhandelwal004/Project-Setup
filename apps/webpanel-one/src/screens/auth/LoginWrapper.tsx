import { useHistory } from 'react-router-dom';
import { SignIn } from './SignIn';
import { routes } from '../../myUtils';

export function LoginWrapper() {
  const history = useHistory();

  const handleComplete = () => {
    history.push(routes.root);
  };

  const handleSignUp = () => {
    // Navigate to signup page
    history.push(routes.signup);
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    history.push(routes.forgotPassword);
  };

  return (
    <SignIn
      onComplete={handleComplete}
      onSignUp={handleSignUp}
      onForgotPassword={handleForgotPassword}
    />
  );
}
