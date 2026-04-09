import bcrypt from 'bcrypt';
import { HttpException, formatErrorResponse } from '../utils/index.ts';

class Password {
  private password: string;
  private hashingRounds: number;

  constructor(password: string) {
    this.password = password;
    this.hashingRounds = 11;
  }

  async generateSalt() {
    try {
      const salt = await bcrypt.genSalt(this.hashingRounds);
      return salt;
    } catch (error) {
      console.log(error);
      throw new HttpException.BadRequest(
        formatErrorResponse('password', 'unableToGenerateSalt')
      );
    }
  }

  async hashPassword() {
    try {
      const salt = await this.generateSalt();
      const hash = await bcrypt.hash(this.password, salt);
      return { hash, salt };
    } catch (e) {
      console.log(e);
      throw new HttpException.BadRequest(
        formatErrorResponse('password', 'unableToHash')
      );
    }
  }
}

export default Password;
