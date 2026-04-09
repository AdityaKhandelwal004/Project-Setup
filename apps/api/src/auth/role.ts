import Right from "./right.ts";
import { HttpException } from "../utils/index.ts";
import { formatErrorResponse } from "../utils/apiResponses.ts";

/**
 * Roles of the authorization system.
 * Each user will have one or more {@link Role}s linked to them either directly
 * or via their usergroups. Each {@link Role} contain one
 * or more {@link Right}s which are ultimately determine
 * if user has access to certain features etc.
 *
 */

export type RoleName =
  | "SUPER_ADMIN"
  | "OBIE_USER"
  | "NO_RIGHTS"
  | "CRON_EXECUTOR";

class Role {
  private static readonly roles = Object.freeze<RoleName[]>([
    "SUPER_ADMIN",
    "OBIE_USER",
    "NO_RIGHTS",
    "CRON_EXECUTOR",
  ]);

  static readonly roleValues = Object.freeze({
    SUPER_ADMIN: "SUPER_ADMIN" as RoleName,
    OBIE_USER: "OBIE_USER" as RoleName,
    CRON_EXECUTOR: "CRON_EXECUTOR" as RoleName,
  });

  private readonly roleIds = Object.freeze<Record<RoleName, number>>({
    NO_RIGHTS: 0,
    SUPER_ADMIN: 1,
    OBIE_USER: 2,
    CRON_EXECUTOR: 3,
  });

  private readonly USER: string[] = Right.userRights();

  private readonly NO_RIGHTS: string[] = [];

  private static readonly roleRightsMap: Record<RoleName, string[]> = {
    OBIE_USER: Right.userRights(),
    SUPER_ADMIN: Right.userRights(),
    CRON_EXECUTOR: Right.userRights(),
    NO_RIGHTS: [],
  };

  private readonly rights: string[];
  private readonly role: RoleName;

  constructor(role: string) {
    if (!Role.roles.includes(role as RoleName)) {
      throw new HttpException.BadRequest(
        formatErrorResponse("role", "notFound"),
      );
    }

    this.role = role as RoleName;
    this.rights = Role.roleRightsMap[this.role];
  }

  /**
   * Checks if the user has the right
   * @param right
   * @returns boolean
   */
  hasRight(right: string): boolean {
    return this.rights?.includes(right) ?? false;
  }

  /**
   * Gets the rights available for this role
   * @returns string[]
   */
  getRights(): string[] {
    return this.rights;
  }

  /**
   * Gets the role id based on the role
   * @returns number
   */
  getId(): number {
    return this.roleIds[this.role] || 0;
  }

  /**
   * Gets the name of the role
   * @returns string
   */
  getRoleName(): RoleName {
    return this.role;
  }
}

export default Role;
