import type { Moment } from "moment";
import type { RoleName } from "../../../auth/role.ts";
import type PasswordHash from "../../../models/passwordHash.ts";
import type { Id } from "../../../models/genericTypes.ts";
import type { ACTION_BY_TYPE } from "../../../utils/constants.ts";
import type { PermissionName } from "../../../auth/permission.ts";

export interface UserRow {
  id: Id;
  email: string;
  password?: string | null;
  status: string;
  first_name: string;
  last_name: string;
  wrong_login_count?: number | string | null;
  last_wrong_login_attempt?: string | Date | null;
  last_login?: string | Date | null;
  created_on: string | Date;
  role: any;
  profile_picture?: string | null;
}

export type MappedUser = {
  id: Id;
  email: string;
  passwordHash: PasswordHash | null;
  status: string;
  firstName: string;
  lastName: string;
  name: string;
  lastLogin: Moment | null;
  createdOn: Moment | null;
  roleIds?: number[];
  role: RoleName[];
  rolePermissions?: PermissionName[];
  userPermissions?: PermissionName[];
  profilePicture?: string | null;
};

export interface VerifyEmailDto {
  userId: Id;
  token: string;
  requestIp: string;
  requestUserAgent: string;
  createdBy: Id;
}

export type PasswordResetRow = {
  user_id: Id;
  token: string;
  created_on: string | Date | null;
  validity_seconds: number | string | null;
};

export type MappedPasswordResetToken = {
  userId: Id;
  token: string;
  createdOn: Moment | null;
  validitySeconds: number | null;
};

export type ResetPasswordDto = {
  id?: Id;
  email?: String;
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
  oldPassword?: string;
};

export type ChangePasswordDto = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UpdatePasswordDto = {
  id: Id;
  salt: string;
  newPassword: string;
  updatedBy: Id;
};

export type ValidatePasswordDto = {
  oldPassword?: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
};

export type LogPasswordResetDto = {
  userId: Id;
  actionedBy: Id;
  actionByType: keyof typeof ACTION_BY_TYPE;
  token: string;
  userAgent: string;
  ip: string;
  createdBy: Id;
};

export type UpdateProfileDto = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  dateOfBirth?: string | null;
  profilePicture?: string | null;
};

export interface USERPROFILE_DB {
  id: Id;
  email: string;
  status: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  profile_picture_path: string | null;
  email_verified_at: string | null;
  terms_accepted_at: string | null;
  privacy_policy_accepted_at: string | null;
  two_fa_method: string | null;
  method_status: string | null;
  last_login_at?: string | null;
  two_fa_method_id: string | null;
  two_fa_code: string | null;
  two_fa_sender_details: string | null;
}
export interface UserProfile {
  id: Id;
  email: string;
  status: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  profilePicturePath: string | null;
  consents?: {
    termsAcceptedAt: string | null;
    privacyPolicyAcceptedAt: string | null;
    emailVerifiedAt: string | null;
  };
  lastLoginAt: string | null;
  twoFa?: {
    id: Id;
    method: {
      id: Id;
      name: string | null;
      code: string | null;
    };
    status: string | null;
    senderDetails: string | null;
  };
}
