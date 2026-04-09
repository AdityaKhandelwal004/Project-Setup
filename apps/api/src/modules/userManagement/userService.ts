import { Container } from "typedi";
import UserDao from "./userDao.ts";
import {
  HttpException,
  STATUS,
  formatErrorResponse,
  formatSuccessResponse,
  generateUUIDString,
  messageResponse,
  parserString,
  handleError,
  commonCatchHandler,
  randomPasswordGenerator,
} from "../../utils/index.ts";
import { Password } from "../../models/index.ts";
import { parserId, parserInteger } from "../../utils/daoHelper/index.ts";
import type { PoolClient } from "pg";
import type {
  RequestMetadata,
  signUpDto,
  UserDto,
} from "../security/models/types.ts";
import type {
  ChangePasswordDto,
  LogPasswordResetDto,
  MappedPasswordResetToken,
  MappedUser,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateProfileDto,
  UserProfile,
  ValidatePasswordDto,
  VerifyEmailDto,
} from "./models/types.ts";
import type { CurrentUser, Id } from "../../models/genericTypes.ts";
import { MessageService, BaseService } from "../../externalServices/index.ts";
import type { RoleName } from "../../auth/role.ts";
import type { User } from "../../externalServices/messageService.ts";
import moment from "moment";
import TwoFaService from "../twoFa/twoFaService.ts";
import S3Service from "../../externalServices/S3Service.ts";

class UserService extends BaseService {
  static MAX_TOKEN_GENERATION_ATTEMPTS = 5;

  private dao: UserDao;
  constructor() {
    super();
    this.dao = Container.get(UserDao);
  }

  async uploadProfilePictureToS3(
    client: PoolClient,
    file: Express.Multer.File | undefined,
    currentUser: CurrentUser,
  ) {
    const messageKey = "uploadProfilePicture";
    return this.handleExceptionWrapper(async () => {
      if (!file) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "invalidFile"),
        );
      }

      const res = await S3Service.uploadFile(file, "profile");

      const uploaded = await this.updateUser(client, {
        id: currentUser.id,
        profilePicture: res.Key,
      });

      if (!uploaded) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUploadImage"),
        );
      }

      return messageResponse(
        formatSuccessResponse(messageKey, "imageUploaded"),
      );
    }, messageKey);
  }

  async removeProfilePictureFromS3(
    client: PoolClient,
    currentUser: CurrentUser,
  ) {
    const messageKey = "removeProfilePicture";
    return this.handleExceptionWrapper(async () => {
      const user = await this.fetchUserProfile(currentUser);

      if (!user) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "userNotFound"),
        );
      }

      const imageKey = user?.profilePicturePath;

      if (imageKey) {
        const imageDeleted = await this.dao.removeProfileImage(
          client,
          currentUser?.id,
        );

        if (!imageDeleted) {
          throw new HttpException.BadRequest(
            formatErrorResponse(messageKey, "unableToDeleteImage"),
          );
        }

        await S3Service.deleteFile(imageKey);
      }
      return messageResponse(formatSuccessResponse(messageKey, "imageDeleted"));
    }, messageKey);
  }
  async createUser(
    client: PoolClient,
    dto: signUpDto,
    createdBy?: number,
  ): Promise<MappedUser> {
    const messageKey = "createUser";
    if (await this.dao.findDuplicate(client, dto)) {
      throw new HttpException.Conflict(
        formatErrorResponse(messageKey, "duplicateUser"),
      );
    }
    try {
      const userDto = await UserService.createUserDto(dto);
      const userDtoForDao = {
        ...userDto,
        dateOfBirth:
          userDto.dateOfBirth === null ? undefined : userDto.dateOfBirth,
      };
      const id = await this.dao.createUser(
        client,
        userDtoForDao,
        createdBy || 0,
      );
      const roles = Array.from(new Set(dto.role ?? []));
      await Promise.all(
        roles.map(async (role) => {
          await this.dao.attachRole(client, id, role);
        }),
      );
      const user = await this.findUserById(client, id);
      if (!user) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToCreate"),
        );
      }

      return user;
    } catch (err: Error | any) {
      console.log(err);
      throw commonCatchHandler(err, messageKey);
    }
  }

  async updateRoleByUserId(
    client: PoolClient,
    role: RoleName[],
    userId: number,
  ) {
    const messageKey = "updateRole";
    try {
      const isupdated = await this.dao.updateRoleByUserId(client, role, userId);
      if (!isupdated) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUpdate"),
        );
      }
      return true;
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async updateUserConsent(client: PoolClient, userId: Id, dto: signUpDto) {
    const messageKey = "updateUserConsent";
    try {
      const isupdated = await this.dao.updateUserConsent(client, userId, dto);
      if (!isupdated) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUpdate"),
        );
      }
      return true;
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async removeEmailVerificationTokenByUserId(client: PoolClient, userId: Id) {
    const messageKey = "removeEmailVerificationToken";
    try {
      return await this.dao.removeEmailVerificationTokenByUserId(
        client,
        userId,
      );
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async findAndVerifyEmailVerificationToken(client: PoolClient, token: string) {
    const messageKey = "verifyEmailToken";

    return this.handleExceptionWrapper(async () => {
      const record = await this.dao.fetchEmailVerificationTokenByToken(
        client,
        token,
      );

      if (!record) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "tokenNotFoundForUser"),
        );
      }

      if (
        !record.validitySeconds ||
        moment(record.createdOn)
          .add(record.validitySeconds, "seconds")
          .isBefore(moment())
      ) {
        throw new HttpException.Unauthorized(
          formatErrorResponse(messageKey, "tokenExpired"),
        );
      }

      return record;
    }, messageKey);
  }

  async sendCredential(
    client: PoolClient,
    dto: MappedUser,
    actionUser: CurrentUser,
  ) {
    const messageKey = "sendCredentials";
    try {
      const { newPassword, salt, actualPassword } =
        await UserService.generatePassword();

      const isUpdated = await this.updatePassword(
        client,
        {
          id: dto.id,
          salt,
          newPassword,
          updatedBy: actionUser.id,
        },
        messageKey,
      );
      if (!isUpdated) {
        throw new HttpException.ServerError(
          formatErrorResponse(messageKey, "unableToSend"),
        );
      }
      await this.sendAddUserConfirmationEmail({ ...dto, actualPassword });
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async generateEmailVerificationToken(
    client: PoolClient,
    user: MappedUser,
    requestMetadata: RequestMetadata,
  ) {
    const messageKey = "generateEmailVerificationToken";
    try {
      const token = generateUUIDString();

      const dto: VerifyEmailDto = {
        userId: user.id,
        token: token,
        requestIp: requestMetadata.ip,
        requestUserAgent: requestMetadata.userAgent,
        createdBy: user.id,
      };

      const tokenRecordGenerated =
        await this.dao.generateEmailVerificationTokenForUser(client, dto);

      if (!tokenRecordGenerated) {
        throw new HttpException.ServerError(
          formatErrorResponse(messageKey, "unableToGenerate"),
        );
      }

      return token;
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async sendEmailVerificationLink(
    client: PoolClient,
    user: MappedUser,
    requestMetadata: RequestMetadata,
  ) {
    const messageKey = "sendVerificationMail";
    try {
      const fetchUserDetails = await this.dao.fetchUserProfile(client, user.id);

      if (!fetchUserDetails) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "userNotFound"),
        );
      }

      if (fetchUserDetails.consents?.emailVerifiedAt) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "emailAlreadyVerified"),
        );
      }

      const token = await this.generateEmailVerificationToken(
        client,
        user,
        requestMetadata,
      );

      await MessageService.sendEmailVerification(
        user.firstName,
        user.email,
        token,
      );

      return messageResponse(
        formatSuccessResponse(messageKey, "verificationLinkSent"),
      );
    } catch (error: Error | any) {
      throw commonCatchHandler(error, messageKey);
    }
  }

  async getRights(actionUser: CurrentUser): Promise<string[]> {
    const { rights } = actionUser;
    return rights;
  }

  async updateUser(
    client: PoolClient,
    dto: UpdateProfileDto & { id: Id },
  ): Promise<MappedUser | null> {
    const messageKey = "updateUser";
    try {
      if (!dto?.id) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToUpdate"),
        );
      }

      // Get the current user data to check if email is being updated
      const currentUser = await this.findUserById(client, dto.id);

      const isEmailUpdated = dto.email
        ? currentUser?.email?.toLowerCase() !== dto?.email.toLowerCase()
        : false;

      const success = await this.dao.updateUser(client, dto, isEmailUpdated);
      if (!success)
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "unableToUpdate"),
        );

      // If email is updated, also update 2FA sender details
      if (isEmailUpdated && dto.email) {
        try {
          const twoFaService = Container.get(TwoFaService);
          await twoFaService.updateUser2FaSenderDetailsDirectly(
            client,
            dto.id,
            dto.email,
          );
        } catch (twoFaError) {
          console.log("Error updating 2FA sender details:", twoFaError);
          // Don't throw error for 2FA update failure, just log it
        }
      }

      return await this.findUserById(client, dto?.id);
    } catch (err) {
      console.log(err);
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "unableToUpdate"),
      );
    }
  }

  async markUserLogin(
    client: PoolClient,
    userId: Id,
    requestDetails: RequestMetadata,
    token?: string,
  ) {
    const messageKey = "markUserLogin";
    try {
      await this.dao.markUserLogin(client, userId, requestDetails, token);
    } catch (error) {
      console.log(error);
      throw new HttpException.ServerError(
        formatErrorResponse(messageKey, "unableToMark"),
      );
    }
  }

  async updateUserWrongLoginCount(wrongLoginCount: number, userId: Id) {
    return this.txs.withTransaction(async (client) => {
      await this.dao.markWrongLoginAttempt(client, wrongLoginCount, userId);
    });
  }

  async findUserById(client: PoolClient, id: Id): Promise<MappedUser | null> {
    return UserService.fromUser(await this.dao.findUserById(client, id));
  }

  async findUserByEmail(client: PoolClient, email: string) {
    return UserService.fromUser(await this.dao.findUserByEmail(client, email));
  }

  async findPersistedUserById(id: Id, messageKey = "fetchUser") {
    return this.txs.withTransaction(async (client) => {
      const user = await this.findUserById(client, id);
      if (!user) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "notFound"),
        );
      }
      return user;
    });
  }

  async fetchUserProfile(actionUser: CurrentUser) {
    return await this.withTransaction(async (client) => {
      const data = await this.fetchUserProfileBussinessLogic(
        client,
        actionUser,
      );
      if (!data) {
        throw new HttpException.NotFound(
          formatErrorResponse("fetchUserProfile", "notFound"),
        );
      }
      return data;
    }, "fetchUserProfile");
  }
  async fetchUserProfileBussinessLogic(
    client: PoolClient,
    actionUser: CurrentUser,
  ): Promise<UserProfile | null> {
    return await this.dao.fetchUserProfile(client, actionUser.id);
  }

  async modifyUserProfile(
    updateDto: UpdateProfileDto,
    actionUser: CurrentUser,
  ) {
    return this.txs.withTransaction(async (client) => {
      const dto = UserService.updateProfileDto(updateDto, actionUser.id);
      const user = await this.updateUser(client, dto);
      return (
        user &&
        messageResponse(
          formatSuccessResponse("profile", "updatedSucessfully"),
          UserService.fromUserProfile(user),
        )
      );
    });
  }

  async uploadProfilePicture(
    currentUser: CurrentUser,
    file: Express.Multer.File | undefined,
  ) {
    const messageKey = "uploadProfilePicture";
    return this.withTransaction(async (client) => {
      return this.uploadProfilePictureToS3(client, file, currentUser);
    }, messageKey);
  }

  async removeProfilePicture(currentUser: CurrentUser) {
    const messageKey = "removeProfilePicture";
    return this.withTransaction(async (client) => {
      return this.removeProfilePictureFromS3(client, currentUser);
    }, messageKey);
  }

  async changePassword(dto: ChangePasswordDto, actionUser: CurrentUser) {
    const messageKey = "changePassword";
    return this.txs.withTransaction(async (client) => {
      try {
        await this.isOldPasswordValid(
          client,
          dto.oldPassword,
          actionUser,
          messageKey,
        );

        UserService.validatePassword(dto, messageKey, true);

        const { hash, salt } = await new Password(
          dto.newPassword,
        ).hashPassword();

        const isUpdated = await this.updatePassword(
          client,
          {
            id: actionUser.id,
            salt,
            newPassword: hash,
            updatedBy: actionUser.id,
          },
          messageKey,
        );

        MessageService.sendPasswordChangeEmail({
          firstName: actionUser.firstName,
          email: actionUser.email,
        });
        if (!isUpdated) {
          throw new HttpException.ServerError(
            formatErrorResponse(messageKey, "unableToUpdate"),
          );
        }

        return messageResponse(
          formatSuccessResponse(messageKey, "updatedSucessfully"),
        );
      } catch (error: any) {
        throw commonCatchHandler(error, messageKey);
      }
    });
  }

  async sendEmailVerificationLinkToUser(
    currentUser: CurrentUser,
    requestMetadata: RequestMetadata,
  ) {
    const messageKey = "sendEmailVerificationLinkToUser";
    return this.withTransaction(async (client) => {
      return this.sendEmailVerificationLink(
        client,
        {
          id: currentUser.id,
          email: currentUser.email,
          firstName: currentUser.firstName,
        } as MappedUser,
        requestMetadata,
      );
    }, messageKey);
  }

  async requestAccountDeletion(currentUser: CurrentUser) {
    const messageKey = "requestAccountDeletion";
    return this.withTransaction(async (client) => {
      return this.requestUserAccountDeletion(client, currentUser);
    }, messageKey);
  }

  async requestUserAccountDeletion(
    client: PoolClient,
    actionUser: CurrentUser,
  ) {
    const messageKey = "requestUserAccountDeletion";
    return this.handleExceptionWrapper(async () => {
      const user = await this.findUserById(client, actionUser.id);
      if (!user) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "notFound"),
        );
      }
      if (user.status === STATUS.DELETED) {
        throw new HttpException.BadRequest(
          formatErrorResponse(messageKey, "accountAlreadyDeleted"),
        );
      }

      await this.sendAccountDeletionRequest(client, user);

      MessageService.sendAccountDeletionRequest({...user, adminEmail: "anand.thanvi@memorres.com"});
      return messageResponse(
        formatSuccessResponse(messageKey, "accountDeletionRequested"),
      );
    }, messageKey);
  }

  async sendAccountDeletionRequest(client: PoolClient, user: MappedUser) {
    const messageKey = "sendAccountDeletionRequest";
    return this.handleExceptionWrapper(async () => {
      const adminUser = await this.getAdminUser(client);
      const isMailSent = await MessageService.sendAccountDeletionRequest({
        ...user,
        adminEmail: adminUser.email,
      });
      if (!isMailSent) {
        throw new HttpException.ServerError(
          formatErrorResponse(messageKey, "unableToSendAccountDeletionRequest"),
        );
      }
    }, messageKey);
  }

  async getAdminUser(client: PoolClient) {
    const messageKey = "getAdminUser";
    return this.handleExceptionWrapper(async () => {
      const adminUser = await this.dao.getAdminUser(client);

      if (!adminUser) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "adminUserNotFound"),
        );
      }
      return adminUser;
    }, messageKey);
  }

  async isOldPasswordValid(
    client: PoolClient,
    oldPassword: string,
    actionUser: { id: Id },
    messageKey: string,
  ) {
    const user = await this.dao.findUserById(client, actionUser.id);
    const validPassword = await user?.passwordHash?.check(oldPassword);
    if (!validPassword) {
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "invalidOldPassword"),
      );
    }
  }

  async updatePassword(
    client: PoolClient,
    dto: UpdatePasswordDto,
    messageKey: string,
  ) {
    try {
      const isUpdated = await this.dao.updatePassword(client, dto);
      if (!isUpdated) {
        throw new HttpException.NotFound(
          formatErrorResponse(messageKey, "unableToChangePassword"),
        );
      }
      return messageResponse(
        formatSuccessResponse(messageKey, "passwordChanged"),
      );
    } catch (error: any) {
      return handleError(error, messageKey, "unableToChangePassword");
    }
  }

  async forgotPassword(email: string, requestMetadata: RequestMetadata) {
    const messageKey = "forgotPassword";
    const success = formatSuccessResponse(messageKey, "emailSent");
    try {
      return this.txs.withTransaction(async (client) => {
        const userResult = await this.dao.findUserByEmail(client, email, true);
        const user = userResult === undefined ? null : userResult;
        this.isValidUser(user, messageKey);
        const token = await this.getTokenResult(
          client,
          user,
          requestMetadata,
          messageKey,
        );
        if (token) {
          await this.sendForgetPasswordEmail(user, token);
        }
        return messageResponse(success);
      });
    } catch (error: any) {
      return handleError(
        error,
        messageKey,
        "failedToGeneratePasswordResetLink",
      );
    }
  }

  isValidUser(
    user: MappedUser | null | undefined,
    messageKey: string,
  ): asserts user is MappedUser {
    if (!user) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "notFound"),
      );
    }
  }

  async getTokenResult(
    client: PoolClient,
    user: MappedUser | null,
    requestMetadata: RequestMetadata,
    messageKey: string,
  ): Promise<MappedPasswordResetToken | null> {
    const userId = user?.id;

    if (!userId) {
      throw new HttpException.NotFound(
        formatErrorResponse(messageKey, "notFound"),
      );
    }
    const newToken = await this.generateUUIDToken(
      client,
      userId,
      requestMetadata,
      messageKey,
    );
    return newToken;
  }

  async generateUUIDToken(
    client: PoolClient,
    userId: Id,
    requestMetadata: RequestMetadata,
    messageKey: string,
  ): Promise<MappedPasswordResetToken | null> {
    let success = false;
    let attempts = 0;
    const maxAttempts = 5;
    /**
     * @type {import('./userDao').PasswordRestToken}
     */
    let tokenResult: MappedPasswordResetToken | null = null;

    while (!success && attempts < maxAttempts) {
      try {
        const token = generateUUIDString();
        // eslint-disable-next-line no-await-in-loop
        tokenResult = await this.dao.saveToken(
          client,
          token,
          userId,
          requestMetadata,
        );
        success = tokenResult?.token === token;
      } catch (error: any) {
        if (error?.code !== "23505") {
          break;
        }
      }
      attempts += 1;
    }

    if (!success) {
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "unableToGeneratePasswordResetLink"),
      );
    }
    return tokenResult;
  }

  async sendAddUserConfirmationEmail(user: User) {
    const isMailSent = await MessageService.sendAddUserConfirmationEmail(user);
    if (!isMailSent) {
      throw new HttpException.ServerError(
        formatErrorResponse("forgetPassword", "unableToSendLoginLink"),
      );
    }
  }

  async sendForgetPasswordEmail(
    user: MappedUser,
    token: MappedPasswordResetToken,
  ) {
    const isMailSent = await MessageService.sendPasswordReset(user, token);
    if (!isMailSent) {
      throw new HttpException.ServerError(
        formatErrorResponse("forgetPassword", "unableToSendPasswordResetLink"),
      );
    }
  }

  async sendResetPasswordEmail(user: MappedUser) {
    const isMailSent = await MessageService.sendPasswordResetConfirmation(user);
    if (!isMailSent) {
      throw new HttpException.ServerError(
        formatErrorResponse("forgetPassword", "unableToSendPasswordResetLink"),
      );
    }
  }

  async findUserDetailsByToken(client: PoolClient, token: string) {
    return await this.dao.findUserDetailsByToken(client, token);
  }

  async deleteToken(client: PoolClient, token: string) {
    return await this.dao.deleteToken(client, token);
  }

  async logPasswordReset(client: PoolClient, dto: LogPasswordResetDto) {
    return await this.dao.logPasswordReset(client, dto);
  }

  // async uploadProfileImage(
  //   client: PoolClient,
  //   files: MulterFiles,
  //   actionUser: CurrentUser
  // ) {
  //   const messageKey = 'profile';
  //   if (!files) {
  //     throw new HttpException.BadRequest(
  //       formatErrorResponse(messageKey, 'filesNotProvided')
  //     );
  //   }
  //   if (!Array.isArray(files)) {
  //     console.log('messageKey', files);
  //     throw new HttpException.BadRequest(
  //       formatErrorResponse(messageKey, 'invalidData')
  //     );
  //   }
  //   if (files.length === 0) {
  //     throw new HttpException.BadRequest(
  //       formatErrorResponse(messageKey, 'noFilesProvided')
  //     );
  //   }
  //   if (files.length > 1) {
  //     try {
  //       // eslint-disable-next-line
  //       for (const file of files) {
  //         // eslint-disable-next-line no-await-in-loop
  //         await deleteFile(file.path);
  //       }
  //     } catch (error) {
  //       console.log(
  //         '[ERROR][USERS] Unable to delete files (more than one is uploaded)',
  //         error
  //       );
  //     }
  //     throw new HttpException.BadRequest(
  //       formatErrorResponse(messageKey, 'onlyOneFileAllowed')
  //     );
  //   }
  //   try {
  //     const file = files[0];
  //     const photoUploadResponse = await S3Service.uploadToS3(
  //       file,
  //       S3Service.PROFILE_PICTURE
  //     );
  //     const s3Key = photoUploadResponse.key;
  //     await this.dao.uploadProfilePicture(client, s3Key, actionUser);
  //     return messageResponse(
  //       formatSuccessResponse(messageKey, 'profilePictureUploadedSuccessFully')
  //     );
  //   } catch (error: Error | any) {
  //     console.log('[ERROR][USERS] Unable to upload photo', error);
  //     throw commonCatchHandler(error, messageKey);
  //   }
  // }

  // async uploadImages(files: MulterFiles, actionUser: CurrentUser) {
  //   return await this.txs.withTransaction(
  //     async (client) => await this.uploadProfileImage(client, files, actionUser)
  //   );
  // }

  // async removeProfilePicture(actionUser: CurrentUser) {
  //   return await this.txs.withTransaction(
  //     async (client) => await this.deleteProfilePicture(client, actionUser)
  //   );
  // }

  // async deleteProfilePicture(client: PoolClient, actionUser: CurrentUser) {
  //   const messageKey: string = 'profile';
  //   try {
  //     const res = await this.fetchUserProfile(actionUser);
  //     if (!res?.profilePicture) {
  //       throw new HttpException.NotFound(
  //         formatErrorResponse('profile', 'notFound')
  //       );
  //     }

  //     const isDeleted = await this.dao.deleteProfilePicture(
  //       client,
  //       actionUser,
  //       actionUser.id
  //     );
  //     if (!isDeleted) {
  //       throw new HttpException.ServerError(
  //         formatErrorResponse('profile', 'imageUnableToRemove')
  //       );
  //     }
  //     await S3Service.removeFromS3(res.profilePicture);

  //     return messageResponse(
  //       formatSuccessResponse('profile', 'imageRemovedSuccessfully')
  //     );
  //   } catch (e: any) {
  //     throw commonCatchHandler(e, messageKey);
  //   }
  // }

  static validatePassword(
    dto: ValidatePasswordDto,
    messageKey: string,
    blockSameOldPassword = false,
  ) {
    if (dto?.newPassword !== dto?.confirmPassword) {
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "passwordsDoNotMatch"),
      );
    }

    if (blockSameOldPassword && dto?.oldPassword === dto?.newPassword) {
      throw new HttpException.BadRequest(
        formatErrorResponse(messageKey, "oldPasswordSameAsNew"),
      );
    }
  }

  static async generatePassword() {
    let password;
    let actualPassword;

    const generated = randomPasswordGenerator(8);
    actualPassword = generated.string;
    password = generated.md5String;
    const res = await new Password(password).hashPassword();

    return { newPassword: res.hash, salt: res.salt, actualPassword };
  }

  static async createUserDto(dto: signUpDto): Promise<UserDto> {
    let hash: string | null = null;
    let salt: string | undefined = undefined;

    if (dto.password) {
      const res = await new Password(dto.password).hashPassword();
      hash = res.hash;
      salt = res.salt;
    }

    if (!hash || !salt) {
      throw new HttpException.BadRequest(
        formatErrorResponse("createUser", "invalidCredentials"),
      );
    }

    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
      email: dto.email,
      password: hash,
      salt: salt,
      status: STATUS.ACTIVE,
    };
  }

  static updateUserDto(dto: UserDto, updatedBy: Id) {
    return {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      updatedBy,
    };
  }

  static updateProfileDto(dto: UpdateProfileDto, actionUserId: Id) {
    return {
      id: parserId(actionUserId),
      firstName: parserString(dto?.firstName),
      lastName: parserString(dto?.lastName),
      email: parserString(dto?.email),
      dateOfBirth: parserString(dto?.dateOfBirth),
    };
  }

  static fromUser(user: MappedUser | null) {
    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  }

  static fromUserProfile(user: MappedUser | CurrentUser) {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      role: user.role,
      profilePicture: user.profilePicture || null,
      lastLogin: user.lastLogin,
    };
  }

  static changePasswordDto(dto: ChangePasswordDto, actionUserId: Id) {
    return {
      newPassword: parserString(dto?.newPassword),
      oldPassword: parserString(dto?.oldPassword),
      confirmPassword: parserString(dto?.confirmPassword),
      id: parserInteger(actionUserId),
    };
  }

  static requestForgotPasswordDto(dto: { email: string }) {
    return {
      email: parserString(dto?.email),
    };
  }

  static resetPasswordDto(dto: ResetPasswordDto, userId: Id) {
    return {
      id: parserInteger(userId),
      resetToken: parserString(dto?.email),
      newPassword: parserString(dto?.newPassword),
      confirmPassword: parserString(dto?.confirmPassword),
    };
  }
}

export default UserService;

/**
 * @typedef {Object} updateProfileDto
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 */

/**
 * @typedef {Object} changePasswordDto
 * @property {string} newPassword
 * @property {string} oldPassword
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} resetPasswordLogDto
 * @property {number} userId
 * @property {string} ip
 * @property {string} userAgent
 * @property {string} token
 */
