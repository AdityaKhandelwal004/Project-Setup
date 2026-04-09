import type { PoolClient } from "pg";
import type { Id} from "../models/genericTypes.ts";
import { FREQUENCY_TYPE, STATUS } from "../models/genericTypes.ts";
import BaseService from "../externalServices/baseService.ts";
import moment from "moment";

export class FrequencyService extends BaseService {
  convertAmount(
    amount: number,
    fromFrequency: FREQUENCY_TYPE,
    toFrequency: FREQUENCY_TYPE
  ): number {
    if (fromFrequency === toFrequency) {
      return amount;
    }
    const conversionFactor =
      FrequencyService.conversionMapTable[fromFrequency]?.[toFrequency];
    if (conversionFactor !== undefined) {
      return Math.round(amount * conversionFactor * 100) / 100;
    }
    // fallback: convert to daily then to target frequency (legacy logic)
    const dailyAmount = this.convertToDaily(amount, fromFrequency);
    const convertedAmount = this.convertFromDaily(dailyAmount, toFrequency);
    return Math.round(convertedAmount * 100) / 100;
  }

  static conversionMapTable: Record<
    FREQUENCY_TYPE,
    Record<FREQUENCY_TYPE, number>
  > = {
    [FREQUENCY_TYPE.MONTHLY]: {
      [FREQUENCY_TYPE.MONTHLY]: 1,
      [FREQUENCY_TYPE.YEARLY]: 12,
      [FREQUENCY_TYPE.QUARTERLY]: 3,
      [FREQUENCY_TYPE.WEEKLY]: 7 / 30,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 14 / 30,
      [FREQUENCY_TYPE.DAILY]: 1 / 30,
    },
    [FREQUENCY_TYPE.YEARLY]: {
      [FREQUENCY_TYPE.MONTHLY]: 1 / 12,
      [FREQUENCY_TYPE.YEARLY]: 1,
      [FREQUENCY_TYPE.QUARTERLY]: 1 / 4,
      [FREQUENCY_TYPE.WEEKLY]: 1 / 52,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 1 / 26,
      [FREQUENCY_TYPE.DAILY]: 1 / 365,
    },
    [FREQUENCY_TYPE.WEEKLY]: {
      [FREQUENCY_TYPE.MONTHLY]: 30 / 7,
      [FREQUENCY_TYPE.YEARLY]: 52,
      [FREQUENCY_TYPE.QUARTERLY]: 90 / 7,
      [FREQUENCY_TYPE.WEEKLY]: 1,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 2,
      [FREQUENCY_TYPE.DAILY]: 1 / 7,
    },
    [FREQUENCY_TYPE.FORTNIGHTLY]: {
      [FREQUENCY_TYPE.MONTHLY]: 30 / 14,
      [FREQUENCY_TYPE.YEARLY]: 26,
      [FREQUENCY_TYPE.QUARTERLY]: 90 / 14,
      [FREQUENCY_TYPE.WEEKLY]: 1 / 2,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 1,
      [FREQUENCY_TYPE.DAILY]: 1 / 14,
    },
    [FREQUENCY_TYPE.QUARTERLY]: {
      [FREQUENCY_TYPE.MONTHLY]: 1 / 3,
      [FREQUENCY_TYPE.YEARLY]: 4,
      [FREQUENCY_TYPE.QUARTERLY]: 1,
      [FREQUENCY_TYPE.WEEKLY]: 7 / 90,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 14 / 90,
      [FREQUENCY_TYPE.DAILY]: 1 / 90,
    },
    [FREQUENCY_TYPE.DAILY]: {
      [FREQUENCY_TYPE.MONTHLY]: 30,
      [FREQUENCY_TYPE.YEARLY]: 365,
      [FREQUENCY_TYPE.QUARTERLY]: 90,
      [FREQUENCY_TYPE.WEEKLY]: 7,
      [FREQUENCY_TYPE.FORTNIGHTLY]: 14,
      [FREQUENCY_TYPE.DAILY]: 1,
    },
  };

  // Not used now as we are now using conversionMapTable, just kept for reference
  private convertToDaily(amount: number, frequency: FREQUENCY_TYPE): number {
    switch (frequency) {
      case FREQUENCY_TYPE.DAILY:
        return amount;
      case FREQUENCY_TYPE.WEEKLY:
        return amount / 7;
      case FREQUENCY_TYPE.FORTNIGHTLY:
        return amount / 14;
      case FREQUENCY_TYPE.MONTHLY:
        return amount / 30;
      case FREQUENCY_TYPE.QUARTERLY:
        return amount / 90; // 30 * 3
      case FREQUENCY_TYPE.YEARLY:
        return amount / 365;
      default:
        return amount;
    }
  }

  // Not used now as we are now using conversionMapTable, just kept for reference
  private convertFromDaily(
    dailyAmount: number,
    targetFrequency: FREQUENCY_TYPE
  ): number {
    switch (targetFrequency) {
      case FREQUENCY_TYPE.DAILY:
        return dailyAmount;
      case FREQUENCY_TYPE.WEEKLY:
        return dailyAmount * 7;
      case FREQUENCY_TYPE.FORTNIGHTLY:
        return dailyAmount * 14;
      case FREQUENCY_TYPE.MONTHLY:
        return dailyAmount * 30;
      case FREQUENCY_TYPE.QUARTERLY:
        return dailyAmount * 90; // 30 * 3
      case FREQUENCY_TYPE.YEARLY:
        return dailyAmount * 365;
      default:
        return dailyAmount;
    }
  }

  async getUserPrimaryFrequency(
    client: PoolClient,
    userId: Id
  ): Promise<FREQUENCY_TYPE> {
    const messageKey = "getUserPrimaryFrequency";
    return this.handleExceptionWrapper(async () => {
      const query = `
        SELECT frequency 
        FROM user_income 
        WHERE user_id = $1 AND status = $2 AND type = 'PRIMARY'
        ORDER BY created_on DESC 
        LIMIT 1
      `;

      const fallbackQuery = `
        SELECT frequency 
        FROM user_income 
        WHERE user_id = $1
        ORDER BY created_on ASC 
        LIMIT 1
      `;

      const result = await client.query(query, [userId, STATUS.ACTIVE]);
      if (result.rows.length > 0) {
        return result.rows[0].frequency as FREQUENCY_TYPE;
      }

      // Fallback: get the first frequency ever added
      const fallbackResult = await client.query(fallbackQuery, [userId]);
      if (fallbackResult.rows.length > 0) {
        return fallbackResult.rows[0].frequency as FREQUENCY_TYPE;
      }
      
      return FREQUENCY_TYPE.MONTHLY;
    }, messageKey);
  }

  async getUserPrimaryIncomeScheduledDate(
    client: PoolClient,
    userId: Id
  ): Promise<string> {
    const messageKey = "getUserPrimaryIncomeScheduledDate";
    return this.handleExceptionWrapper(async () => {
      const query = `
        SELECT scheduled_payment_date 
        FROM user_income 
        WHERE user_id = $1 AND status = $2 AND type = 'PRIMARY'
        ORDER BY created_on DESC 
        LIMIT 1
      `;

      const fallbackQuery = `
        SELECT scheduled_payment_date 
        FROM user_income 
        WHERE user_id = $1
        ORDER BY created_on ASC 
        LIMIT 1
      `;

      const result = await client.query(query, [userId, STATUS.ACTIVE]);
      if (result.rows.length > 0) {
        return moment(result?.rows[0]?.scheduled_payment_date)?.format("YYYY-MM-DD");
      }

      // Fallback: get the first frequency ever added
      const fallbackResult = await client.query(fallbackQuery, [userId]);
      if (fallbackResult.rows.length > 0) {
        return moment(fallbackResult?.rows[0]?.scheduled_payment_date)?.format("YYYY-MM-DD");
      }
      
      return moment().format("YYYY-MM-DD");
    }, messageKey);
  }

  calculateNormalizedTotal(
    amounts: Array<{ amount: number; frequency: FREQUENCY_TYPE }>,
    targetFrequency: FREQUENCY_TYPE
  ): number {
    const total = amounts.reduce((sum, { amount, frequency }) => {
      const convertedAmount = this.convertAmount(
        amount,
        frequency,
        targetFrequency
      );
      return sum + convertedAmount;
    }, 0);

    return Math.round(total * 100) / 100;
  }

  async convertToUserFrequency(
    client: PoolClient,
    userId: Id,
    amount: number,
    fromFrequency: FREQUENCY_TYPE
  ): Promise<number> {
    const userFrequency = await this.getUserPrimaryFrequency(client, userId);

    return this.convertAmount(amount, fromFrequency, userFrequency);
  }

  async convertFromUserFrequency(
    client: PoolClient,
    userId: Id,
    amount: number,
    toFrequency: FREQUENCY_TYPE
  ): Promise<number> {
    const userFrequency = await this.getUserPrimaryFrequency(client, userId);
    return this.convertAmount(amount, userFrequency, toFrequency);
  }

  getFrequencyDisplayName(frequency: FREQUENCY_TYPE): string {
    switch (frequency) {
      case FREQUENCY_TYPE.DAILY:
        return "Daily";
      case FREQUENCY_TYPE.WEEKLY:
        return "Weekly";
      case FREQUENCY_TYPE.FORTNIGHTLY:
        return "Fortnightly";
      case FREQUENCY_TYPE.MONTHLY:
        return "Monthly";
      case FREQUENCY_TYPE.QUARTERLY:
        return "Quarterly";
      case FREQUENCY_TYPE.YEARLY:
        return "Yearly";
      default:
        return "Unknown";
    }
  }

  calculateIncomePercentage(
    allocationAmount: number,
    allocationFrequency: FREQUENCY_TYPE,
    totalIncome: number
  ): number {
    const monthlyAllocation = this.convertAmount(
      allocationAmount,
      allocationFrequency,
      FREQUENCY_TYPE.MONTHLY
    );

    if (totalIncome === 0) return 0;

    const percentage = (monthlyAllocation / totalIncome) * 100;
    return Math.round(percentage * 100) / 100;
  }
}

export default FrequencyService;
