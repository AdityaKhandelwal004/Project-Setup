/* eslint-disable class-methods-use-this */
import { Pool } from 'pg';
import type { PoolClient, PoolConfig } from 'pg';
import config from '../config/index.ts';

class Database {
  private pool: Pool;

  constructor(pool?: Pool) {
    if (pool) {
      this.pool = pool;
    } else {
      const poolConfig: PoolConfig = {
        user: config.db.credentials.user,
        password: config.db.credentials.password,
        host: config.db.host,
        database: config.db.name,
        port: config.db.port,
      };
      this.pool = new Pool(poolConfig);
    }
  }

  async testConnection(): Promise<string> {
    await this.pool.query('SELECT 1=1');
    return 'Db Pool Connected';
  }

  /**
   * Executes a callback within a database transaction.
   * @param callback function that receives a Client and returns a Promise of any result
   */
  // eslint-disable-next-line no-unused-vars
  async withTransaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client : PoolClient = await this.pool.connect();
    let res: T;
    try {
      await client.query('BEGIN');
      res = await callback(client);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
    return res;
  }

  endPool(): void {
    this.pool.end();
  }
}

export default Database;
