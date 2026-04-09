/* eslint-disable no-restricted-syntax */
import DBMigrate from 'db-migrate';
import { Pool } from 'pg';
import {
  getDbCredentials,
} from './helper';
import Database from '../../src/db';

/**
 * @param {import('./helper').TestPostgreSqlContainer} dbOptions
 */
function setDBMigrateEnv(dbOptions) {
  console.log('dbOptions: ', dbOptions);
  process.env.TEST_DB_USER = dbOptions.user;
  process.env.TEST_DB_PASSWORD = dbOptions.password;
  process.env.TEST_DB_HOST = dbOptions.host;
  process.env.TEST_DB_NAME = dbOptions.database;
  process.env.TEST_DB_PORT = dbOptions.port;
}

/**
 * Runs the db migration to the container
 */
export default async function runDbMigration(container) {
  const dbDetails = getDbCredentials(container);
  const dbOptions = {
    user: dbDetails.user,
    password: dbDetails.password,
    host: dbDetails.host,
    database: dbDetails.database,
    port: dbDetails.port,
  };
  const pool = new Pool(dbOptions);
  const db = new Database(pool);
  setDBMigrateEnv(dbOptions);
  const dbMigrate = DBMigrate.getInstance(true, { env: 'test' });
  dbMigrate.silence(true);
  await dbMigrate.up();
  return db;
}
