export const TokenStatus = {
  VALID: 'VALID',
  EXPIRED: 'EXPIRED',
  INVALID_USER: 'INVALID_USER',
  INACTIVE_USER: 'INACTIVE_USER',
  OLD_VERSION: 'OLD_VERSION',
  INVALID_TOKEN: 'INVALID_TOKEN'
} as const;

export type TokenStatusType = (typeof TokenStatus)[keyof typeof TokenStatus];
