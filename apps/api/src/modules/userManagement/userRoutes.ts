import { Container } from "typedi";
import { routes, featureLevel, get, patch, post, deleteMethod } from "../../utils/index.ts";
import { Right, Role } from "../../auth/index.ts";
import UserService from "./userService.ts";
import {
  changePasswordSchema,
  updateUserProfileSchema,
} from "./schemas/index.ts";
import type { ChangePasswordDto, UpdateProfileDto } from "./models/types.ts";
import type { CurrentUser } from "../../models/genericTypes.ts";
import type { RequestMetadata } from "../security/models/types.ts";
import { uploadFile } from "../../routes/middlewares/uploadFile.ts";

export default () => {
  get(
    featureLevel.production,
    Right.profile.GET_PROFILE,
    routes.profile.GET_PROFILE,
    async (req) => {
      const service = Container.get(UserService);
      return await service.fetchUserProfile(req.currentUser as CurrentUser);
    }
  );

  get(
    featureLevel.production,
    Right.profile.GET_USER_RIGHTS,
    routes.profile.GET_USER_RIGHTS,
    async (req) => {
      const service = Container.get(UserService);
      return service.getRights(req.currentUser as CurrentUser);
    }
  );

  post(
    featureLevel.production,
    Right.profile.CHANGE_PASSWORD,
    routes.profile.CHANGE_PASSWORD,
    async (req) => {
      const service = Container.get(UserService);
      const dto = await changePasswordSchema.validateAsync(req.body);
      return await service.changePassword(
        dto as ChangePasswordDto,
        req.currentUser as CurrentUser
      );
    }
  );

  post(
    featureLevel.production,
    Right.profile.SEND_EMAIL_VERIFICATION_LINK,
    routes.profile.SEND_EMAIL_VERIFICATION_LINK,
    async (req) => {
      const service = Container.get(UserService);
      const { "user-agent": userAgent } = req.headers;
      const requestMetadata: RequestMetadata = {
        userAgent: userAgent ?? "",
        ip: req.ip ?? "",
        allowedRoles: [Role.roleValues.OBIE_USER],
      };
      return await service.sendEmailVerificationLinkToUser(
        req.currentUser as CurrentUser,
        requestMetadata
      );
    }
  );

  post(
    featureLevel.production,
    Right.profile.REQUEST_ACCOUNT_DELETION,
    routes.profile.REQUEST_ACCOUNT_DELETION,
    async (req) => {
      const service = Container.get(UserService);
      return await service.requestAccountDeletion(req.currentUser as CurrentUser);
    }
  );

  patch(
    featureLevel.production,
    Right.profile.UPDATE_PROFILE,
    routes.profile.UPDATE_PROFILE,
    async (req) => {
      const service = Container.get(UserService);
      const dto = await updateUserProfileSchema.validateAsync(req.body);
      return await service.modifyUserProfile(
        dto as UpdateProfileDto,
        req.currentUser as CurrentUser
      );
    }
  );

  post(
    featureLevel.production,
    Right.profile.UPLOAD_PROFILE_PICTURE,
    routes.profile.UPLOAD_PROFILE_PICTURE,
    async (req) => {
      const service = Container.get(UserService);

      const file = req.file;

      return service.uploadProfilePicture(
        req.currentUser as CurrentUser,
        file
      );
    },
    [uploadFile]
  );

  deleteMethod(
    featureLevel.production,
    Right.profile.DELETE_PROFILE_PICTURE,
    routes.profile.DELETE_PROFILE_PICTURE,
    async (req) => {
      const service = Container.get(UserService);
      return await service.removeProfilePicture(req.currentUser as CurrentUser);
    }
  );
};
