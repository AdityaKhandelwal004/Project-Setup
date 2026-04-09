import { PostgreSqlContainer } from '@testcontainers/postgresql';
import Container from 'typedi';
import runMigration from '../utils/migration';
import { mockConsoleLog, restoreConsoleLog, setContainer } from '../utils';
import initializeBaseUsers from '../utils/login';
import { TwoFaService } from '../../src/modules/twoFa';

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

  test('Get TWO FA methods', async () => {
    const twoFaService = Container.get(TwoFaService);
    const res = await twoFaService.getTwoFaMethods();
    expect(res).toBeDefined();
    expect(res).toBeInstanceOf(Array);
  });

  test('Set Two FA setup', async () => {
    const twoFaService = Container.get(TwoFaService);
    const actionUser = {
      id: 1,
      isUnitTest: true,
    };
    const dto = {
      methodId: 2,
      senderDetail: 'ravi@memorres.com',
      actionType: 'ENABLE',
    };
    const res = await twoFaService.setTwoFa(dto, {
      ...actionUser,
      ip,
      userAgent,
    });
    expect(res).toBeDefined();
    expect(res).toHaveProperty(
      'message',
      'success.twoFactorAuthentication.otpSentSuccessFully'
    );
  });

  test('confirm Two FA setup', async () => {
    const twoFaService = Container.get(TwoFaService);
    const actionUser = {
      id: 1,
    };
    const dto = {
      actionType: 'ENABLE',
      methodId: 2,
      senderDetail: 'ravi@memorres.com',
      verificationToken: 999999,
    };
    const res = await twoFaService.confirmTwoFa(dto, {
      ...actionUser,
      ip,
      userAgent,
    });
    expect(res).toBeDefined();
    expect(res).toHaveProperty(
      'message',
      'success.twoFactorAuthentication.verifiedSuccessfully'
    );
  });

  test('Update Two FA setup', async () => {
    const twoFaService = Container.get(TwoFaService);
    const actionUser = {
      id: 1,
      isUnitTest: true,
    };
    const dto = {
      actionType: 'MODIFY',
      methodId: 2,
      senderDetail: 'ravi4@memorres.com',
    };
    const res = await twoFaService.updateTwoFa(dto, {
      ...actionUser,
      ip,
      userAgent,
    });
    expect(res).toBeDefined();
    expect(res).toHaveProperty(
      'message',
      'success.twoFactorAuthentication.otpSentSuccessfully'
    );
  });

  test('confirm Two FA setup', async () => {
    const twoFaService = Container.get(TwoFaService);
    const actionUser = {
      id: 1,
    };
    const dto = {
      actionType: 'MODIFY',
      methodId: 2,
      senderDetail: 'ravi4@memorres.com',
      verificationToken: 999999,
      newMethodVerificationToken: 999991,
    };
    const res = await twoFaService.confirmTwoFa(dto, {
      ...actionUser,
      ip,
      userAgent,
    });
    expect(res).toBeDefined();
    expect(res).toHaveProperty(
      'message',
      'success.twoFactorAuthentication.updatedSuccessfully'
    );
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
