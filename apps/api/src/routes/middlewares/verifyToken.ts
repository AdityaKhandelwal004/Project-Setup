/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Container } from "typedi";
import config from "../../config/index.ts";
import { HttpException, formatErrorResponse } from "../../utils/index.ts";
import type {
  TokenValidationResult} from "../../auth/index.ts";
import {
  Authentication,
  TokenStatus,
} from "../../auth/index.ts";
import { securityService } from "../../modules/security/index.ts";
import type { Request, NextFunction } from "express";

/**
 * Get the token from the header
 * We are assuming that the JWT will come in a header with the form
 * Authorization: Bearer ${JWT}
 * @param {Request} req
 * @param {string} messageKey
 * @param {NextFunction} next
 * @returns {string|null}
 */
const getTokenFromHeader = (
  req: Request,
  messageKey: string,
  next: NextFunction
): string | null => {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader === "string" && authHeader.split(" ")[0] === "Bearer") {
    return authHeader.split(" ")[1] || null;
  }
  next(
    new HttpException.Unauthorized(formatErrorResponse(messageKey, "notFound"))
  );
  return null;
};

/**
 * Get the payload from the token
 * @param {string} token
 * @param {string} messageKey
 * @param {NextFunction} next
 * @returns {jwt.JwtPayload}
 */
const getPayloadFromToken = (
  token: string,
  messageKey: string,
  next: NextFunction
): JwtPayload | undefined => {
  try {
    const payload = jwt.verify(token, config.authTokens.publicKey, {
      algorithms: [config.authTokens.algorithm as jwt.Algorithm],
      issuer: config.authTokens.issuer,
      audience: [
        config.authTokens.audience.web,
        config.authTokens.audience.app,
      ],
      ignoreExpiration: true,
    });
    if (typeof payload === "string") {
      return undefined;
    }
    return payload;
  } catch (error) {
    if (config.env !== "prod") {
      console.log("getPayloadFromToken: Error while validating the JWT token");
      console.dir(error, { depth: 4 });
    }
    next(
      new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "invalidToken")
      )
    );
    return undefined;
  }
};

/**
 * This function is called when the token is valid
 * @param {TokenValidationResult} result
 * @param {Request} req
 * @param {jwt.JwtPayload} payload
 * @param {NextFunction} next
 */
const onValidToken = (
  result: TokenValidationResult,
  req: Request,
  payload: JwtPayload,
  next: NextFunction
): void => {
  const { user } = result;
  const rights = Authentication.userEffectiveRights(user) ?? [];
  user.rights = rights;
  user.tokenAud = payload.aud;
  user.ip = req.ip;
  user.userAgent = req?.headers["user-agent"] || null;
  delete user.passwordHash;
  req.currentUser = { ...user, rights: rights as string[] }; // Ensure rights is always present and not undefined
  Object.freeze(req.currentUser);
  next();
};

/**
 * A middleware to validate the token, get the user from the database
 * and set it in the request object as `currentUser` AKA actionUser
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const messageKey = "authToken";
  const token = getTokenFromHeader(req, messageKey, next);
  if (!token) {
    next(
      new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "notFound")
      )
    );
    return;
  }
  const payload = getPayloadFromToken(token, messageKey, next);
  if (!payload) {
    next(
      new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "notValidToken")
      )
    );
    return;
  }
  const service = Container.get(securityService);
  const result: TokenValidationResult = await service.validateToken(
    req.ip,
    payload
  );
  const statusActions = {
    [TokenStatus.EXPIRED]: () =>
      next(
        new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "expired")
        )
      ),
    [TokenStatus.OLD_VERSION]: () =>
      next(
        new HttpException.UpgradeRequired(
          formatErrorResponse(messageKey, "invalidApiVersion")
        )
      ),
    [TokenStatus.INVALID_USER]: () =>
      next(
        new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "invalidUser")
        )
      ),
    [TokenStatus.INACTIVE_USER]: () =>
      next(
        new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "inactiveUser")
        )
      ),
    [TokenStatus.INVALID_TOKEN]: () =>
      next(
        new HttpException.UpgradeRequired(
          formatErrorResponse(messageKey, "invalidToken")
        )
      ),
    [TokenStatus.VALID]: () => onValidToken(result, req, payload, next),
  };
  if (statusActions[result.status as keyof typeof statusActions]) {
    statusActions[result.status as keyof typeof statusActions]();
    return;
  }
  console.log("[ERROR] None of case matched for result: %s", result);
  throw new HttpException.Unauthorized(
    formatErrorResponse(messageKey, "invalidToken")
  );
};

export default verifyToken;
