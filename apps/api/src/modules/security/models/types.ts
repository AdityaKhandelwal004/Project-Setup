import type { Id } from "../../../models/genericTypes.ts";
import type { LOGIN_TOKEN_TYPE } from "../../../utils/constants.ts";
import type { RoleName } from "../../../auth/role.ts";

export interface RequestMetadata {
  ip: string;
  userAgent: string;
  allowedRoles?: RoleName[];
}

export type UserDto = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  dateOfBirth?: Date | null;
  password?: string;
  salt?: string;
  role?: RoleName[];
  status?: string;
  id?: Id;
  notifyUser?: boolean;
};

export interface signUpDto extends UserDto {
  dateOfBirth?: Date;
  termAccepted?: boolean;
  privacyPolicyAccepted?: boolean;
  emailVerified?: boolean;
}

export interface VerifyTokenDto {
  email: string;
  password: string;
  tokenType: keyof typeof LOGIN_TOKEN_TYPE;
  token: string;
}

export type ResetPasswordDto = {
  token: string;
  password: string;
  confirmPassword: string;
};
