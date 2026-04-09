import type {
  CurrentUser,
  Id,
  RequestMetadata,
} from '../../../models/genericTypes.ts';
import type { ACTION_TYPE, STATUS, TOKEN_TYPE } from '../../../utils/constants.ts';

export type TwoFaDto = {
  methodId: Id;
  actionType: keyof typeof ACTION_TYPE;
  senderDetail: string;
};

export type VerifyTwoFaDto = {
  methodId: Id;
  actionType: keyof typeof ACTION_TYPE;
  senderDetail: string;
  verificationToken: string | null | undefined;
  newMethodVerificationToken?: string | null | undefined;
};

export type TwoFaActionDto = {
  userId: Id;
  ip: string;
  userAgent: string;
  methodId: number;
  senderDetail: string;
  isUnitTest?: boolean;
  status?: keyof typeof STATUS;
};

export type SetTwoFaActionDto = TwoFaActionDto & {
  tokenType: string;
};

export type VerifyTwoFaActionDto = TwoFaActionDto & {
  token: string | null | undefined;
  tokenType?: string;
  actionType: (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];
  currentMethodId?: string | null | undefined;
  newMethodVerificationToken?: string | null | undefined;
};

export type ModifyTwoFaActionDto = TwoFaActionDto & {
  actionType: (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];
};

export type UserTwoFaActionDto = {
  userId?: Id;
  ip?: string;
  userAgent?: string;
  methodId?: Id;
  senderDetail?: string;
  isUnitTest?: boolean;
  status?: keyof typeof STATUS;
  tokenType?: string;
  token?: string | null | undefined;
  actionType?: (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];
  currentMethodId?: string | null | undefined;
  newMethodVerificationToken?: string | null | undefined;
  isUpdate?: boolean;
};

export type TokenDetails = {
  token: string | number;
  validitySecs: number;
};

export type SendCode = {
  code: string;
  senderDetail: string;
  token: string | number;
  firstName: string;
  isEnabling: boolean;
};

export type ActionUser = CurrentUser & RequestMetadata;
