import type { Router as ExpressRouter } from "express";
import { route } from "../utils/index.ts";
import pingRoutes from "./pingRoutes.ts";
import testApiRoutes from "./testRoutes.ts";
import { securityRoutes } from "../modules/security/index.ts";
import { userRoutes } from "../modules/userManagement/index.ts";

/**
 * Simplified API routes - only security and user management modules
 * Removed: 2FA, forms, partners, learn resources, budget, income, savings, etc.
 */
export default (): ExpressRouter => {
  testApiRoutes();
  pingRoutes();
  securityRoutes();
  userRoutes();
  return route;
};
