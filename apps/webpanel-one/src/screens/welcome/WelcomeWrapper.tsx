import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Onboarding } from '../onboarding/Onboarding';
import { routes } from '../../myUtils';
import { showLoader } from '@mono/redux-global/src/actions';
import type { StoreStates } from '../../redux/reducers';

export function WelcomeWrapper() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onboardingData = useSelector((state: StoreStates) => state.onboarding);

  const handleOnboardingComplete = () => {
    try {
      dispatch(showLoader());
      history.push(routes.welcomeOverview);
    } catch (error) {
      console.error('Error navigating after onboarding completion:', error);
    }
  };

  return <Onboarding onComplete={handleOnboardingComplete} initialData={onboardingData} />;
}

