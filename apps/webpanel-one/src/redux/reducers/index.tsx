import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import auth, { AuthState } from './auth';
import { createBasicReducer ,createPagedReducer,createStepFormReducer} from './utils';
import { SYSTEM_LOADER, USER_PROFILE, APICALL,STEP_FORM,

  // Add more Action types here
} from '../actions';
import { MetaData , PagedEntity, getDefaultMetaData } from '../../models';
import { LoaderState,StepFormState } from '../../models/genericEntities';

export interface ReduxState {
  router: RouterState;
  auth: AuthState;
  profile: any;
  loader: LoaderState;
  stepForm ?: StepFormState
  // Add more State here
}

const createRootReducer = (history: History): Reducer => combineReducers<ReduxState>({
  /* Start Third party reducers */
  router: connectRouter(history),
  /* End Third party reducers */
  auth,
  profile: createBasicReducer<any>(USER_PROFILE, {
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    dialCode: '',
    role: {
      id: '',
    },
    profilePhoto: '',
  }),
  loader: createBasicReducer<LoaderState>(SYSTEM_LOADER, {
    visibility: false,
  }),
  stepForm: createStepFormReducer(STEP_FORM, {
    currentPage: 0,
    forms: {},
    validationErrors: {},
  }),
    // Add more Reducers here
});
export default createRootReducer;
