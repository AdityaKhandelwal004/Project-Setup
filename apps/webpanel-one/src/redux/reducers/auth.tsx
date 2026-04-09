import { Action, TOKEN_REMOVE, TOKEN_UPDATE } from '../actions';

export enum Right {
  DASHBOARD = 'DASHBOARD',
}

export enum AuthenticationStatus {
  AUTHENTICATED = 'AUTHENTICATED',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
}

export enum Role {
  ADMINISTRATOR = 'ADMINISTRATOR',
  INVALID = 'INVALID'
}

export const RolePrioriry: any = {
  ADMINISTRATOR: 1,
};

export interface AuthState {
  rights: Right[];
  status: AuthenticationStatus;
  role: Role;
  token?: string;
  hasStatusAndRight(status?: AuthenticationStatus, right?: Right): boolean;
  hasRole(role?: Role): boolean;
}

export const defaultAuthState: AuthState = {
  rights: [],
  status: AuthenticationStatus.NOT_AUTHENTICATED,
  role: Role.INVALID,
  token: undefined,
  hasStatusAndRight(
    status?: AuthenticationStatus,
    right?: Right,
  ): boolean {
    if (!right || this.rights.indexOf(right) >= 0) {
      if (!status || status === this.status) {
        return true;
      }
    }

    return false;
  },
  hasRole(role?: Role): boolean {
    if (role === this.role) {
      return true;
    }

    return false;
  },
};

export const getRightsForRole = (role: Role): Right[] => {
  switch (role) {
    case Role.ADMINISTRATOR:
      return [
        Right.DASHBOARD,
      ];
    default:
      return [];
  }
};

export function getStateFromToken(state: AuthState, token: string | undefined): AuthState {
  let rights: Right[] | undefined;
  let role: Role;
  let status: AuthenticationStatus;
  if (token) {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const tokenData: any = JSON.parse(atob(token.split('.')[1]));
      role = Role.ADMINISTRATOR;
      rights = getRightsForRole(role);
      status = AuthenticationStatus.AUTHENTICATED;
    } catch (e) {
      // This is fine, parsing failed because eg. token is invalid
      rights = undefined;
      role = Role.INVALID;
      status = AuthenticationStatus.AUTHENTICATED;
    }
  } else {
    rights = undefined;
    role = Role.INVALID;
    status = AuthenticationStatus.AUTHENTICATED;
  }

  if (rights) {
    return {
      ...state,
      rights,
      role,
      token,
      status,
    };
  }

  return defaultAuthState;
}

let token: string | undefined;
export default (
  state: AuthState = defaultAuthState,
  action: Action<string>,
): AuthState => {
  token = localStorage.getItem('token') || undefined;

  switch (action.type) {
    case TOKEN_UPDATE:
      token = action.payload;
      localStorage.setItem('token', token);
      return { ...getStateFromToken(state, token) };
    case TOKEN_REMOVE:
      localStorage.removeItem('token');
      token = undefined;
      return { ...getStateFromToken(state, undefined) };
    default:
      return { ...getStateFromToken(state, token) };
  }
};

export const getToken = (): string | undefined => token;
