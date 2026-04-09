/* eslint-disable no-console */
import type { Application } from 'express';
import DatabaseLoader from './database.ts';
import DependencyInjectorLoader from './dependencyInjector.ts';
import ExpressLoader from './express.ts';

interface AppLoadersParams {
  expressApp: Application;
}

export default async ({ expressApp }: AppLoadersParams): Promise<void> => {
  const DbTransactions = await DatabaseLoader();
  console.info('✌ DB connected and loaded successfully!');

  DependencyInjectorLoader({ DbTransactions });
  console.info('✌️ Dependency Injector loaded');

  ExpressLoader({ app: expressApp });
  console.info('✌️ Express loaded');
};
