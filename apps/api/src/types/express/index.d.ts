import type { CurrentUser } from '../../models/genericTypes.ts';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

export {};
