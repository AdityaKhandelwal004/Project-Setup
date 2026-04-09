import { PostgreSqlContainer } from '@testcontainers/postgresql';
import Container from 'typedi';
import runMigration from '../../utils/migration';
import config from '../../../src/config';
import {
  mockConsoleLog,
  restoreConsoleLog,
  setContainer,
  getDbCredentials,
} from '../../utils';
import Database from '../../../src/db';

describe('DB Transactions', () => {
  beforeAll(async () => {
    const container = await new PostgreSqlContainer().start();
    const mockedLog = mockConsoleLog('log');
    const mockedInfo = mockConsoleLog('info');
    const database = await runMigration(container);
    restoreConsoleLog(mockedLog);
    restoreConsoleLog(mockedInfo);
    setContainer(database);
  });

  it('Should connect and execute query', async () => {
    /**
     * @type {Database}
     */
    const db = Container.get('DbTransactions');
    const response = await db.withTransaction(async (client) => await client.query('SELECT id FROM users'));
    expect(response).toHaveProperty('rows');
    expect(response).toHaveProperty('rowCount');
  });

  it('Should be able to test connection', async () => {
    /**
     * @type {Database}
     */
    const db = Container.get('DbTransactions');
    const response = await db.testConnection();
    expect(response).toBe('Db Pool Connected');
  });

  it('Should rollback on error', async () => {
    /**
     * @type {Database}
     */
    const db = Container.get('DbTransactions');
    try {
      await db.withTransaction(async (client) => {
        await client.query('SELECT 1=1');
        throw new Error('Test');
      });
    } catch (e) {
      expect(e.message).toBe('Test');
    }
  });

  it('Should be able to create new pool when not provided', async () => {
    const container = await new PostgreSqlContainer().start();
    const dbDetails = getDbCredentials(container);
    const mockedValues = {
      db: {
        credentials: {
          user: dbDetails.user,
          password: dbDetails.password,
        },
        host: dbDetails.host,
        name: dbDetails.database,
        port: dbDetails.port,
      },
    };
    jest.replaceProperty(config, 'db', mockedValues.db);
    const db = new Database();
    const response = await db.testConnection();
    expect(response).toBe('Db Pool Connected');
  });

  afterAll(async () => {
    // Doing this as we need to close the connection before the container is killed
    // Otherwise Jest will report about open handles
    /**
     * @type {Database}
     */
    const db = Container.get('DbTransactions');
    db.endPool();
    jest.restoreAllMocks();
  });
});
