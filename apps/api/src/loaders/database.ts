/* eslint-disable no-console */
import cmd from 'node-cmd';
import BlueBirdPromise from 'bluebird';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('migrate', {
    type: 'string',
    choices: ['migrate', 'clean_and_migrate'],
    describe: 'Database migration options',
  })
  .parseSync();
import Database from '../db/index.ts';

const getAsyncCmd = BlueBirdPromise.promisify(cmd.run, {
  multiArgs: true,
  context: cmd,
});

const migrate = async (): Promise<void> => {
  console.info('Initializing database migrations...');
  const data = await getAsyncCmd('npm run db:migrate');
  const dataStr = Array.isArray(data) ? data.join('\n') : data;
  dataStr?.split('\n')?.forEach((line: string) => {
    console.info(line);
  });
  console.log('Database migrations complete.');
};

const clean = async (): Promise<void> => {
  console.warn('CREATING DATABASE FROM SCRATCH, ALL DATA WILL BE LOST!');
  const data = await getAsyncCmd('npm run db:clean');
  const dataStr = Array.isArray(data) ? data.join('\n') : data;
  dataStr?.split('\n')?.forEach((line: string) => {
    console.info(line);
  });
  console.log('Data dropped, proceeding');
};

export default async (): Promise<Database> => {
  const db = new Database();
  try {
    await db.testConnection();

    switch (argv.migrate) {
      case 'migrate':
        await migrate();
        break;
      case 'clean_and_migrate':
        await clean();
        await migrate();
        break;
      default:
        console.info('No database migrations requested, skipping migrations.');
        break;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error('Unknown error', e);
    }
    process.exit(1);
  }
  return db;
};