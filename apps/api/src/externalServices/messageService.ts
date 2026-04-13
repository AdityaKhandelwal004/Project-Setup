import MessageSendingService from "./messageSendingService.ts";
import { EmailMessage } from "../models/index.ts";
import config from "../config/index.ts";
import { sanitizeUrl, MESSAGE_TYPES } from "../utils/index.ts";
import type { TokenDetails } from "../modules/twoFa/models/type.ts";
import type { MappedUser } from "../modules/userManagement/models/types.ts";
import moment from "moment";

export type User = {
  firstName?: string | null;
  email: string;
  actualPassword?: string;
};

interface TokenDTO {
  token: string;
  validitySeconds: number | null;
}

interface PaymentSuccessDetails {
  amount: number;
  currency: string;
  transactionId: string | number;
}

interface PaymentFailureDetails {
  amount: number;
  currency: string;
  reason: string;
}

interface SubscriptionSuccessDetails {
  planName: string;
  amount: number;
  currency: string;
  transactionId: string | number;
  validityEndDate: Date;
}

interface SubscriptionCancellationDetails {
  planName: string;
  accessUntil: Date;
  reason: string;
}

interface SubscriptionRenewalDetails {
  planName: string;
  amount: number;
  currency: string;
  transactionId: string | number;
  nextBillingDate: Date;
}

interface SubscriptionExpiryDetails {
  planName: string;
  expiredDate: Date;
}

interface GracePeriodWarningDetails {
  planName: string;
  expiryDate: Date;
  daysRemaining: number;
}

interface PaymentAttemptExhaustedDetails {
  planName: string;
  amount: number;
  currency: string;
  attemptsCount: number;
}

interface AccountExpiryDetails {
  planName: string;
  expiryDate: Date;
}

class MessageService {
  static TWO_FA_CONFIRAMTION_EMAIL_DISABLE =
    "/templates/email/2FA-disabled.hbs";
  static TWO_FA_CONFIRAMTION_EMAIL_ENABLE = "/templates/email/2FA-enabled.hbs";
  static ACCOUNT_EXPIRE = "/templates/email/account-expire.hbs";
  static SUBSCRIPTION_RENEWAL_ALERT =
    "/templates/email/subscription-renewal-alert.hbs";
  static EMAIL_VERIFICATION_EMAIL = "/templates/email/email-verification.hbs";
  static INVOICE = "/templates/email/invoice.hbs";
  static PASSWORD_RESET_EMAIL = "/templates/email/password-reset.hbs";
  static PASSWORD_UPDATE_EMAIL = "/templates/email/password-update.hbs";
  static PAY_ATTEMPT_EXHAUSTED = "/templates/email/pay-attempt-exhaust.hbs";
  static PAY_FAILED = "/templates/email/pay-failed.hbs";
  static PAY_SUCCESS = "/templates/email/pay-success.hbs";
  // signup
  static SUBSCRIPTION_SUCCESS = "/templates/email/subscription-success.hbs";
  static SUBSCRIPTION_EXPIRE = "/templates/email/subscription-expire.hbs";
  static SUBSCRIPTION_RENEWAL = "/templates/email/subscription-renew.hbs";
  static SUCCESSFUL_RESET_PASSWORD =
    "/templates/email/successfull-reset-password.hbs";
  static TWO_FA_CONFIRMATION_EMAIL = "/templates/email/two-fa-confirmation.hbs";
  static INVITE_USER_EMAIL = "/templates/email/invite-user.hbs";
  static CANCEL_SUBSCRIPTION_EMAIL = "/templates/email/cancel-subscription.hbs";
  static ACCOUNT_DELETION_REQUEST_EMAIL =
    "/templates/email/account-deletion-request.hbs";
  static SIGNUP = "/templates/email/signup.hbs";
  static MAX_TOKEN_VALIDITY = 3600;

  static async sendPasswordReset(
    user: MappedUser,
    tokenDto: TokenDTO,
  ): Promise<boolean> {
    const subject = "Template: Reset Password";
    const path = "/reset-password";
    const data = {
      firstName: user?.firstName,
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}${path}/${tokenDto.token}`,
      validity:
        (tokenDto?.validitySeconds || MessageService.MAX_TOKEN_VALIDITY) / 60,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.PASSWORD_RESET_EMAIL,
      data,
    );
    const res = await MessageService.sendEmail(message, user?.email);
    return res;
  }

  static async sendTwoFaConfirmationCodeToUpdateStatus(dto: {
    firstName: string;
    email: string;
    token: string | number;
    validitySecs: number;
    isEnabling: boolean;
  }) {
    const subject = "Template: Your Two-Factor Authentication Code";
    const data = {
      firstName: dto.firstName,
      code: dto.token,
      validity: dto.validitySecs / 60,
      year: new Date().getFullYear(),
      isEnabling: dto.isEnabling,
    };

    const message = new EmailMessage(
      subject,
      MessageService[
        data?.isEnabling
          ? "TWO_FA_CONFIRAMTION_EMAIL_ENABLE"
          : "TWO_FA_CONFIRAMTION_EMAIL_DISABLE"
      ],
      data,
    );
    return await MessageService.sendEmail(message, dto.email);
  }

  static async sendTwoFaConfirmationCode(user: User, tokenDto: TokenDetails) {
    const subject = "Template: 2FA Confirmation";
    const data = {
      firstName: user.firstName,
      code: tokenDto.token,
      validity: MessageService.MAX_TOKEN_VALIDITY / 60,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.TWO_FA_CONFIRMATION_EMAIL,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async sendSignupMail(user: User) {
    const subject = "Welcome to Template!";
    const data = {
      firstName: user.firstName,
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(subject, MessageService.SIGNUP, data);
    return await MessageService.sendEmail(message, user.email);
  }

  static async paymentSuccess(
    user: User,
    dto: PaymentSuccessDetails,
    attachment?: any[],
  ) {
    const subject = "Template: Payment Successful";
    const data = {
      firstName: user.firstName,
      amount: (dto.amount / 100).toFixed(2),
      currency: dto.currency,
      transactionId: dto.transactionId,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(subject, MessageService.PAY_SUCCESS, data);

    return await MessageService.sendEmail(message, user.email, attachment);
  }

  static async paymentFailure(user: User, dto: PaymentFailureDetails) {
    const subject = "Template: Payment Failed";
    const data = {
      firstName: user.firstName,
      amount: (dto.amount / 100).toFixed(2),
      currency: dto.currency,
      reason: dto.reason,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(subject, MessageService.PAY_FAILED, data);
    return await MessageService.sendEmail(message, user.email);
  }

  static async subscriptionSuccess(
    user: User,
    dto: SubscriptionSuccessDetails,
    attachment?: any[],
  ) {
    const subject = "Template: Subscription Successful";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      amount: (dto.amount / 100).toFixed(2),
      currency: dto.currency,
      transactionId: dto.transactionId,
      validityEndDate: dto.validityEndDate.toLocaleDateString(),
      year: new Date().getFullYear(),
    };

    const message = new EmailMessage(
      subject,
      MessageService.SUBSCRIPTION_SUCCESS,
      data,
    );

    return await MessageService.sendEmail(message, user.email, attachment);
  }

  static async subscriptionCancellation(
    user: User,
    dto: SubscriptionCancellationDetails,
  ) {
    const subject = "Template: Subscription Cancelled";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      accessUntil: dto.accessUntil.toLocaleDateString(),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      reason: dto.reason,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.CANCEL_SUBSCRIPTION_EMAIL,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async subscriptionRenewal(
    user: User,
    dto: SubscriptionRenewalDetails,
  ) {
    const subject = "Template: Subscription Renewed";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      amount: (dto.amount / 100).toFixed(2),
      currency: dto.currency,
      transactionId: dto.transactionId,
      nextBillingDate: dto.nextBillingDate.toLocaleDateString(),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.SUBSCRIPTION_RENEWAL,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async subscriptionExpiry(user: User, dto: SubscriptionExpiryDetails) {
    const subject = "Template: Subscription Expired";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      expiredDate: dto.expiredDate.toLocaleDateString(),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.SUBSCRIPTION_EXPIRE,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async gracePeriodWarning(user: User, dto: GracePeriodWarningDetails) {
    const subject = "Template: Subscription Expiring Soon";

    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      expiryDate: dto.expiryDate.toLocaleDateString(),
      year: new Date().getFullYear(),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      daysRemaining: dto.daysRemaining,
    };

    const message = new EmailMessage(
      subject,
      MessageService.SUBSCRIPTION_EXPIRE,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async paymentAttemptExhausted(
    user: User,
    dto: PaymentAttemptExhaustedDetails,
  ) {
    const subject = "Template: Payment Attempts Exhausted";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      amount: (dto.amount / 100).toFixed(2),
      currency: dto.currency,
      attemptsCount: dto.attemptsCount,
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.PAY_ATTEMPT_EXHAUSTED,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async accountExpiry(user: User, dto: AccountExpiryDetails) {
    const subject = "Template: Account Access Expired";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      expiryDate: dto.expiryDate.toLocaleDateString(),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.ACCOUNT_EXPIRE,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async subscriptionRenewalAlert(user: User, dto: AccountExpiryDetails) {
    const subject = "Template: Subscription Renewal Alert";
    const data = {
      firstName: user.firstName,
      planName: dto.planName,
      expiryDate: dto.expiryDate.toLocaleDateString(),
      remainingDays: Math.ceil(
        (dto.expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
      ),
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/profile`,
      year: new Date().getFullYear(),
    };
    const message = new EmailMessage(
      subject,
      MessageService.SUBSCRIPTION_RENEWAL_ALERT,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async sendEmailVerification(
    name: string,
    email: string,
    token: string,
  ) {
    const subject = "Template: Verify your email";
    const data = {
      name,
      email,
      validity: MessageService.MAX_TOKEN_VALIDITY / 60,
      url: `https://${config.url.appBaseUrl}/verify-email/${token}`,
      year: new Date().getFullYear(),
    };

    const message = new EmailMessage(
      subject,
      MessageService.EMAIL_VERIFICATION_EMAIL,
      data,
    );

    return await MessageService.sendEmail(message, email);
  }

  static async sendPasswordResetConfirmation(user: MappedUser) {
    try {
      const subject = "Template: Your password has been reset";
      const data = {
        firstName: user.firstName,
        loginUrl: `${sanitizeUrl(config.url.appBaseUrl)}/login`,
        url: `https://${sanitizeUrl(config.url.appBaseUrl)}/login`,
        year: new Date().getFullYear(),
      };
      const message = new EmailMessage(
        subject,
        MessageService.SUCCESSFUL_RESET_PASSWORD,
        data,
      );
      return await MessageService.sendEmail(message, user.email);
    } catch (err) {
      console.log(err);
    }
  }

  static async sendPasswordChangeEmail(user: User) {
    const subject = "Password update";
    const data = {
      firstName: user.firstName,
      url: `https://${sanitizeUrl(config.url.appBaseUrl)}/login`,
    };
    const message = new EmailMessage(
      subject,
      MessageService.PASSWORD_UPDATE_EMAIL,
      data,
    );
    return await MessageService.sendEmail(message, user.email);
  }

  static async sendEmail(
    message: EmailMessage,
    email: string,
    attachments?: any[],
  ): Promise<boolean> {
    try {
      const response = await MessageSendingService.sendMessage(
        message,
        email,
        MESSAGE_TYPES.EMAIL,
        attachments,
      );
      if (response[0]?.statusCode >= 200 && response[0]?.statusCode < 400) {
        return true;
      }

      return false;
    } catch (err: any) {
      console.log(`Error sending message for ${email}: ${err.message}`);
    }
    return false;
  }

  static async sendAddUserConfirmationEmail(user: User) {
    try {
      const subject = "Template: You're invited to join Template";
      const path = "/login";
      const data = {
        name: user.firstName,
        password: user.actualPassword,
        email: user.email,
        url: `${sanitizeUrl(config.url.appBaseUrl)}${path}`,
        year: new Date().getFullYear(),
      };
      const message = new EmailMessage(
        subject,
        MessageService.INVITE_USER_EMAIL,
        data,
      );
      await MessageService.sendEmail(message, user.email);
      return true;
    } catch (error: any) {
      console.log(`Error sending message for ${user.email}: ${error.message}`);
    }
    return false;
  }

  static async sendAccountDeletionRequest(
    user: MappedUser & { adminEmail: string },
  ) {
    try {
      const subject = "Delete Account Request";
      const data = {
        name: user.firstName,
        email: user.email,
        id: user.id,
        requestDate: moment().format("MMMM Do YYYY"),
        year: new Date().getFullYear(),
      };

      const message = new EmailMessage(
        subject,
        MessageService.ACCOUNT_DELETION_REQUEST_EMAIL,
        data,
      );
      await MessageService.sendEmail(message, user.adminEmail);
      return true;
    } catch (error: any) {
      console.log(
        `Error sending message for ${user.adminEmail}: ${error.message}`,
      );
    }
    return false;
  }
}

export default MessageService;
