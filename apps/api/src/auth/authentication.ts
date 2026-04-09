import type { MappedUser } from "../modules/userManagement/models/types.ts";
import { isValidString } from "../utils/commonFunctions.ts";
import Right from "./right.ts";
import type { RoleName } from "./role.ts";
import Role from "./role.ts";

class Authentication {
  /**
   * Checks if the user has the right
   * @param {import("../modules/userManagement/userDao").ActionUser} user
   * @param {string} right
   * @returns {boolean}
   */
  static hasRight(user: MappedUser | null, right: string) {
    if (!user || !(user.role instanceof Role)) return false;
    return user?.role?.hasRight(right);
  }

  /**
   * Get the effective rights of the user
   * @param {import("../modules/userManagement/userDao").ActionUser} user
   * @returns {string[]}
   */
  static userEffectiveRights(user: MappedUser) {
    const { rolePermissions = [], userPermissions = [] } = user;
    const roleRights = Right.getRights(rolePermissions);
    const userRights = Right.getRights(userPermissions);
    return Array.from(new Set([...roleRights, ...userRights]));
  }

  static hasPermission(rights: string[], right: string) {
    const filteredRights = rights.filter((r) => isValidString(r));
    if (filteredRights.length === 0 && rights.length === 0) {
      return false;
    }

    if (filteredRights.length === 0 && rights.length > 0) {
      console.warn(
        "[WARN] filtered rights but rights are not empty.",
        "filtered rights: = ",
        filteredRights,
        "rights: = ",
        rights
      );
      return false;
    }
    return rights.indexOf(right) !== -1;
  }

  static hasAllowedRole(user: MappedUser, allowedRoles: RoleName[]) {
    if (!allowedRoles || allowedRoles.length === 0) {
      return false;
    }

    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    return userRoles.some((role) => allowedRoles.includes(role));
  }
}

export default Authentication;
