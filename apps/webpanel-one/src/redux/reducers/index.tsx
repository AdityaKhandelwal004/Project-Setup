import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import type { RouterState } from "connected-react-router";
import type { History } from "history";
import type {
  LoaderState,
} from "@mono/models";
// import auth from '@mono/redux-global/src/reducers/auth';
import auth, { type AuthState } from "./auth";
// import { createBasicReducer, createPagedReducer } from
import {
  SYSTEM_LOADER,
  USER_PROFILE,
  // Add more Action types here
} from "../actions";
import { createBasicReducer } from "./utils";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  dialCode: string;
  dateOfBirth?: string;
  role: { id: string };
  profilePicturePath?: string;
  consents?: {
    termsAcceptedAt?: string;
    privacyPolicyAcceptedAt?: string;
    emailVerifiedAt?: string;
  };
}

export interface SubscriptionModalState {
  isOpen: boolean;
  mode?: "purchase" | "renew" | "update";
}

export interface AvailableSavingsState {
  availableInvestmentSavings: number;
  frequency: string;
  lastUpdated?: number;
}

export interface IncomeSavingsState {
  availableIncomeSavings: number;
  frequency: string;
  lastUpdated?: number;
}

export interface ReduxState {
  router: RouterState<unknown>;
  auth: AuthState;
  loader: LoaderState;
  profile?: UserProfile;

}

export interface StoreStates {
  router: RouterState;
  auth: AuthState;
  loader: LoaderState;
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
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      phoneNumber: "",
      dialCode: "",
      dateOfBirth: "",
      role: { id: "" },
    }),
    loader: loaderReducer,
  });

export default createRootReducer;
