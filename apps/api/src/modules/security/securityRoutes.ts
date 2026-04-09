import { Container } from "typedi";
import { routes, featureLevel, publicPost } from "../../utils/index.ts";
import { securityService } from "./index.ts";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyTokenSchema,
} from "./schemas/index.ts";
import type { RequestMetadata, ResetPasswordDto } from "./models/types.ts";
import Role from "../../auth/role.ts";
import verifyEmailSchema from "./schemas/verifyEmailSchema.ts";

export default () => {
  publicPost(featureLevel.production, routes.security.SIGN_UP, async (req) => {
    const service = Container.get(securityService);
    const dto = await signupSchema.validateAsync(req.body);
    const { "user-agent": userAgent } = req.headers;
    const requestMetadata: RequestMetadata = {
      userAgent: userAgent ?? "",
      ip: req.ip ?? "",
    };
    return await service.signUp(requestMetadata, dto);
  });

  publicPost(featureLevel.production, routes.security.APP_SIGNUP, async (req) => {
    const service = Container.get(securityService);
    const dto = await signupSchema.validateAsync(req.body);
    const { "user-agent": userAgent } = req.headers;
    const requestMetadata: RequestMetadata = {
      userAgent: userAgent ?? "",
      ip: req.ip ?? "",
    };
    return await service.signUp(requestMetadata, dto, true);
  });

  publicPost(featureLevel.production, routes.security.LOGIN, async (req) => {
    const service = Container.get(securityService);
    const { email, password } = await loginSchema.validateAsync(req.body);
    const { "user-agent": userAgent } = req.headers;
    const requestMetadata: RequestMetadata = {
      userAgent: userAgent ?? "",
      ip: req.ip ?? "",
      allowedRoles: [Role.roleValues.OBIE_USER]
    };
    return await service.login(requestMetadata, email, password);
  });

  publicPost(featureLevel.production, routes.security.ADMIN_LOGIN, async (req) => {
    const service = Container.get(securityService);
    const { email, password } = await loginSchema.validateAsync(req.body);
    const { "user-agent": userAgent } = req.headers;
    const requestMetadata: RequestMetadata = {
      userAgent: userAgent ?? "",
      ip: req.ip ?? "",
      allowedRoles: [Role.roleValues.SUPER_ADMIN, Role.roleValues.CRON_EXECUTOR]
    };
    return await service.login(requestMetadata, email, password);
  });

  publicPost(featureLevel.production, routes.security.APP_LOGIN, async (req) => {
    const service = Container.get(securityService);
    const { email, password } = await loginSchema.validateAsync(req.body);
    const { "user-agent": userAgent } = req.headers;
    const requestMetadata: RequestMetadata = {
      userAgent: userAgent ?? "",
      ip: req.ip ?? "",
      allowedRoles: [Role.roleValues.OBIE_USER]
    };
    return await service.login(requestMetadata, email, password, true);
  });

  publicPost(featureLevel.production, routes.security.VERIFY_EMAIL, async (req) => {
    const service = Container.get(securityService);
    const { token } = await verifyEmailSchema.validateAsync(req.body);

    return await service.verifyEmailToken(token);
  });

  publicPost(
    featureLevel.production,
    routes.security.VERIFY_TOKEN,
    async (req) => {
      const service = Container.get(securityService);
      const dto = await verifyTokenSchema.validateAsync(req.body);
      const { "user-agent": userAgent } = req.headers;
      const requestMetadata: RequestMetadata = {
        userAgent: userAgent ?? "",
        ip: req.ip ?? "",
        allowedRoles: [Role.roleValues.OBIE_USER],
      };
      return await service.verifyTwoFaToken(requestMetadata, dto);
    }
  );

  publicPost(
    featureLevel.production,
    routes.security.APP_VERIFY_TOKEN,
    async (req) => {
      const service = Container.get(securityService);
      const dto = await verifyTokenSchema.validateAsync(req.body);
      const { "user-agent": userAgent } = req.headers;
      const requestMetadata: RequestMetadata = {
        userAgent: userAgent ?? "",
        ip: req.ip ?? "",
        allowedRoles: [Role.roleValues.OBIE_USER],
      };
      return await service.verifyTwoFaToken(requestMetadata, dto, true);
    }
  );

  publicPost(
    featureLevel.production,
    routes.security.FORGOT_PASSWORD,
    async (req) => {
      const service = Container.get(securityService);
      const { email }: { email: string } =
        await forgotPasswordSchema.validateAsync(req.body);
      const { "user-agent": userAgent } = req.headers;
      const requestMetadata = {
        userAgent: userAgent ?? "",
        ip: req.ip ?? "",
      };
      return await service.requestResetPassword(email, requestMetadata);
    }
  );

  publicPost(
    featureLevel.production,
    routes.security.RESET_PASSWORD,
    async (req) => {
      const service = Container.get(securityService);
      const data: ResetPasswordDto = await resetPasswordSchema.validateAsync(
        req.body
      );
      const { "user-agent": userAgent } = req.headers;
      const requestMetadata = {
        userAgent: userAgent ?? "",
        ip: req.ip ?? "",
      };
      return await service.resetPassword(data, requestMetadata);
    }
  );
};
