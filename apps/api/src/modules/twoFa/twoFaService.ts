import { Container } from "typedi";
import moment from "moment";
import {
  HttpException,
  STATUS,
  ACTION_TYPE,
  formatErrorResponse,
  formatSuccessResponse,
  messageResponse,
  randomNumber,
  TOKEN_TYPE,
  commonCatchHandler,
  MESSAGE_TYPES,
} from "../../utils/index.ts";
import { BaseService, MessageService } from "../../externalServices/index.ts";
import type { PoolClient } from "pg";
import type { CurrentUser, Id } from "../../models/genericTypes.ts";
import type {
  TwoFaDto,
  SetTwoFaActionDto,
  ModifyTwoFaActionDto,
  VerifyTwoFaActionDto,
  VerifyTwoFaDto,
  ActionUser,
  SendCode,
} from "./models/type.ts";
import type { MappedUser } from "../userManagement/models/types.ts";
import TwoFaDao from "./twoFaDao.ts";

export default class TwoFaService extends BaseService {
  private dao: TwoFaDao;

  constructor() {
    super();
    this.dao = Container.get(TwoFaDao);
  }

  async getTwoFaMethods() {
    return await this.txs.withTransaction(async (client: PoolClient) => {
      const result = await this.dao.getTwoFaMethods(client);
      return result;
    });
  }

  async getUserTwoFaMethods(actionUser: CurrentUser) {
    return await this.txs.withTransaction(async (client: PoolClient) => {
      return await this.getTwoFaMethodsByUserId(client, actionUser.id) || {};
    });
  }

  async setTwoFa(dto: TwoFaDto, actionUser: ActionUser) {
    const actionDto = TwoFaService.setTwoFaDto(dto, actionUser);
    return await this.txs.withTransaction(
      async (client: PoolClient) =>
        await this.enableTwoFa(client, actionDto, actionUser)
    );
  }

  async enableTwoFa(
    client: PoolClient,
    actionDto: SetTwoFaActionDto,
    actionUser: ActionUser
  ) {
    const messageKey = "twoFactorAuthentication";
    try {
      const result = await this.dao.getUserTwoFa(client, actionDto);
      if (result) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "alreadyExists")
        );
      }
      const isSuccess = await this.sendTwoFaToken(
        client,
        actionDto,
        actionUser
      );
      if (!isSuccess) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToSendOtp")
        );
      }
      return messageResponse(
        formatSuccessResponse(messageKey, "otpSentSuccessFully")
      );
    } catch (error: any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async sendTwoFaToken(
    client: PoolClient,
    actionDto: SetTwoFaActionDto,
    actionUser: ActionUser | MappedUser
  ) {
    const messageKey = "sendTwoFaToken";
    try {
      const token = actionDto.isUnitTest ? 999999 : randomNumber(6);
      await this.dao.delete2FaToken(client, actionDto);
      const isTokenAdded = await this.dao.addTwoFaToken(client, actionDto, {
        token,
        validitySecs: 300,
      });
      if (!isTokenAdded) {
        return false;
      }

      await this.dao.storePending2FaSetup(client, actionDto, token.toString());

      const userCurrent2Fa = await this.dao.getTwoFaMethodById(
        client,
        actionDto.methodId
      );

      if (userCurrent2Fa.code === MESSAGE_TYPES.EMAIL) {
        const isSent = await MessageService.sendTwoFaConfirmationCode(
          {
            ...actionDto,
            firstName: actionUser.firstName,
            email: actionDto.senderDetail,
          },
          {
            token,
            validitySecs: 300,
          }
        );
        if (!isSent) {
          throw new HttpException.NotFound(
            formatErrorResponse(messageKey, 'unableToSendOtp')
          );
        }
      }

      return true;
    } catch (error: any) {
      console.log(error);
      throw commonCatchHandler(error, messageKey);
    }
  }

  async confirmTwoFa(dto: VerifyTwoFaDto, actionUser: ActionUser) {
    const messageKey = "twoFactorAuthentication";
    const actionDto = TwoFaService.verifyTwoFaDto(dto, actionUser);
    return await this.withTransaction(async (client: PoolClient) => {
      return await this.verifyTwoFa(client, actionDto, actionUser);
    }, messageKey);
  }

  async verifyTwoFa(
    client: PoolClient,
    actionDto: VerifyTwoFaActionDto,
    actionUser: ActionUser
  ) {
    const messageKey = "verifyTwoFa";
    return this.handleExceptionWrapper(async () => {
      const updatedDto = { ...actionDto };
      let isSetUp = false;
      const result = await this.dao.getUserTwoFa(client, updatedDto);

      if (!result && updatedDto.actionType !== TOKEN_TYPE[ACTION_TYPE.ENABLE]) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "notATwoFaUser")
        );
      }

      if (result && updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.MODIFY]) {
        updatedDto.currentMethodId = result.two_fa_method_id;
      }
      const isVerified = await this.verifyTwoFaToken(client, updatedDto);
      if (!isVerified) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "inValidToken")
        );
      }
      
      // For new user ENABLE action, validate sender detail matches original setup
      if (!result && updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE] && updatedDto.token) {
        const isPendingValid = await this.dao.validatePending2FaSetup(
          client,
          updatedDto,
          updatedDto.token.toString()
        );
        if (!isPendingValid) {
          throw new HttpException.BadRequest(
            formatErrorResponse(messageKey, "senderDetailMismatch")
          );
        }
        await this.dao.cleanupPending2FaSetup(client, updatedDto, updatedDto.token.toString());
      }
      if (
        !result &&
        updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE]
      ) {
        const isAdded = await this.dao.setUpUserTwoFa(client, updatedDto);
        isSetUp = isAdded;
        if (!isAdded) {
          throw new HttpException.NotFound(
            formatErrorResponse("twoFactorAuthentication", "unableToAdd")
          );
        }
      }

      if (
        await this.enableOrDisableTwoFa(client, actionDto, isSetUp, actionUser)
      ) {
        return messageResponse(
          formatSuccessResponse(
            "twoFactorAuthentication",
            "verifiedSuccessfully"
          )
        );
      }

      if (await this.verifyTwoFaModification(client, updatedDto)) {
        return messageResponse(
          formatSuccessResponse(
            "twoFactorAuthentication",
            "verifiedSuccessfully"
          )
        );
      }
      await this.updateTwoFaTokenHistory(client, {
        ...updatedDto,
      });

      return {
        ...messageResponse(
          formatSuccessResponse(
            "twoFactorAuthentication",
            "verifiedSuccessfully"
          )
        ),
      };
    }, messageKey);
  }

  async enableOrDisableTwoFa(
    client: PoolClient,
    updatedDto: VerifyTwoFaActionDto,
    isSetUp: boolean,
    actionUser: ActionUser
  ) {
    const messageKey = "twoFactorAuthentication";
    // Handle ENABLE/DISABLE for users with existing 2FA settings (both new and existing users)
    if (
      updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE] ||
      updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.DISABLE]
    ) {
      const status =
        updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE]
          ? STATUS.ACTIVE
          : STATUS.INACTIVE;

      const isUpdated = await this.dao.changeUser2FaStatus(client, {
        status,
        userId: actionUser.id,
        methodId: updatedDto.methodId,
      });
      
      if (!isUpdated)
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToUpdateUser2fa")
        );

      await this.updateTwoFaTokenHistory(client, updatedDto);
      return true;
    }
    return false;
  }

  async verifyTwoFaModification(
    client: PoolClient,
    updatedDto: VerifyTwoFaActionDto
  ) {
    const messageKey = "twoFactorAuthentication";
    if (updatedDto.actionType === TOKEN_TYPE[ACTION_TYPE.MODIFY]) {
      
      // Verify new method token only
      const isNewMethodTokenVerified = await this.verifyTwoFaToken(client, {
        ...updatedDto,
        currentMethodId: null,
        token: updatedDto.token, // Use the main verification token
        tokenType: updatedDto.actionType,
      });

      if (!isNewMethodTokenVerified) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "invalidVerificationToken")
        );
      }

      // Update user 2FA settings with new method and sender details
      const isUpdated = await this.dao.updateUser2FaSettings(
        client,
        updatedDto
      );
      if (!isUpdated) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToUpdateUser2fa")
        );
      }

      // Update token history
      await this.updateTwoFaTokenHistory(client, {
        ...updatedDto,
        tokenType: updatedDto.actionType,
      });
      
      return true;
    }

    return false;
  }

  async updateTwoFaTokenHistory(
    client: PoolClient,
    actionDto: VerifyTwoFaActionDto
  ) {
    const isUpdated = await this.dao.updateTwoFaTokenHistory(client, actionDto);
    if (!isUpdated) {
      throw new HttpException.NotFound(
        formatErrorResponse("twoFactorAuthentication", "failed")
      );
    }

    await this.dao.delete2FaToken(client, actionDto);
    return isUpdated;
  }

  async verifyTwoFaToken(client: PoolClient, actionDto: VerifyTwoFaActionDto) {
    const result = await this.dao.get2FaToken(client, actionDto);
    
    if (!result || !actionDto.token || Number(actionDto.token) !== Number(result.token)) {
      return false;
    }
    
    const startMoment = moment.utc(result.created_on);
    const endMoment = startMoment
      .clone()
      .add(result.validity_seconds, "seconds");

    const now = moment.utc();
    const isInMoment =
      now.isSameOrAfter(startMoment) && now.isSameOrBefore(endMoment);

    return isInMoment;
  }

  async updateTwoFa(dto: TwoFaDto, actionUser: ActionUser) {
    const messageKey = "twoFactorAuthentication";
    return await this.withTransaction(async (client: PoolClient) => {
      const actionDto = TwoFaService.modifyTwoFaDto(dto, actionUser);
      return await this.modifyTwoFa(client, actionDto, actionUser);
    }, messageKey);
  }

  async modifyTwoFa(
    client: PoolClient,
    actionDto: ModifyTwoFaActionDto,
    actionUser: CurrentUser
  ) {
    const messageKey = "twoFactorAuthentication";

    let result = await this.dao.getUserTwoFa(client, {
      ...actionDto,
    });

    if (!result) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "notATwoFaUser")
      );
    }

    if (actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE]) {
      if (result.status === STATUS.ACTIVE) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "alreadyEnabled")
        );
      }
    } else if (actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.DISABLE]) {
      if (result.status === STATUS.INACTIVE) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "alreadyDisabled")
        );
      }
    } else if (actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.MODIFY]) {
      if (result.status !== STATUS.ACTIVE) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "twoFaMustBeActiveToModify")
        );
      }
    }

    // Verify the action is valid
    TwoFaService.verifyTwoFaAction(actionDto, result);

    // Handle different action types
    if (
      actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE] ||
      actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.DISABLE]
    ) {
      return await this.handleEnableDisable2Fa(
        client,
        actionDto,
        actionUser,
        result
      );
    }

    if (actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.MODIFY]) {
      return await this.handleModify2Fa(client, actionDto, actionUser);
    }

    throw new HttpException.BadRequest(
      formatErrorResponse(messageKey, "invalidActionType")
    );
  }

  async handleEnableDisable2Fa(
    client: PoolClient,
    actionDto: ModifyTwoFaActionDto,
    actionUser: CurrentUser,
    result: any
  ) {
    const messageKey = "twoFactorAuthentication";

    // Delete any existing tokens for this user and method
    await this.dao.delete2FaToken(client, {
      ...actionDto,
      methodId: result.two_fa_method_id,
      isUpdate: true,
    });

    const verificationToken = actionDto.isUnitTest ? 999999 : randomNumber(6);

    const isTokenAdded = await this.dao.addTwoFaToken(
      client,
      {
        ...actionDto,
        methodId: result.two_fa_method_id,
        tokenType: actionDto.actionType,
      },
      {
        token: verificationToken,
        validitySecs: 300, // 5 minutes
      }
    );

    if (!isTokenAdded) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "unableToSendToken")
      );
    }

    const currentMethod = await this.dao.getTwoFaMethodById(
      client,
      result.two_fa_method_id
    );
    await this.sendCode({
      code: currentMethod.code,
      senderDetail: result.two_fa_sender_details,
      token: verificationToken,
      firstName: actionUser.firstName,
      isEnabling: actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE],
    });

    const actionText =
      actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE]
        ? "enable"
        : "disable";
    return messageResponse(
      formatSuccessResponse(
        messageKey,
        `verificationCodeSentTo${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`
      )
    );
  }

  async handleModify2Fa(
    client: PoolClient,
    actionDto: ModifyTwoFaActionDto,
    actionUser: CurrentUser,
  ) {
    const messageKey = "twoFactorAuthentication";

    // Delete any existing tokens for this user
    await this.dao.delete2FaToken(client, {
      ...actionDto,
      isUpdate: true,
    });

    // Generate token for new method verification only
    const newMethodToken = actionDto.isUnitTest ? 999999 : randomNumber(6);

    // Add token for new method verification
    const isNewTokenAdded = await this.dao.addTwoFaToken(
      client,
      {
        ...actionDto,
        methodId: actionDto.methodId,
        tokenType: actionDto.actionType,
      },
      {
        token: newMethodToken,
        validitySecs: 300, // 5 minutes
      }
    );

    if (!isNewTokenAdded) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "unableToSendNewMethodToken")
      );
    }

    // Send verification code to new method only
    const newMethod = await this.dao.getTwoFaMethodById(
      client,
      actionDto.methodId
    );
    await this.sendCode({
      code: newMethod.code,
      senderDetail: actionDto.senderDetail,
      token: newMethodToken,
      firstName: actionUser.firstName,
      isEnabling: actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.ENABLE]
    });

    return {
      ...messageResponse(
        formatSuccessResponse(
          messageKey,
          "verificationCodeSentForModification"
        )
      )
    };
  }

  async sendCode(twoFaDetails: SendCode) {
    if (twoFaDetails.code === MESSAGE_TYPES.EMAIL) {
      await MessageService.sendTwoFaConfirmationCodeToUpdateStatus(
        {
          firstName: twoFaDetails.firstName,
          email: twoFaDetails.senderDetail,
          token: twoFaDetails.token,
          validitySecs: 300,
          isEnabling: twoFaDetails.isEnabling,
        }
      );
    }
  }

  async getTwoFaMethodsByUserId(client: PoolClient, id: Id) {
    const result = await this.dao.getUserTwoFaMethods(client, {
      userId: id,
    });
    return result;
  }

  async updateUser2FaSenderDetailsDirectly(client: PoolClient, userId: Id, newEmail: string) {
    const messageKey = "updateUser2FaSenderDetails";
    try {
      const result = await this.dao.getUserTwoFa(client, { userId });
      
      if (!result) {
        return true;
      }

      const isUpdated = await this.dao.updateUser2FaSenderDetails(client, userId, newEmail);
      
      if (!isUpdated) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToUpdate")
        );
      }

      return true;
    } catch (error: any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  static verifyTwoFaAction(actionDto: ModifyTwoFaActionDto, result: any) {
    const messageKey = "twoFactorAuthentication";
    
    if (actionDto.actionType === TOKEN_TYPE[ACTION_TYPE.MODIFY]) {
      // Check if trying to modify to the same sender details
      if (actionDto.senderDetail === result.two_fa_sender_details) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUpdateWithSameSenderDetails")
        );
      }
      
      // Check if trying to modify to the same method
      if (actionDto.methodId === result.two_fa_method_id) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUpdateWithSameMethod")
        );
      }
    }
    
    // Status checks are now handled in modifyTwoFa method
  }  static formatRecoveryCodes(rows: any[]) {
    const result: any = [];
    rows.forEach((row) => {
      const obj = {
        id: row.id,
        code: row.recovery_code,
      };
      result.push(obj);
    });

    return result;
  }

  static setTwoFaDto(dto: TwoFaDto, actionUser: ActionUser) {
    return {
      userId: actionUser.id,
      ip: actionUser.ip,
      userAgent: actionUser.userAgent ?? "",
      methodId:
        typeof dto.methodId === "string"
          ? parseInt(dto.methodId, 10)
          : dto.methodId,
      senderDetail: dto.senderDetail,
      isUnitTest: actionUser.isUnitTest,
      tokenType: TOKEN_TYPE[ACTION_TYPE.ENABLE],
    };
  }

  static verifyTwoFaDto(dto: VerifyTwoFaDto, actionUser: ActionUser) {
    return {
      userId: actionUser.id,
      methodId:
        typeof dto.methodId === "string"
          ? parseInt(dto.methodId, 10)
          : dto.methodId,
      senderDetail: dto.senderDetail,
      token: dto.verificationToken,
      newMethodVerificationToken: dto?.newMethodVerificationToken,
      actionType: TOKEN_TYPE[dto.actionType],
      ip: actionUser.ip,
      userAgent: actionUser.userAgent,
    };
  }

  static modifyTwoFaDto(dto: TwoFaDto, actionUser: ActionUser) {
    return {
      userId: actionUser.id,
      ip: actionUser.ip,
      userAgent: actionUser.userAgent,
      methodId:
        typeof dto.methodId === "string"
          ? parseInt(dto.methodId, 10)
          : dto.methodId,
      senderDetail: dto.senderDetail,
      isUnitTest: actionUser.isUnitTest,
      actionType: TOKEN_TYPE[dto.actionType],
    };
  }
}
