import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SignIn } from './SignIn';
import { routes } from '../../myUtils';
import type { StoreStates } from '../../redux/reducers';

export function LoginWrapper() {
  const history = useHistory();
  const onboardingData = useSelector((state: StoreStates) => state.onboarding);

  const handleComplete = () => {
    const onboardingStatus = onboardingData?.status;
    
    if (onboardingStatus === "NOT_STARTED" || !onboardingData || onboardingData.id === 0) {
      history.push(routes.onboardingIntro);
    } else if (onboardingStatus === "IN_PROGRESS") {
      history.push(routes.onboarding);
    } else {
      history.push(routes.root);
    }
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
