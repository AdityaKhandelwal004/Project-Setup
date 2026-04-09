import bcrypt from "bcrypt";
import { HttpException } from "../utils/index.ts";

class PasswordHash {
  private passwordHash: string;

  constructor(passwordHash: string) {
    PasswordHash.assertValidHash(passwordHash);
    this.passwordHash = passwordHash;
  }

  parameter(): string {
    return this.passwordHash;
  }

  async check(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.passwordHash);
    return match;
  }

  static assertValidHash(passwordHash: string) {
    if (!passwordHash?.startsWith("$2b$")) {
      throw new HttpException.BadRequest(
        "Invalid hash given, not a valid BCrypt hash"
      );
    }
  }
}

export default PasswordHash;
