import { TokenStatus } from "./authEntities.ts";
import type { TokenStatusType } from "./authEntities.ts";

class TokenValidationResult {
  public status: TokenStatusType;
  public user: any;
  
  constructor(status : TokenStatusType, user ?: any) {
    this.status = status;
    this.user = user;
  }

  isValid() : Boolean {
    return this.status === TokenStatus.VALID;
  }
}

export default TokenValidationResult;
