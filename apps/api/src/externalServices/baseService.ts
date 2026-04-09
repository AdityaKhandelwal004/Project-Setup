import { Container } from "typedi";
import type { PoolClient } from "pg";
import type Database from "../db/index.ts";
import {
  formatErrorResponse,
  handleException,
  HttpException,
} from "../utils/index.ts";

export default class BaseService {
  protected readonly txs: Database;

  constructor() {
    this.txs = Container.get<Database>("DbTransactions");
  }

  async withTransaction<T>(
    // eslint-disable-next-line no-unused-vars
    action: (client: PoolClient) => Promise<T>,
    messageKey: string
  ): Promise<T> {
    return this.txs.withTransaction(async (client) => {
      try {
        return await action(client);
      } catch (error) {
        throw (
          error ||
          new HttpException.ServerError(
            formatErrorResponse(messageKey, "serverError")
          )
        );
      }
    });
  }

  async handleExceptionWrapper<T>(
    action: () => Promise<T>,
    messageKey: string
  ): Promise<T> {
    return handleException(action, messageKey);
  }
}
