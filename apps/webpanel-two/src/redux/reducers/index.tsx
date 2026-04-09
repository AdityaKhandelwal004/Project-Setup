import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { RouterState } from 'connected-react-router';
import type { History } from 'history';
import type { LoaderState, StepFormState } from '@mono/models';
// import type { AuthState } from '@mono/redux-global/src/reducers/auth';
import { createBasicReducer, createPagedReducer } from '@mono/redux-global/src/reducers/utils';
import {
  SYSTEM_LOADER,
  USER_PROFILE,
  // Add more Action types here
} from '@mono/redux-global/src/actions';
import auth, { type AuthState } from './auth';
import type { ResourceEntity } from '../../models/learningResource';
import { LEARN_RESOURCE_LISTING, PARTNERS__CATEGORY_LISTING, PARTNERS_LISTING, RECENT_ACTIVITIES_LISTING, TAGS_LISTING, TYPE_LISTING, CUSTOMERS_LISTING, TRANSACTION_HISTORY, CUSTOMER_PAYMENTS_LISTING } from '../actions';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dialCode: string;
  role: { id: string };
  profilePhoto: string;
}

export interface ReduxState {
  router: RouterState<unknown>;
  auth: AuthState;
  loader: LoaderState;
  stepForm?: StepFormState;
  profile?: UserProfile;
}

export interface StoreStates {
  router: RouterState;
  auth: AuthState;
  loader: LoaderState;
  stepForm: StepFormState;
}
const loaderReducer = createBasicReducer<LoaderState>(SYSTEM_LOADER, {
  visibility: false,
});
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    profile: createBasicReducer<UserProfile>(USER_PROFILE, {
      id: 0,
      name: '',
      email: '',
      phoneNumber: '',
      dialCode: '',
      role: { id: '' },
      profilePhoto: '',
    }),
    loader: loaderReducer,
    learnResourceList: createPagedReducer<ResourceEntity>(LEARN_RESOURCE_LISTING,[]),
    typeList: createPagedReducer<ResourceEntity>(TYPE_LISTING,[]),
    tagsList: createPagedReducer<ResourceEntity>(TAGS_LISTING,[]),
    partnerList: createPagedReducer<ResourceEntity>(PARTNERS_LISTING,[]),
    partnerCategoryList: createPagedReducer<ResourceEntity>(PARTNERS__CATEGORY_LISTING,[]),
    recentActivitiesList: createPagedReducer<any>(RECENT_ACTIVITIES_LISTING,[]),
    customersList: createPagedReducer<any>(CUSTOMERS_LISTING,[]),
    transactionHistory: createPagedReducer<any>(CUSTOMER_PAYMENTS_LISTING, []),
  });

export default createRootReducer;
