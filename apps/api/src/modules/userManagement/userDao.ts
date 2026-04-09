import moment from "moment";
import {
  QueryBuilder,
  Mapper,
  Queries,
  parserId,
  parserInteger,
  parserDate,
} from "../../utils/daoHelper/index.ts";
import { RESULT, STATUS } from "../../utils/index.ts";
import { userUpdateMap, userDetailsUpdateMap } from "./updateMaps/index.ts";
import type { PoolClient } from "pg";
import PasswordHash from "../../models/passwordHash.ts";
import type {
  LogPasswordResetDto,
  MappedPasswordResetToken,
  MappedUser,
  UpdatePasswordDto,
  UpdateProfileDto,
  UserProfile,
  USERPROFILE_DB,
  VerifyEmailDto,
} from "./models/types.ts";
import type {
  RequestMetadata,
  signUpDto,
  UserDto,
} from "../security/models/types.ts";
import type { CurrentUser, Id } from "../../models/genericTypes.ts";
import type { RoleName } from "../../auth/role.ts";
import Role from "../../auth/role.ts";

class UserDao {
  userJoins = `LEFT JOIN user_roles ur ON ur.user_id = u.id
                LEFT JOIN roles r ON r.id = ur.role_id
                LEFT JOIN user_details ud ON ud.user_id = u.id
                LEFT JOIN users uld ON uld.id = u.id\n
                LEFT JOIN LATERAL (
                SELECT login_at
                FROM user_login_history ulh
                WHERE ulh.user_id = u.id
                ORDER BY login_at DESC
                LIMIT 1
              ) AS last_login ON true\n`;

  userQuery = `SELECT u.id,u.email,u.password,u.status,u.created_on, array_agg(DISTINCT r.type) AS role, array_agg(DISTINCT r.id) AS role_ids, ud.first_name,
                ud.last_name, ud.profile_picture_path,last_login.login_at AS last_login_at
                FROM users u \n${this.userJoins} `;

  groupByQuery = ` GROUP BY 
                    u.id, u.email, u.password, u.status, u.created_on,
                    ud.first_name, ud.last_name, ud.profile_picture_path,
                    last_login.login_at;`;

  static MAX_TOKEN_VALIDITY = 3600;

  static mapUserProfile(row: Record<string, any>): UserProfile {
    return {
      id: parserId(row.id),
      email: row.email,
      status: row.status,
      firstName: row.first_name,
      lastName: row.last_name,
      dateOfBirth: row.date_of_birth,
      profilePicturePath: row.profile_picture_path,
      lastLoginAt: row.last_login_at ? row.last_login_at : null,
      consents: {
        termsAcceptedAt: row.terms_accepted_at,
        privacyPolicyAcceptedAt: row.privacy_policy_accepted_at,
        emailVerifiedAt: row.email_verified_at,
      },
      twoFa: row.two_fa_id && {
        id: parserId(row.two_fa_id),
        method: {
          id: parserId(row.two_fa_method_id),
          name: row.two_fa_method,
          code: row.two_fa_code,
        },
        status: row.method_status,
        senderDetails: row.two_fa_sender_details,
      },
    };
  }

  async createUser(
    client: PoolClient,
    createUserDto: signUpDto,
    createdBy?: number | null | undefined
  ) {
    const res = await client.query(
      `INSERT INTO users 
      (email, password, salt, status, created_by, updated_by) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        createUserDto.email,
        createUserDto.password,
        createUserDto.salt,
        createUserDto.status,
        createdBy,
        createdBy,
      ]
    );

    const userId = Mapper.getId(res);

    const detailsCreatedBy = createdBy || userId;

    await client.query(
      `INSERT INTO user_details
      (user_id, first_name, last_name, date_of_birth, created_by, updated_by)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.dateOfBirth,
        detailsCreatedBy,
        detailsCreatedBy,
      ]
    );
    if (createdBy === 0) {
      const nowIso = moment().toISOString();
      await client.query(
        `INSERT INTO user_consents
      (user_id, terms_accepted_at, privacy_policy_accepted_at, created_by, updated_by)
      VALUES ($1, $2, $3, $4, $5)`,
        [userId, nowIso, nowIso, userId, userId]
      );
    }

    return userId;
  }

  async getAdminUser(client: PoolClient) {
    const query = `
    SELECT 
      u.id,
      u.email,
      r.type AS role
    FROM roles r
    LEFT JOIN user_roles ur ON ur.role_id = r.id
    LEFT JOIN users u ON u.id = ur.user_id
    WHERE r.type = $1
  `;

    const res = await client.query(query, [Role.roleValues.SUPER_ADMIN]);
    return UserDao.mapUserProfile(res.rows[0]);
  }

  async fetchUserProfile(client: PoolClient, userId: Id) {
    const query = `
      SELECT 
        u.id, 
        u.email, 
        u.status, 
        ud.first_name, 
        ud.last_name, 
        ud.date_of_birth, 
        ud.profile_picture_path, 
        uc.terms_accepted_at, 
        uc.privacy_policy_accepted_at, 
        uc.email_verified_at, 
        tfm.id AS two_fa_method_id,
        tfm.name AS two_fa_method, 
        tfm.code AS two_fa_code, 
        umfa.id AS two_fa_id,
        umfa.two_fa_sender_details,
        umfa.status AS method_status,
        ulh.login_at AS last_login_at
      FROM users u
      LEFT JOIN user_details ud ON ud.user_id = u.id
      LEFT JOIN user_consents uc ON uc.user_id = u.id
      LEFT JOIN user_two_fa_settings umfa ON umfa.user_id = u.id
      LEFT JOIN two_fa_methods tfm ON tfm.id = umfa.two_fa_method_id
      LEFT JOIN LATERAL (
        SELECT login_at
        FROM user_login_history ulh
        WHERE ulh.user_id = u.id
        ORDER BY login_at DESC
        LIMIT 1
      ) AS ulh ON true
      WHERE u.id = $1
      LIMIT 1;
    `;

    const res = await client.query(query, [userId]);

    if (res.rows.length === 0) return null;

    return UserDao.mapUserProfile(res.rows[0]);
  }

  async removeProfileImage(client: PoolClient, userId: Id) {
    const res = await client.query(
      `UPDATE user_details SET profile_picture_path = NULL WHERE user_id = $1`,
      [userId]
    );
    return res.rowCount === 1;
  }

  async updateRoleByUserId(
    client: PoolClient,
    roleNames: RoleName[],
    userId: number
  ): Promise<boolean> {
    const roleIdsRes = await client.query(
      `SELECT id FROM roles WHERE name = ANY($1)`,
      [roleNames]
    );
    const incomingRoleIds = roleIdsRes.rows.map((r) => r.id);

    const currentRolesRes = await client.query(
      `SELECT role_id FROM user_roles WHERE user_id = $1`,
      [userId]
    );
    const currentRoleIds = currentRolesRes.rows.map((r) => r.role_id);

    const incomingSet = new Set(incomingRoleIds);
    const currentSet = new Set(currentRoleIds);

    const rolesToDelete = currentRoleIds.filter((id) => !incomingSet.has(id));
    const rolesToInsert = incomingRoleIds.filter((id) => !currentSet.has(id));

    if (rolesToDelete.length > 0) {
      await client.query(
        `DELETE FROM user_roles WHERE user_id = $1 AND role_id = ANY($2)`,
        [userId, rolesToDelete]
      );
    }

    if (rolesToInsert.length > 0) {
      const insertValues = rolesToInsert
        .map((id) => `(${userId}, ${id})`)
        .join(",");
      await client.query(
        `INSERT INTO user_roles (user_id, role_id)
         VALUES ${insertValues}
         ON CONFLICT DO NOTHING`
      );
    }
    return true;
  }

  async updateUser(
    client: PoolClient,
    updateUserDto: UpdateProfileDto & { id: Id },
    isEmailUpdated?: boolean
  ) {
    const cleanedDto = {
      ...updateUserDto,
      email: updateUserDto.email ?? undefined,
      firstName: updateUserDto.firstName ?? undefined,
      lastName: updateUserDto.lastName ?? undefined,
      dateOfBirth: updateUserDto.dateOfBirth ?? undefined,
      profilePicture: updateUserDto.profilePicture ?? undefined,
      updatedBy: updateUserDto.id,
      user_id: updateUserDto.id,
    };
    const { sql: sql1, args: args1 } = Queries.updaterFor(
      "users",
      userUpdateMap,
      cleanedDto
    );
    const res1 = await client.query(sql1, args1);

    const { sql: sql2, args: args2 } = Queries.updaterFor(
      "user_details",
      userDetailsUpdateMap,
      cleanedDto,
      "user_id"
    );
    const res2 = await client.query(sql2, args2);
    if (updateUserDto.email && isEmailUpdated) {
      const consentQuery = `
        UPDATE user_consents 
        SET 
          email_verified_at = NULL,
          updated_on = CURRENT_TIMESTAMP,
          updated_by = $1
        WHERE user_id = $2
      `;
      await client.query(consentQuery, [updateUserDto.id, updateUserDto.id]);
    }

    return res1.rowCount === 1 && res2.rowCount === 1;
  }

  async updatePassword(client: PoolClient, dto: UpdatePasswordDto) {
    const qb = new QueryBuilder(
      `UPDATE users
       SET 
        password = ?,
        salt = ?,
        updated_by = ?
       WHERE id = ?;`,
      [dto.newPassword, dto.salt, dto.updatedBy, dto.id]
    );
    const { sql, args } = qb.build();
    const result = await client.query(sql, args);
    return result.rowCount === 1;
  }

  async findUserByEmail(
    client: PoolClient,
    email: string,
    onlyActive: boolean = false
  ) {
    const preArgs = [email];
    let query = `${this.userQuery} WHERE u.email = ?`;
    if (onlyActive) {
      query += " AND u.status = ?";
      preArgs.push(STATUS.ACTIVE);
    }
    query += ` ${this.groupByQuery}`;
    const qb = new QueryBuilder(query, preArgs);
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    if (!res.rows[0]) return null;

    const rolePermissions = await this.getModulesForUserOrRole(
      client,
      res.rows[0].role_ids,
      "role"
    );
    const userPermissions = await this.getModulesForUserOrRole(
      client,
      res.rows[0].id,
      "user"
    );
    const user = Mapper.getUnique(res, UserDao.mapUserWithRoles);
    return { rolePermissions, userPermissions, ...user } as MappedUser;
  }

  async findUserById(
    client: PoolClient,
    id: Id,
    onlyActive = false
  ): Promise<MappedUser | null> {
    const preArgs: any = [id];
    let query = `${this.userQuery} WHERE u.id = ?`;
    if (onlyActive) {
      query += " AND u.status = ?";
      preArgs.push(STATUS.ACTIVE);
    }
    query += ` ${this.groupByQuery}`;
    const qb = new QueryBuilder(query, preArgs);
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    if (!res.rows[0]) return null;

    const rolePermissions = await this.getModulesForUserOrRole(
      client,
      res.rows[0].role_ids,
      "role"
    );
    const userPermissions = await this.getModulesForUserOrRole(
      client,
      res.rows[0].id,
      "user"
    );
    const user = Mapper.getUnique(res, UserDao.mapUserWithRoles);
    return { rolePermissions, userPermissions, ...user } as MappedUser;
  }

  async getModulesForUserOrRole(
    client: PoolClient,
    ids: number[] | string[],
    type = "role"
  ) {
    const isArray = Array.isArray(ids);

    let getQuery = "";
    let args = [];

    if (type === "role") {
      getQuery = `
      SELECT DISTINCT p.name
      FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.id
      WHERE ${isArray ? "rp.role_id = ANY($1)" : "rp.role_id = $1"}
    `;
      args = [ids];
    } else {
      getQuery = `
      SELECT DISTINCT p.name
      FROM permissions p
      JOIN user_permissions up ON up.permission_id = p.id
      WHERE up.user_id = $1
    `;
      args = [ids];
    }
    const result = await client.query(getQuery, args);
    return result.rows.map((row) => row.name);
  }

  async markUserLogin(
    client: PoolClient,
    userId: any,
    requestDetails: RequestMetadata,
    token?: string
  ): Promise<boolean> {
    const { ip, userAgent } = requestDetails;
    const res = await client.query(
      `INSERT INTO user_login_history
      (user_id, login_at, login_ip, login_type, two_fa_token, user_agent,status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, moment(), ip, "NORMAL", token, userAgent, RESULT.SUCCESS]
    );
    return res.rowCount === 1;
  }

  async markWrongLoginAttempt(
    client: PoolClient,
    wrongLoginCount: number,
    userId: Id
  ): Promise<boolean> {
    const hasLoginDetails = await this.hasLoginDetails(client, userId);
    let res;
    const values = [wrongLoginCount, moment(), userId];
    if (hasLoginDetails) {
      res = await client.query(
        `UPDATE users  
        SET wrong_login_count = $1, last_wrong_login_attempt = $2 
        WHERE id = $3`,
        values
      );
    } else {
      res = await client.query(
        `INSERT INTO users  
        (wrong_login_count, last_wrong_login_attempt, id) 
        VALUES ($1, $2, $3)`,
        values
      );
    }
    return res.rowCount === 1;
  }

  async hasLoginDetails(client: PoolClient, userId: Id): Promise<boolean> {
    const res = await client.query(
      `SELECT id  FROM users  
      WHERE id = $1`,
      [userId]
    );
    return Mapper.getId(res) !== 0;
  }

  async deleteUserById(client: PoolClient, id: Id): Promise<boolean> {
    const res = await client.query("DELETE FROM users WHERE id = $1", [id]);
    return res.rowCount === 1;
  }

  async attachRole(
    client: PoolClient,
    userId: number,
    role: string | null | undefined
  ): Promise<boolean> {
    const res = await client.query(
      `INSERT INTO user_roles (user_id, role_id)
      VALUES ($1,(SELECT id FROM roles WHERE type = $2))`,
      [userId, role]
    );
    return res.rowCount === 1;
  }

  async findDuplicate(
    client: PoolClient,
    user: UserDto,
    ignoreId?: Id
  ): Promise<boolean> {
    const qb = new QueryBuilder(
      `SELECT id FROM users 
      WHERE email = ?\n`,
      [user.email]
    );

    if (ignoreId) {
      qb.append("AND id != ?", [ignoreId]);
    }

    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    return Mapper.getId(res) !== 0;
  }

  async saveToken(
    client: PoolClient,
    token: string,
    userId: Id,
    requestMetadata: RequestMetadata
  ): Promise<MappedPasswordResetToken | null> {
    await client.query(`DELETE FROM password_reset_tokens WHERE user_id = $1`, [
      userId,
    ]);

    const insertQuery = `
      INSERT INTO password_reset_tokens
        (user_id, token, validity_seconds, request_ip, request_user_agent)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const args = [
      userId,
      token,
      UserDao.MAX_TOKEN_VALIDITY,
      requestMetadata.ip,
      requestMetadata.userAgent,
    ];

    const res = await client.query(insertQuery, args);
    return Mapper.getUnique(res, UserDao.mapPasswordResetToken);
  }

  async generateEmailVerificationTokenForUser(
    client: PoolClient,
    dto: VerifyEmailDto
  ): Promise<boolean> {
    const upsertQuery = `
     WITH updated AS (
        UPDATE verify_email_tokens
        SET
          token = $2,
          validity_seconds = $3,
          request_ip = $4,
          request_user_agent = $5,
          created_on = NOW()
        WHERE user_id = $1
        RETURNING id
      ),
      inserted AS (
        INSERT INTO verify_email_tokens (
          user_id,
          token,
          validity_seconds,
          request_ip,
          request_user_agent,
          created_on
        )
        SELECT $1, $2, $3, $4, $5, NOW()
        WHERE NOT EXISTS (SELECT 1 FROM updated)
        RETURNING id
      )
      SELECT id FROM updated
      UNION ALL
      SELECT id FROM inserted;
    `;

    const args = [
      dto.userId,
      dto.token,
      UserDao.MAX_TOKEN_VALIDITY,
      dto.requestIp,
      dto.requestUserAgent,
    ];

    const res = await client.query(upsertQuery, args);
    return (res.rowCount ?? 0) > 0;
  }

  async fetchEmailVerificationTokenByToken(client: PoolClient, token: string) {
    const res = await client.query(
      "SELECT * FROM verify_email_tokens WHERE token = $1",
      [token]
    );
    return Mapper.getUnique(res, UserDao.mapPasswordResetToken);
  }

  async removeEmailVerificationTokenByUserId(client: PoolClient, userId: Id) {
    const res = await client.query(
      "DELETE FROM verify_email_tokens WHERE user_id = $1",
      [userId]
    );
    return res.rowCount === 1;
  }

  async findUserDetailsByToken(client: PoolClient, token: string) {
    const res = await client.query(
      `SELECT u.email,prt.user_id,prt.created_on,prt.validity_seconds, ud.first_name, ud.last_name 
        FROM password_reset_tokens prt
        LEFT JOIN user_details ud on ud.user_id = prt.user_id 
        LEFT JOIN users u on u.id = ud.user_id
        WHERE prt.token = $1`,
      [token]
    );
    return UserDao.mapUserDetailsByToken(res.rows);
  }

  async deleteToken(client: PoolClient, token: string) {
    const res = await client.query(
      "DELETE FROM password_reset_tokens WHERE token = $1",
      [token]
    );
    return res.rowCount === 1;
  }

  async logPasswordReset(
    client: PoolClient,
    data: LogPasswordResetDto
  ): Promise<boolean> {
    const {
      userId,
      token,
      userAgent,
      ip,
      createdBy,
      actionedBy,
      actionByType,
    } = data;

    await client.query(
      `DELETE FROM password_reset_history WHERE user_id = $1`,
      [userId]
    );

    const insertQuery = `
      INSERT INTO password_reset_history (
        user_id,
        token,
        actioned_by_id,
        action_by_type,
        action_user_user_agent,
        action_user_ip,
        created_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
      RETURNING *;
    `;

    const args = [
      userId,
      token,
      actionedBy,
      actionByType,
      userAgent,
      ip,
      createdBy,
    ];

    const res = await client.query(insertQuery, args);
    return res.rowCount === 1;
  }

  async uploadProfilePicture(
    client: PoolClient,
    key: string,
    actionUser: CurrentUser
  ) {
    const res = await client.query(
      "UPDATE user_details set profile_picture_path = $1 WHERE user_id = $2",
      [key, actionUser.id]
    );
    return res.rowCount === 1;
  }

  async deleteProfilePicture(
    client: PoolClient,
    actionUser: CurrentUser,
    userId: Id
  ) {
    const strQuery =
      "UPDATE user_details SET profile_picture_path  = $1, updated_by = $2 WHERE user_id = $3";
    const args = [null, actionUser.id, userId];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async updateUserConsent(
    client: PoolClient,
    userId: Id,
    dto: signUpDto
  ): Promise<boolean> {
    const query = `
      UPDATE user_consents
      SET
        terms_accepted_at = COALESCE($1, terms_accepted_at),
        privacy_policy_accepted_at = COALESCE($2, privacy_policy_accepted_at),
        email_verified_at = COALESCE($3, email_verified_at),
        updated_by = $4
      WHERE user_id = $5
    `;

    const values = [
      dto.termAccepted ? moment().toISOString() : null,
      dto.privacyPolicyAccepted ? moment().toISOString() : null,
      dto.emailVerified ? moment().toISOString() : null,
      userId,
      userId,
    ];
    const res = await client.query(query, values);

    return (res.rowCount ?? 0) > 0;
  }

  static mapUserWithRoles = (row: Record<string, any>): MappedUser => {
    return {
      id: parserId(row.id),
      email: row.email,
      passwordHash: row.password ? new PasswordHash(row.password) : null,
      status: row.status,
      firstName: row.first_name,
      lastName: row.last_name,
      name: `${row.first_name} ${row.last_name}`,
      lastLogin: parserDate(row?.last_login_at),
      createdOn: parserDate(row.created_on),
      roleIds: row.role_ids,
      role: row.role,
      profilePicture: row.profile_picture || null,
    };
  };

  static mapPasswordResetToken = (
    row: Record<string, any>
  ): MappedPasswordResetToken => {
    return {
      userId: parserId(row.user_id),
      token: row.token,
      createdOn: parserDate(row.created_on),
      validitySeconds: parserInteger(row.validity_seconds),
    };
  };

  static mapUserDetailsByToken(rows: Record<string, any>) {
    const firstRow = rows[0];
    if (!firstRow) return null;
    return {
      email: firstRow.email,
      userId: parserId(firstRow.user_id),
      firstName: firstRow.first_name,
      lastName: firstRow.last_name,
      createdOn: parserDate(firstRow.created_on),
      validitySecs: parserInteger(firstRow.validity_seconds),
    };
  }
  static mapWithUserProfile(rows: USERPROFILE_DB[]): UserProfile | null {
    if (!rows || rows.length === 0) return null;

    const row = rows[0];

    let twoFa = {
      id: parserId(row.id),
      method: {
        id: parserId(row.two_fa_method_id),
        name: row.two_fa_method || null,
        code: row.two_fa_code || null,
      },
      status: row.method_status || null,
      senderDetails: row.two_fa_sender_details || null,
    };
    if (!row.two_fa_method || !row.two_fa_method_id) {
      twoFa = {
        id: parserId(row.id),
        method: {
          id: parserId("0"),
          name: null,
          code: null,
        },
        status: null,
        senderDetails: null,
      };
    }

    return {
      id: parserId(row.id),
      email: row.email,
      status: row.status,
      firstName: row.first_name || "",
      lastName: row.last_name || "",
      dateOfBirth: row.date_of_birth
        ? moment(row.date_of_birth).format("YYYY-MM-DD")
        : "",
      profilePicturePath: row.profile_picture_path || "",
      consents: {
        termsAcceptedAt: row.terms_accepted_at || null,
        privacyPolicyAcceptedAt: row.privacy_policy_accepted_at || null,
        emailVerifiedAt: row.email_verified_at || null,
      },
      lastLoginAt: row.last_login_at ? row.last_login_at : null,
      twoFa: twoFa,
    };
  }
}

export default UserDao;

/**
 * @typedef {Object} UserFromDb
 * @property {Date} created_on
 * @property {string} email
 * @property {string} first_name
 * @property {string} id
 * @property {Date} last_login
 * @property {string} last_name
 * @property {Date} last_wrong_login_attempt
 * @property {string} password
 * @property {string} role
 * @property {string} status
 * @property {number} wrong_login_count
 */

/**
 * @typedef {Object} PasswordRestToken
 * @property {number} userId
 * @property {string} token
 * @property {moment.Moment} createdOn
 * @property {number} validitySeconds
 */

/**
 * This is the user that is fetched from the database
 * {@link UserFromDb} and mapped with the {@link Role}
 * This contains information that is parsed (type casting done)
 * This is used for internal purposes only.
 * @typedef {Object} RoleMappedUser
 * @property {number} id
 * @property {string} email
 * @property {number} passwordHash
 * @property {string} status
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} name
 * @property {number} wrongLoginCount
 * @property {moment.Moment} lastWrongLoginAttempt
 * @property {moment.Moment} lastLogin
 * @property {moment.Moment} createdOn
 * @property {Role} role
 * @property {string} profilePicture
 */

/**
 * Action user is being used for all protected routes
 * It contains all the user information that are required
 * to know about the current user
 * @typedef {Object} ActionUser
 * @property {moment.Moment} createdOn
 * @property {string} email
 * @property {string} firstName
 * @property {number} id
 * @property {string} ip
 * @property {moment.Moment} lastLogin
 * @property {string} lastName
 * @property {moment.Moment} lastWrongLoginAttempt
 * @property {string} name
 * @property {string[]} rights
 * @property {Role} role
 * @property {string} status
 * @property {string} tokenAud
 * @property {string} userAgent
 * @property {number} wrongLoginCount
 */
