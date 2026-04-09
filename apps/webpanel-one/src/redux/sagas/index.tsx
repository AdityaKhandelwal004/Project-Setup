import { call, put, takeEvery, select, take } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { HttpMethods, HttpStatus } from "@mono/utils";
import type { MetaData } from "@mono/models";
import {
  APICALL,
  FETCH_BASE_DATA,
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
  LOGOUT,
  PAGINATED_APICALL,
  action,
  fetchBaseData,
  logout,
  removeToken,
  updateToken,
  fetchUserProfile,
  USER_PROFILE,
  profileModuleActions,
  hideLoader,
  POST_LOGIN,

} from "../actions/index";
import type { ApiCall, PagedApiCall } from "../actions/index.tsx";
import {
  apiCall,
  login,
  signup,
  forgotPassword,
  ping,
  GET_PROFILE,
  twoFactorAuthentication,
} from "../../api";

import {
  Role,
  defaultAuthState,
  getStateFromToken,
  getToken,
} from "../reducers/auth";

import { config } from "../../config";


declare type callback = (body: any) => any;
declare type errorHandler = (body: any, response: Response) => any;

export function* handleResponse(
  response: Response,
  callback: callback,
  error?: errorHandler,
  ignoreStatus = false,
): any {
  try {
    if (response.status === HttpStatus.Ok) {
      const body = yield response.json();
      const authToken = response?.headers
        ?.get("Authorization")
        ?.split("Bearer ")[1];
      if (authToken) {
        yield put(updateToken(authToken));
      }
      const callbackResult = callback(body);
      if (callbackResult) {
        yield* callbackResult;
      }
    } else if (
      !ignoreStatus &&
      response.status === HttpStatus.Unauthorized
      // || response.status === HttpStatus.Forbidden
    ) {
      /** @Note
       * Logout user ,Usually we take this path,
       * but sometimes we want to ignore 403's,
       * especially when logging in
       * */
      yield put(logout());
    } else if (error) {
      const body = yield response.json();
      const callbackResult = error(body, response);
      if (callbackResult) {
        yield* callbackResult;
      }
    }
  } catch (e) {
    if (error) {
      const callbackResult = error(e, response);
      if (callbackResult) {
        yield* callbackResult;
      }
    }
  }
}

export function toArray<T>(param: T | T[] | void) {
  if (param) {
    return param instanceof Array ? param.filter((p) => !!p) : [param];
  }

  return [];
}

function* doApiCall<
  RequestProps,
  SuccessProps extends { _requestDate: Date },
  FailureProps extends Response,
>(event: {
  payload: ApiCall<RequestProps, SuccessProps, FailureProps>;
}): Generator<any> {
  const {
    request: {
      requestProps: { payload, method, options },
    },
    success,
    failure,
  } = event.payload;

  const {
    request: {
      requestProps: { endpoint },
    },
  } = event.payload;
  const date = new Date();
  // yield put(showLoader());

  try {
    const result: any = yield call(
      apiCall,
      endpoint,
      method,
      payload,
      options?.isFormData,
    );
    yield* handleResponse(
      result,
      function* (body: SuccessProps) {
        const newBody = body;
        if (typeof body === "object") {
          newBody._requestDate = date;
        }
        if (success.resolve) {
          const actions = toArray(success.resolve(newBody));
          yield* actions.map((act) => put(act));
        }
      },
      function* (body: FailureProps): any {
        if (failure.reject) {
          const actions = toArray(failure.reject(body));
          yield* actions.map((act) => put(act));
        }
      },
    );
  } catch (e) {
    console.log(e);
  } finally {
    // yield put(hideLoader());
  }
}

export function getPaginationParameters(filter: MetaData<any>): string {
  const { order, direction, page, limit, filters } = filter;
  const simpleParams = {
    order,
    direction,
    page,
    limit,
  };

  let filterParams: string[] = [];

  Object.keys(filters).forEach((key) => {
    filterParams = filterParams.concat(
      filters[key] ? [`filter[${key}]=${filters[key]}`] : [],
    );
  });

  return Object.keys(simpleParams)
    .map((key: keyof typeof simpleParams) =>
      simpleParams[key] ? `${key}=${String(simpleParams[key])}` : "",
    )
    .concat(filterParams)
    .filter((value) => value)
    .join("&");
}

export function* doPaginatedApiCall<
  MetaDataProps,
  SuccessProps,
  FailureProps extends Response,
>(event: { payload: PagedApiCall<MetaDataProps> }): Generator<any> {
  const {
    request: { endpoint, filter, loadMore: isLoadMore },
    update,
    loadMore,
  } = event.payload;
  const finalEndpoint = `${endpoint}?${getPaginationParameters(filter)}`;
  try {
    const result: any = yield call(apiCall, finalEndpoint);
    yield* handleResponse(result, function* (body: SuccessProps) {
      if (isLoadMore) {
        yield put(action(loadMore.action, body));
      } else {
        yield put(action(update.action, body));
      }
    });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

export function* doFetchUserProfile(): Generator<any> {
  const result: any = yield call(apiCall, GET_PROFILE);

  yield* handleResponse(
    result,
    function* (response = {}) {
      const payload = {
        ...response,
        profilePicturePath: response.profilePicturePath
          ? `${config.staticUploadsHost}/${response.profilePicturePath}`
          : null,
      };
      yield put(profileModuleActions.update(payload || {}));
    },
    function* () {
      /**  @NOTE Add error handler if needed */
    },
  );
}

export function* doFetchBaseData(): Generator<any> {
  if (getToken()) {
    const result: any = yield call(ping);
    yield* handleResponse(
      result,
      function* () {
        yield put(fetchUserProfile());
        /** @Note Add actions to fetch initial data */
      },
      function* () {
        yield put(logout());
      },
      true,
    );
  } else {
    yield put(logout());
  }
}

export function* doLogin(event: any): Generator<any> {
  try {
    const result: any = yield call(login, event?.payload?.formData);
    yield* handleResponse(
      result,
      function* (body) {
        const newState = getStateFromToken(defaultAuthState, body?.token);
        if (body?.data?.senderDetail) {
          yield event?.payload?.resolve(body);
        } else if (newState?.role === Role.INVALID) {
          yield event?.payload?.reject({
            message: "error.login.invalidCredentials",
          });
        } else {
          yield put(updateToken(body?.token));
          yield put(fetchBaseData());

          yield event?.payload?.resolve(body);
        }
      },
      function* (body: any) {
        yield event?.payload?.reject(body);
      },
      true,
    );
  } catch (e) {
    event?.payload?.reject(e);
  }
}

export function* doSignup(event: any): Generator<any> {
  try {
    const result: any = yield call(signup, event?.payload?.formData);
    yield* handleResponse(
      result,
      function* (body) {
        // Handle successful signup - check if we have a token (indicates success)
        if (body?.token || typeof body === "string") {
          // If body is a string, it's the token directly
          const token = typeof body === "string" ? body : body.token;

          if (token) {
            const newState = getStateFromToken(defaultAuthState, token);
            if (newState?.role !== Role.INVALID) {
              yield put(updateToken(token));
              yield put(fetchBaseData());
            }
          }

          // Call the resolve callback with success response
          yield event?.payload?.resolve({
            success: true,
            token: token,
            user: body?.user || null,
            message: "Account created successfully",
          });
        } else {
          // Handle API error response (no token means error)
          yield event?.payload?.reject({
            message: body?.message || "Signup failed. Please try again.",
            errors: body?.errors || {},
          });
        }
      },
      function* (body: any, response: Response) {
        let errorMessage = "Signup failed. Please try again.";
        let errors = {};

        if (response.status === 400) {
          errorMessage =
            body?.message ||
            "Invalid signup data. Please check your information.";
          errors = body?.errors || {};
        } else if (response.status === 409) {
          errorMessage =
            body?.message ||
            "Email already exists. Please use a different email.";
        } else if (response.status === 422) {
          errorMessage =
            body?.message ||
            "Validation failed. Please check your information.";
          errors = body?.errors || {};
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }

        yield event?.payload?.reject({
          message: errorMessage,
          errors,
          status: response.status,
        });
      },
      true,
    );
  } catch (e) {
    yield event?.payload?.reject({
      message: "Network error. Please check your connection and try again.",
      error: e,
    });
  }
}

export function* doForgotPassword(event: any): Generator<any> {
  try {
    const result: any = yield call(forgotPassword, event?.payload?.formData);
    yield* handleResponse(
      result,
      function* (body) {
        // Handle successful forgot password response
        yield event?.payload?.resolve({
          success: true,
          message: body?.message || "Password reset link sent successfully!",
        });
      },
      function* (body: any, response: Response) {
        // Handle HTTP error responses
        let errorMessage = "Failed to send reset link. Please try again.";

        if (response.status === 400) {
          errorMessage =
            body?.message ||
            "Invalid email address. Please check and try again.";
        } else if (response.status === 404) {
          errorMessage =
            body?.message ||
            "Email address not found. Please check and try again.";
        } else if (response.status === 429) {
          errorMessage =
            body?.message ||
            "Too many requests. Please wait before trying again.";
        } else if (response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }

        yield event?.payload?.reject({
          message: errorMessage,
          status: response.status,
        });
      },
      true,
    );
  } catch (e) {
    // Handle network or other errors
    yield event?.payload?.reject({
      message: "Network error. Please check your connection and try again.",
      error: e,
    });
  }
}

export function* doLogout() {
  try {
    yield put(removeToken());
    yield put(hideLoader());
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
}

export function* doPostLogin(event: any): Generator<any> {
  const token = event?.payload?.token;

  yield put(updateToken(token));
  yield put(fetchBaseData());
}

export function* doTwofactorAuthentication(event: any): Generator<any> {
  try {
    const result: any = yield call(
      twoFactorAuthentication,
      event?.payload?.formData,
    );
    yield* handleResponse(
      result,
      function* (body) {
        const newState = getStateFromToken(defaultAuthState, body?.token);

        if (!body?.data && newState?.role === Role.INVALID) {
          yield event?.payload?.reject({
            message: "error.login.invalidCredentials",
          });
        } else {
          yield put(updateToken(body?.token));
          yield put(fetchBaseData());
          yield event?.payload?.resolve(body);
        }
      },
      function* (body: any) {
        yield event?.payload?.reject(body);
      },
      true,
    );
  } catch (e) {
    event?.payload?.reject(e);
  }
}


export function* rootSaga(): SagaIterator<void> {
  yield takeEvery(APICALL, doApiCall as any);
  yield takeEvery(PAGINATED_APICALL, doPaginatedApiCall as any);
  yield takeEvery(LOGIN, doLogin);
  yield takeEvery(SIGNUP, doSignup);
  yield takeEvery(FORGOT_PASSWORD, doForgotPassword);
  yield takeEvery(LOGOUT, doLogout);
  yield takeEvery(FETCH_BASE_DATA, doFetchBaseData);
  yield takeEvery(USER_PROFILE, doFetchUserProfile);
  yield takeEvery(POST_LOGIN, doPostLogin);

}
