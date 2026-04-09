/* eslint-disable no-use-before-define */
import express from "express";
import type { Request, Response, NextFunction } from "express";

const Router = express.Router;

import type {
  featureLevel} from "./index.ts";
import type { Router as ExpressRouter } from "express";
import {
  HttpException,
  formatErrorResponse,
  HttpMethod,
  isApplicableFeatureLevel
} from "./index.ts";
import { verifyToken } from "../routes/middlewares/index.ts";
import { Authentication } from "../auth/index.ts";
import { securityService } from "../modules/security/index.ts";
import { checkSubscriptionAccess } from "../routes/middlewares/subscriptionMiddleware.ts";

export const route: ExpressRouter = Router();

type AsyncCallbackHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => Promise<any>;
type AsyncMiddlewareHandler = Array<
  (_req: Request, _res: Response, _next: NextFunction) => any
>;

/**
 * Map the PUBLIC UNAUTHENTICATED route for HTTP GET requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const publicGet = (
  level: keyof typeof featureLevel,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initPublicRoute(level, path, HttpMethod.get, callback, middlewares);
};

/**
 * Map the PUBLIC UNAUTHENTICATED route for HTTP POST requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const publicPost = (
  level: keyof typeof featureLevel,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initPublicRoute(level, path, HttpMethod.post, callback, middlewares);
};

/**
 * Map the PUBLIC UNAUTHENTICATED route for HTTP PUT requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const publicPut = (
  level: keyof typeof featureLevel,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initPublicRoute(level, path, HttpMethod.put, callback, middlewares);
};

/**
 * Map the PUBLIC UNAUTHENTICATED route for HTTP DELETE requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const publicDelete = (
  level: keyof typeof featureLevel,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initPublicRoute(level, path, HttpMethod.delete, callback, middlewares);
};

/**
 * Map the route for HTTP GET requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const get = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.get, callback, middlewares);
};

/**
 * Map the route for HTTP POST requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const post = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.post, callback, middlewares);
};

/**
 * Map the route for HTTP PUT requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const put = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.put, callback, middlewares);
};

/**
 * Map the route for HTTP PATCH requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const patch = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.patch, callback, middlewares);
};

/**
 * Map the route for HTTP DELETE requests,
 * can't name it as delete as it is reserved keyword
 *
 * @param path  the path
 * @param callback The callback
 */
export const deleteMethod = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.delete, callback, middlewares);
};

/**
 * Map the route for HTTP HEAD requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const head = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.head, callback, middlewares);
};

/**
 * Map the route for HTTP TRACE requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const trace = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.trace, callback, middlewares);
};

/**
 * Map the route for HTTP OPTIONS requests
 *
 * @param path  the path
 * @param callback The callback
 */
export const options = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
): void => {
  initRouteWith(level, right, path, HttpMethod.options, callback, middlewares);
};

const initPublicRoute = (
  level: keyof typeof featureLevel,
  path: string,
  method: keyof typeof HttpMethod,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
) => {
  if (isApplicableFeatureLevel(level)) {
    logInitialization(path, method);
    route[method](path, ...middlewares, async (req, res, next) => {
      try {
        const data = await callback(req, res, next);
        if (data) {
          return res.status(200).json(data);
        }
        throw new HttpException.BadRequest(
          formatErrorResponse("general", "noDataFound")
        );
      } catch (err) {
        return next(err);
      }
    });
  }
};

const initRouteWith = (
  level: keyof typeof featureLevel,
  right: string,
  path: string,
  method: keyof typeof HttpMethod,
  callback: AsyncCallbackHandler,
  middlewares: AsyncMiddlewareHandler = []
) => {
  if (isApplicableFeatureLevel(level)) {
    logInitialization(path, method);
    route[method](
      path,
      verifyToken as any,
      checkSubscriptionAccess as any,
      ...middlewares,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { currentUser } = req;
          if (
            !(
              currentUser &&
              Authentication.hasPermission(currentUser?.rights || [], right)
            )
          ) {
            throw new HttpException.Forbidden(
              formatErrorResponse("authToken", "notAuthorised")
            );
          }
          const data = await callback(req, res, next);
          if (data) {
            const requestDetails: any = {
              ip: req.ip,
              userAgent: req.headers["user-agent"],
            };
            const updatedToken = securityService.updateToken(
              requestDetails,
              currentUser.id,
              currentUser.tokenAud,
              currentUser.roleIds
            );
            res.setHeader("Authorization", `Bearer ${updatedToken}`);
            return res.status(200).json(data);
          }

          throw new HttpException.BadRequest(
            formatErrorResponse("general", "noDataFound")
          );
        } catch (err) {
          return next(err);
        }
      }
    );
  }
};

export const logInitialization = (
  path: string,
  method: keyof typeof HttpMethod
) => {
  // eslint-disable-next-line no-console
  console.log(`Initialized route [${method.toUpperCase()} ${path}]`);
};
