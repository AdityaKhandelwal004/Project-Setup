import type { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { Role } from "../../auth/index.ts";
import {
  HttpException,
  formatErrorResponse,
  routes,
} from "../../utils/index.ts";
import type { CurrentUser } from "../../models/genericTypes.ts";
import moment from "moment";

export const checkSubscriptionAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const currentUser = req.currentUser as CurrentUser;

    if (
      !currentUser ||
      !(currentUser.role as any).includes(Role.roleValues.OBIE_USER)
    ) {
      return next();
    }

    const excludedRoutes = [
      routes.profile.GET_PROFILE,
      routes.profile.UPDATE_PROFILE,
      routes.profile.CHANGE_PASSWORD,
      routes.profile.UPLOAD_PROFILE_PICTURE,
      routes.profile.DELETE_PROFILE_PICTURE,
      routes.profile.GET_USER_RIGHTS,
      routes.profile.SEND_EMAIL_VERIFICATION_LINK,

      routes.twoFa.GET_TWO_FA_METHODS,
      routes.twoFa.TWO_FA,
      routes.twoFa.MODIFY_TWO_FA,
      routes.twoFa.USER_TWO_FA_METHODS,
      routes.twoFa.VERIFY_TWO_FA,

      routes.subscription.PLANS,
      routes.subscription.PURCHASE,
      routes.subscription.CANCEL,
      routes.subscription.RENEW,
      routes.subscription.MANUAL_PAYMENT,
      routes.subscription.STORE_PAYMENT_METHOD,
      routes.subscription.GET_PAYMENT_METHOD,
      routes.subscription.SUBSCRIPTION_DETAILS,
      routes.subscription.CRON_PROCESS_EXPIRING,
      routes.subscription.CRON_PROCESS_ALERTS,
      routes.subscription.EXTEND_TRIAL_PERIOD,
      routes.subscription.EXTEND_SUBSCRIPTION_PERIOD,
      routes.subscription.UPDATE_CARD,

      routes.ping,
    ];

    const currentRoute = req.path;
    const isExcludedRoute = excludedRoutes.some((route) =>
      currentRoute.startsWith(route),
    );

    if (isExcludedRoute) {
      return next();
    }

    const hasValidAccess = await checkUserSubscriptionStatus(currentUser);

    if (!hasValidAccess) {
      throw new HttpException.Forbidden(
        formatErrorResponse(
          "subscription",
          "accessRestrictedDueToExpiredSubscription",
        ),
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

async function checkUserSubscriptionStatus(
  currentUser: CurrentUser,
): Promise<boolean> {
  try {

    return true;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return true;
  }
}
