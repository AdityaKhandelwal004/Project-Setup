import { PostgreSqlContainer } from '@testcontainers/postgresql';
import Container from 'typedi';
import runMigration from '../utils/migration';
import SecurityService from '../../src/modules/security/securityService';
import {
  mockConsoleLog,
  restoreConsoleLog,
  setContainer,
} from '../utils';
import { HttpException } from '../../src/utils';
import initializeBaseUsers from '../utils/login';

const ip = '127.0.0.1';
const userAgent = 'Postman';

describe('DB Transactions', () => {
  beforeAll(async () => {
    const container = await new PostgreSqlContainer().start();
    const mockedLog = mockConsoleLog('log');
    const mockedInfo = mockConsoleLog('info');
    const database = await runMigration(container);
    restoreConsoleLog(mockedLog);
    restoreConsoleLog(mockedInfo);
    setContainer(database);
    await database.withTransaction(async (client) => {
      await initializeBaseUsers(client);
    });
  });

  test('Login with wrong cred', async () => {
    /**
     * @type {Database}
     */
    // const db = Container.get('DbTransactions');
    const securityService = Container.get(SecurityService);
    const email = undefined;
    const password = 'password';
    const res = async () => await securityService.login({ ip, userAgent }, email, password);
    expect(res).rejects.toThrow(HttpException.Unauthorized);
  });

  test('Login with proper cred', async () => {
    const securityService = Container.get(SecurityService);
    const email = 'testuser+1@example.com';
    const password = 'fd3a9fede749d0bd844dddb94e328cf6';
    const res = await securityService.login({ ip, userAgent }, email, password);
    expect(res).toBeDefined();
    expect(res).toHaveProperty('token');
    expect(res.token.length).toBeGreaterThan(0);
  });

  test('Request reset password with invalid email', async () => {
    const securityService = Container.get(SecurityService);
    const email = 'testuser+2@example.com';
    const res = async () => await securityService.requestResetPassword({ ip, userAgent, email });
    expect(res).rejects.toThrow(HttpException.BadRequest);
  });

  test('Sending email to valid email', async () => {
    const securityService = Container.get(SecurityService);
    const expectedResponse = 'success.requestResetPassword.emailSend';
    const email = 'testuser+1@example.com';
    const res = await securityService.requestResetPassword({ ip, userAgent, email });
    expect(res).toHaveProperty('message', expectedResponse);
  });

  test('Verifying password mismatch', async () => {
    const securityService = Container.get(SecurityService);
    const res = async () => await securityService.resetPassword('Pass@123', 'Pass', 'token', { ip, userAgent });
    expect(res).rejects.toThrow(HttpException.Forbidden);
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
