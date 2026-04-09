/* eslint-disable no-console */
import express  from 'express';
import type { Application } from 'express';
import moment from 'moment';
import config from './config/index.ts';
import appLoaders from './loaders/index.ts';

async function startServer(): Promise<void> {
  const app : Application = express();
  const now = moment();

  console.log('Initializing Obiemoney application');
  await appLoaders({ expressApp: app });

  app.listen(config.port, () => {
    try {
      console.log(`
      ####################################################################
      🛡️  Obiemoney Server listening on port: ${config.port} with feature level ${config.featureLevel}, 
          server start took ${moment().diff(now)} ms 🛡️ 
      ####################################################################`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer();
