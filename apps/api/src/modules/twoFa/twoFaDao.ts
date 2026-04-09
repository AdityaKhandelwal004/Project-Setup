import type { Id } from "../../models/genericTypes.ts";
import { QueryBuilder } from "../../utils/daoHelper/index.ts";
import type { PoolClient } from "pg";
import type { UserTwoFaActionDto, TokenDetails } from "./models/type.ts";

export default class TwoFaDao {
  async getUserTwoFaMethods(client: PoolClient, actionDto: { userId: Id }) {
    const strQuery = `SELECT tfm.name, tfm.code, utfs.two_fa_method_id, utfs.two_fa_sender_details, utfs.status FROM user_two_fa_settings utfs 
      LEFT JOIN two_fa_methods tfm ON tfm.id = utfs.two_fa_method_id WHERE utfs.user_id = $1`;
    const result = await client.query(strQuery, [actionDto.userId]);
    return TwoFaDao.getUser2fAMethods(result.rows, actionDto);
  }

  async getTwoFaMethods(client: PoolClient) {
    const query = "SELECT id, name, code FROM two_fa_methods;";
    const res = await client.query(query);
    return TwoFaDao.getRows(res.rows);
  }

  async getTwoFaMethodById(client: PoolClient, methodId: Id) {
    const qb = new QueryBuilder("SELECT id, name, code FROM two_fa_methods \n");
    if (methodId) {
      qb.append(" WHERE id = $1", [methodId]);
    }
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    return methodId ? TwoFaDao.getResult(res.rows) : TwoFaDao.getRows(res.rows);
  }

  async setUpUserTwoFa(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const strQuery = ` INSERT INTO user_two_fa_settings(user_id, 
      two_fa_method_id, two_fa_sender_details, created_by, updated_by) 
      VALUES($1,$2,$3,$4,$5) RETURNING ID`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      actionDto.senderDetail,
      actionDto.userId,
      actionDto.userId,
    ];
    const res = await client.query(strQuery, args);
    return TwoFaDao.getResult(res.rows);
  }

  // async markRecoveryCodeConsumed(client: PoolClient, actionDto: UserTwoFaActionDto) {
  //   const strQuery = `UPDATE user_two_fa_recovery_codes set STATUS = $1 WHERE
  //   user_id = $2 AND recovery_code = $3`;
  //   const args = [
  //     RECOVERY_CODE_STATUS.CONSUMED,
  //     actionDto.userId,
  //     actionDto.token,
  //   ];
  //   const res = await client.query(strQuery, args);
  //   return res.rowCount === 1;
  // }

  async addTwoFaToken(
    client: PoolClient,
    actionDto: UserTwoFaActionDto,
    tokenDetails: TokenDetails
  ) {
    const strQuery = ` INSERT INTO user_two_fa_tokens(user_id, 
      two_fa_method_id, token, token_type, validity_seconds, request_ip, request_user_agent, created_by) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      tokenDetails.token,
      actionDto.tokenType,
      tokenDetails.validitySecs,
      actionDto.ip,
      actionDto.userAgent,
      actionDto.userId,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async storePending2FaSetup(client: PoolClient, actionDto: UserTwoFaActionDto, token: string) {
    const strQuery = `INSERT INTO user_two_fa_token_usage_history 
      (user_id, two_fa_method_id, token, token_type, request_ip, request_user_agent, created_by)
      VALUES($1, $2, $3, $4, $5, $6, $7)`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      `${token}:${actionDto.senderDetail}`,
      'PENDING_SETUP',
      actionDto.ip,
      actionDto.userAgent,
      actionDto.userId,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async validatePending2FaSetup(client: PoolClient, actionDto: UserTwoFaActionDto, token: string) {
    const strQuery = `SELECT id FROM user_two_fa_token_usage_history 
      WHERE user_id = $1 AND two_fa_method_id = $2 AND token = $3 AND token_type = 'PENDING_SETUP'`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      `${token}:${actionDto.senderDetail}`,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async cleanupPending2FaSetup(client: PoolClient, actionDto: UserTwoFaActionDto, token: string) {
    const strQuery = `DELETE FROM user_two_fa_token_usage_history 
      WHERE user_id = $1 AND two_fa_method_id = $2 AND token = $3 AND token_type = 'PENDING_SETUP'`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      `${token}:${actionDto.senderDetail}`,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async isValid2FaUser(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const strQuery = `SELECT id FROM user_two_fa_settings WHERE user_id = $1 
    AND two_fa_method_id = $2 AND two_fa_sender_details = $3 AND status = $4`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      actionDto.senderDetail,
      actionDto.status,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async getUserTwoFa(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const qb = new QueryBuilder(
      `SELECT id,two_fa_sender_details, two_fa_method_id, status FROM user_two_fa_settings 
      WHERE user_id = $1 \n`,
      [actionDto.userId]
    );
    if (actionDto.status) {
      qb.append(" AND status = $2 ", [actionDto.status]);
    }
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    return TwoFaDao.getResult(res.rows);
  }

  async get2FaToken(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const qb = new QueryBuilder(
      `SELECT id, token, validity_seconds, created_on FROM user_two_fa_tokens WHERE user_id = $1 \n`,
      [actionDto.userId]
    );
    
    if (actionDto.currentMethodId) {
      qb.append(" AND two_fa_method_id = $2", [actionDto.currentMethodId]);
    } else {
      qb.append(" AND two_fa_method_id = $2", [actionDto.methodId]);
    }
    
    if (actionDto.token) {
      qb.append(" AND token = $3", [actionDto.token]);
    }
    
    if (actionDto.tokenType) {
      qb.append(" AND token_type = $4", [actionDto.tokenType]);
    } else if (actionDto.actionType) {
      qb.append(" AND token_type = $4", [actionDto.actionType]);
    }
    
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    return TwoFaDao.getResult(res.rows);
  }

  async changeUser2FaStatus(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const strQuery = `UPDATE user_two_fa_settings set status = $1 WHERE user_id = $2 
    AND  two_fa_method_id = $3 `;
    const args = [actionDto.status, actionDto.userId, actionDto.methodId];
    const result = await client.query(strQuery, args);
    return result.rowCount === 1;
  }

  async updateUser2FaSettings(
    client: PoolClient,
    actionDto: UserTwoFaActionDto
  ) {
    const strQuery = `UPDATE user_two_fa_settings SET two_fa_method_id = $1, 
    two_fa_sender_details = $2 WHERE user_id = $3`;
    const args = [actionDto.methodId, actionDto.senderDetail, actionDto.userId];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async updateUser2FaSenderDetails(
    client: PoolClient,
    userId: Id,
    newSenderDetail: string
  ) {
    const strQuery = `UPDATE user_two_fa_settings SET two_fa_sender_details = $1 
    WHERE user_id = $2`;
    const args = [newSenderDetail, userId];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  async updateTwoFaTokenHistory(
    client: PoolClient,
    actionDto: UserTwoFaActionDto
  ) {
    const strQuery = `INSERT INTO user_two_fa_token_usage_history (user_id, two_fa_method_id, token, 
      token_type, request_ip, request_user_agent, created_by) VALUES( $1,$2,$3,$4,$5,$6,$7)`;
    const args = [
      actionDto.userId,
      actionDto.methodId,
      actionDto.token,
      actionDto.actionType,
      actionDto.ip,
      actionDto.userAgent,
      actionDto.userId,
    ];
    const res = await client.query(strQuery, args);
    return res.rowCount === 1;
  }

  // async addRecoveryCodes(client: PoolClient, actionDto) {
  //   const markAsReadBaseQuery = `
  //   INSERT INTO user_two_fa_recovery_codes
  //   (user_id, recovery_code, status, created_by, updated_by)
  //   `;
  //   const { sql, args } = Queries.batchInsert(
  //     markAsReadBaseQuery,
  //     actionDto.tokens,
  //     (token) => [
  //       actionDto.userId,
  //       token,
  //       RECOVERY_CODE_STATUS.AVAILABLE,
  //       actionDto.userId,
  //       actionDto.userId,
  //     ]
  //   );

  //   const res = await client.query(sql, args);
  //   return res.rowCount === 5;
  // }

  async delete2FaToken(client: PoolClient, actionDto: UserTwoFaActionDto) {
    const qb = new QueryBuilder(
      `DELETE FROM user_two_fa_tokens WHERE 
    user_id = $1 \n`,
      [actionDto.userId]
    );

    if (!actionDto.isUpdate) {
      qb.append(" AND two_fa_method_id = $2", [actionDto.methodId]);
    }
    if (actionDto.token) {
      qb.append(" AND token = $3", [actionDto.token]);
    }
    const { sql, args } = qb.build();
    const res = await client.query(sql, args);
    return res.rowCount === 1;
  }

  static getResult(rows: any[]) {
    let result = null;
    if (rows[0]) {
      result = { ...rows[0] };
    }
    return result;
  }

  static getRows(rows: any[]) {
    return rows.length > 0 ? rows : null;
  }

  static getUser2fAMethods(rows: any[], actionUser: { userId: Id }) {
    let result = null;
    if (rows[0]) {
      result = {
        id: actionUser.userId,
        method: {
          id: rows[0].two_fa_method_id,
          name: rows[0].name,
          code: rows[0].code,
        },
        senderDetail: rows[0].two_fa_sender_details,
        status: rows[0].status,
      };
    }
    return result;
  }
}
