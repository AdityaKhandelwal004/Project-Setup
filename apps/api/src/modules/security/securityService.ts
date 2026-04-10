import { Container } from "typedi";
import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../../config/index.ts";
import {
  HttpException,
  encrypt,
  decrypt,
  formatErrorResponse,
  STATUS,
  parserString,
  TOKEN_TYPE,
  ACTION_TYPE,
  messageResponse,
  formatSuccessResponse,
  ACTION_BY_TYPE,
  commonCatchHandler,
  ROLE,
} from "../../utils/index.ts";
import {
  Authentication,
  Right,
  TokenValidationResult,
  Role,
  TokenStatus,
} from "../../auth/index.ts";
import UserService from "../userManagement/userService.ts";
import BaseService from "../../externalServices/baseService.ts";
import type {
  RequestMetadata,
  ResetPasswordDto,
  signUpDto,
  VerifyTokenDto,
} from "./models/types.ts";
import type { MappedUser } from "../userManagement/models/types.ts";
import {
  FORM_CODES,
  type CurrentUser,
  type Id,
} from "../../models/genericTypes.ts";
import type { PoolClient } from "pg";
import { parserId } from "../../utils/daoHelper/typeParser.ts";
import { TwoFaService } from "../twoFa/index.ts";
import Password from "../../models/password.ts";
import type { RoleName } from "../../auth/role.ts";
import MessageService from "../../externalServices/messageService.ts";

class SecurityService extends BaseService {
  static TOKEN_EXPIRATION_MINUTES = 1;
  static SAME_IP_TOKEN_EXPIRATION_MINUTES = 60;
  static MAX_LOGIN_ATTEMPTS = 3;
  static ACCOUNT_BLOCK_HOURS = 1;

  private userService: UserService;
  private twoFaService: TwoFaService;

  constructor() {
    super();
    this.userService = Container.get(UserService);
    this.twoFaService = Container.get(TwoFaService);
  }

  async postLoginActions(
    client: PoolClient,
    userId: Id,
    requestDetails: RequestMetadata,
  ) {
    await this.userService.markUserLogin(client, userId, requestDetails);
  }

  async login(
    requestDetails: RequestMetadata,
    email: string,
    password: string,
    isAppLogin = false,
  ) {
    const messageKey = "login";
    return await this.withTransaction(async (client) => {
      const invalidLoginErr = new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "invalidCredentials"),
      );
      const user: MappedUser | null = await this.userService.findUserByEmail(
        client,
        email,
      );
      if (!user || !user?.passwordHash) {
        throw invalidLoginErr;
      }

      const validPassword = await user.passwordHash.check(password);

      if (
        validPassword &&
        (await this.canLogin(client, user, requestDetails.allowedRoles))
      ) {
        
        const type = user.roleIds;
        const { id } = user;
        const res = await this.twoFaService.getTwoFaMethodsByUserId(client, id);
        let status = null;
        if (res) {
          status = res.status;
        }
        
        if (!res || status === STATUS.INACTIVE) {
          const token = SecurityService.createToken(
            requestDetails,
            user.id,
            isAppLogin
              ? config.authTokens.audience.app
              : config.authTokens.audience.web,
            type,
            !user?.lastLogin,
            isAppLogin,
          );
          await this.postLoginActions(client, user.id, requestDetails);
          return { token };
        }
        const isSuccess = await this.twoFaService.sendTwoFaToken(
          client,
          {
            userId: user.id,
            ip: requestDetails.ip,
            userAgent: requestDetails.userAgent,
            methodId: res.method.id,
            senderDetail: res.senderDetail,
            tokenType: TOKEN_TYPE[ACTION_TYPE.LOGIN],
          },
          user,
        );

        if (isSuccess) {
          const { method } = res;
          return {
            ...messageResponse(
              formatSuccessResponse(
                "twoFactorAuthentication",
                "otpSentSuccessFully",
              ),
            ),
            data: {
              method,
              senderDetail: res.senderDetail,
            },
          };
        }
      }
      throw invalidLoginErr;
    }, messageKey);
  }

  async verifyEmailToken(token: string) {
    const messageKey = "verifyEmailToken";
    return this.withTransaction(async (client) => {
      const record = await this.userService.findAndVerifyEmailVerificationToken(
        client,
        token,
      );

      if (!record) {
        throw new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "invalidToken"),
        );
      }

      const isRemoved =
        await this.userService.removeEmailVerificationTokenByUserId(
          client,
          record.userId,
        );

      if (!isRemoved) {
        throw new HttpException.ServerError(
          formatErrorResponse(messageKey, "unableToRemove"),
        );
      }

      const user = await this.userService.findUserById(client, record.userId);

      if (!user) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "userNotFound"),
        );
      }

      const fetchUserDetails = await this.userService.fetchUserProfile({
        id: user.id,
      } as CurrentUser);

      if (!fetchUserDetails) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "userNotFound"),
        );
      }

      await this.userService.updateUserConsent(client, user.id, {
        emailVerified: true,
      });

      return messageResponse(
        formatSuccessResponse(messageKey, "emailVerified"),
      );
    }, messageKey);
  }

  async verifyTwoFaToken(
    requestDetails: RequestMetadata,
    dto: VerifyTokenDto,
    isApp = false,
  ) {
    return await this.txs.withTransaction(async (client) => {
      const messageKey = "verifyTwoFaToken";
      const invalidLoginErr = new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "invalidCredentials"),
      );
      const user = await this.userService.findUserByEmail(client, dto.email);
      if (!user?.passwordHash) {
        throw invalidLoginErr;
      }

      const validPassword = await user.passwordHash.check(dto.password);
      if (
        !validPassword &&
        (await this.canLogin(client, user, requestDetails.allowedRoles))
      ) {
        throw invalidLoginErr;
      }

      const res = await this.twoFaService.getTwoFaMethodsByUserId(
        client,
        user.id,
      );
      const isVerified = await this.twoFaService.verifyTwoFaToken(client, {
        userId: user.id,
        token: dto.token,
        methodId: res?.method.id,
        tokenType: dto.tokenType,
        actionType: TOKEN_TYPE[ACTION_TYPE.LOGIN],
        ip: requestDetails.ip,
        userAgent: requestDetails.userAgent,
        senderDetail: res?.senderDetail,
      });

      if (!isVerified) {
        throw new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "invalidToken"),
        );
      }

      await this.twoFaService.updateTwoFaTokenHistory(client, {
        userId: user.id,
        token: dto.token,
        methodId: res?.method.id,
        tokenType: dto.tokenType,
        actionType: TOKEN_TYPE[ACTION_TYPE.LOGIN],
        ip: requestDetails.ip,
        userAgent: requestDetails.userAgent,
        senderDetail: res?.senderDetail,
      });

      const type = user.roleIds;
      const token = SecurityService.createToken(
        requestDetails,
        user.id,
        isApp ? config.authTokens.audience.app : config.authTokens.audience.web,
        type,
        !user.lastLogin,
        isApp,
      );
      await this.postLoginActions(client, user.id, requestDetails);
      return { token };
    });
  }

  async signUp(
    requestDetails: RequestMetadata,
    signUpDto: signUpDto,
    isApp = false,
  ) {
    return await this.txs.withTransaction(async (client) => {
      const messageKey: string = "signUp";
      try {
        if (
          signUpDto.termAccepted !== true ||
          signUpDto.privacyPolicyAccepted !== true
        ) {
          throw new HttpException.BadRequest(
            formatErrorResponse(
              messageKey,
              !signUpDto.termAccepted
                ? "termNotAccepted"
                : "privacyPolicyNotAccepted",
            ),
          );
        }
        const user = await this.userService.createUser(client, {
          ...signUpDto,
          status: STATUS.ACTIVE,
          role: ["ADMIN"]
        });

        const type = user.roleIds;
        const token = SecurityService.createToken(
          requestDetails,
          user?.id,
          isApp
            ? config?.authTokens?.audience.app
            : config?.authTokens?.audience.web,
          type,
          !user.lastLogin,
          isApp,
        );

        await this.userService.markUserLogin(client, user?.id, requestDetails);

        await this.userService.sendEmailVerificationLink(
          client,
          user,
          requestDetails,
        );
        MessageService.sendSignupMail(user);

        return { token };
      } catch (error: Error | any) {
        throw commonCatchHandler(error, messageKey);
      }
    });
  }

  async canLogin(
    client: PoolClient,
    user: MappedUser,
    allowedRoles?: RoleName[],
  ) {
    const messageKey = "user";
    if (user.status !== STATUS.ACTIVE) {
      throw new HttpException.Unauthorized(
        formatErrorResponse(messageKey, "inactiveUser"),
      );
    }
    const userRights = Authentication.userEffectiveRights(user);
    
    const hasAllowedRole = Authentication.hasAllowedRole(
      user,
      allowedRoles || [],
    );

    if (!hasAllowedRole) {
      throw new HttpException.Forbidden(
        formatErrorResponse(messageKey, "unauthorizedRole"),
      );
    }
    return Authentication.hasPermission(userRights, Right.general.LOGIN);
  }

  async requestResetPassword(email: string, requestMetadata: RequestMetadata) {
    return await this.userService.forgotPassword(email, requestMetadata);
  }

  async resetPassword(dto: ResetPasswordDto, requestMetadata: RequestMetadata) {
    return await this.txs.withTransaction(async (client) => {
      return await this.updateResetPassword(client, dto, requestMetadata);
    });
  }

  async updateResetPassword(
    client: PoolClient,
    dto: ResetPasswordDto,
    requestMetadata: RequestMetadata,
  ) {
    const messageKey = "resetPassword";
    if (dto.password !== dto.confirmPassword) {
      throw new HttpException.Forbidden(
        formatErrorResponse(messageKey, "passwordMismatched"),
      );
    }

    await this.verificationToken(client, dto, requestMetadata);
    return messageResponse(
      formatSuccessResponse(messageKey, "passwordResetSuccess"),
    );
  }

  async verificationToken(
    client: PoolClient,
    dto: ResetPasswordDto,
    requestMetadata: RequestMetadata,
  ) {
    const messageKey = "resetPassword";
    const user = await this.userService.findUserDetailsByToken(
      client,
      dto.token,
    );
    if (!user) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "invalidUrl"),
      );
    }

    const userDetails = await this.userService.findUserById(
      client,
      user.userId,
    );

    if (!userDetails) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "userNotFound"),
      );
    }

    if (userDetails.status !== STATUS.ACTIVE) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "inactiveUser"),
      );
    }

    const startMoment = moment.utc(user.createdOn);
    const endMoment = moment
      .utc(user.createdOn)
      .add(user.validitySecs, "seconds");
    const isInMoment = moment.utc().isBetween(startMoment, endMoment);
    if (!isInMoment) {
      await this.userService.deleteToken(client, dto.token);
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "urlExpired"),
      );
    }

    const { hash, salt } = await new Password(dto.password).hashPassword();
    const isPasswordUpdated = await this.userService.updatePassword(
      client,
      {
        id: user.userId,
        salt,
        newPassword: hash,
        updatedBy: user.userId,
      },
      messageKey,
    );
    const isUserFromResetPasswordDeleted = await this.userService.deleteToken(
      client,
      dto.token,
    );
    if (!isPasswordUpdated || !isUserFromResetPasswordDeleted) {
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "passwordResetFailed"),
      );
    }
    const data = {
      userId: user.userId,
      actionedBy: user.userId,
      actionByType: ACTION_BY_TYPE.SELF,
      token: dto.token,
      userAgent: requestMetadata.userAgent,
      ip: requestMetadata.ip,
      createdBy: user.userId,
    };

    const isPasswordResetHistory = await this.userService.logPasswordReset(
      client,
      data,
    );
    if (!isPasswordResetHistory) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "passwordResetFailed"),
      );
    }
    await this.userService.sendResetPasswordEmail(userDetails);

    return isInMoment;
  }

  static updateToken(
    requestDetails: RequestMetadata,
    id: Id,
    aud: string,
    type: number[],
  ) {
    return SecurityService.createToken(requestDetails, id, aud, type);
  }

  static createToken(
    requestDetails: RequestMetadata,
    id: Id | string,
    aud: string,
    type: number[] | undefined,
    firstLogin?: boolean | undefined,
    noExpiry?: boolean,
  ) {
    const payload: jwt.JwtPayload = {
      iat: SecurityService.currentTimestamp(),
      nbf: SecurityService.currentTimestamp(),
      iss: config.authTokens.issuer,
      sub: encrypt(parserString(id)),
      aud,
      version: config.authTokens.version,
      exp2: {
        ip: requestDetails.ip,
        userAgent: requestDetails.userAgent,
        time: SecurityService.sameIpAddressExpiryTimestamp(),
      },
      firstLogin: firstLogin || undefined,
      type,
    };

    if (!noExpiry) {
      payload.exp = SecurityService.anyIpAddressExpiryTimestamp();
    }

    if (aud && aud === config.authTokens.audience.app) {
      payload.aud = config.authTokens.audience.app;
      delete payload.exp;
      delete payload.exp2;
    }

    return jwt.sign(payload, config.authTokens.privateKey as jwt.Secret, {
      algorithm: config.authTokens.algorithm as jwt.Algorithm,
    });
  }

  static currentTimestamp() {
    return moment.utc().unix();
  }

  static anyIpAddressExpiryTimestamp() {
    return moment()
      .add(SecurityService.TOKEN_EXPIRATION_MINUTES, "minute")
      .unix();
  }

  static sameIpAddressExpiryTimestamp() {
    return moment()
      .add(SecurityService.SAME_IP_TOKEN_EXPIRATION_MINUTES, "minute")
      .unix();
  }

  async getUserFromToken(payload: jwt.JwtPayload) {
    const id = payload.sub ? decrypt(payload.sub) : null;
    if (!id) {
      return new TokenValidationResult(TokenStatus.INVALID_USER);
    }
    return await this.txs.withTransaction(async (client) => {
      const user = await this.userService.findUserById(client, parserId(id));

      if (!user) {
        return new TokenValidationResult(TokenStatus.INVALID_USER);
      }

      if (user?.status !== STATUS.ACTIVE) {
        return new TokenValidationResult(TokenStatus.INACTIVE_USER);
      }

      return new TokenValidationResult(TokenStatus.VALID, user);
    });
  }

  async validateToken(ip: string | undefined, payload: jwt.JwtPayload) {
    if (!payload) {
      return new TokenValidationResult(TokenStatus.INVALID_TOKEN);
    }

    if (
      payload.aud !== config.authTokens.audience.app &&
      SecurityService.isExpired(ip, payload, moment())
    ) {
      return new TokenValidationResult(TokenStatus.EXPIRED);
    }
    if (SecurityService.isOldVersion(payload)) {
      return new TokenValidationResult(TokenStatus.OLD_VERSION);
    }

    try {
      return await this.getUserFromToken(payload);
    } catch (e) {
      console.error(e);
      return new TokenValidationResult(TokenStatus.INVALID_USER);
    }
  }

  static isExpired(
    ip: string | undefined,
    payload: jwt.JwtPayload,
    currentTime: moment.Moment,
  ) {
    return (
      !SecurityService.isValidForGeneralExpiration(currentTime, payload) &&
      !SecurityService.isValidForSameIpExpiration(currentTime, ip, payload)
    );
  }

  static isValidForGeneralExpiration(
    currentTime: moment.MomentInput,
    payload: jwt.JwtPayload,
  ) {
    if (typeof payload.exp !== "number") {
      return false;
    }
    return moment.unix(payload.exp).isAfter(currentTime);
  }

  static isValidForSameIpExpiration(
    currentTime: moment.MomentInput,
    ip: string | undefined,
    payload: jwt.JwtPayload,
  ) {
    return (
      ip === payload.exp2.ip &&
      moment.unix(payload.exp2.time).isAfter(currentTime)
    );
  }

  static isOldVersion(payload: jwt.JwtPayload) {
    return config.authTokens.version !== payload.version;
  }
}

export default SecurityService;

// Type definition for
/**
 * @typedef {Object} RequestDetails
 * @property {string} ip
 * @property {string} userAgent
 */
