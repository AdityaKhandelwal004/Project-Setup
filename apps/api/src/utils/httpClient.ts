import fetch from 'node-fetch';
import type { RequestInit, Response }  from 'node-fetch';

const nodeFetch = (...args: Parameters<typeof fetch>): ReturnType<typeof fetch> => fetch(...args);

export const HttpStatus = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
} as const;

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const apiCall = (
  url: string,
  method?: typeof HttpMethods[keyof typeof HttpMethods],
  body?: unknown,
  headers?: Record<string, string>
): Promise<Response> => {
  const httpMethod = method || HttpMethods.GET;
  const options: RequestInit = {
    method: httpMethod,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  return new Promise((resolve, reject) => {
    nodeFetch(url, options)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
