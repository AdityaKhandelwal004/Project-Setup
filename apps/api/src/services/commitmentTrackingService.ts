import type { PoolClient } from "pg";
import type { Id} from "../models/genericTypes.ts";
import { FREQUENCY_TYPE, STATUS, PROGRESS_TYPE, GOAL_STATUS } from "../models/genericTypes.ts";
import BaseService from "../externalServices/baseService.ts";
import FrequencyService from "./frequencyService.ts";
import {
  formatErrorResponse,
} from "../utils/index.ts";

export interface CommitmentValidation {
  isValid: boolean;
  availableAmount: number;
  totalCommitted: number;
  newCommitment: number;
  remainingAfterCommitment: number;
  message: string;
}

/**
 * Service to track and validate commitments against income savings
 * Prevents overcommitting across Safety Net, Savings Plan, Debt, Super, and Investment modules
 */
export class CommitmentTrackingService extends BaseService {
  private frequencyService = new FrequencyService();

  /**
   * Validate income savings commitment against total available income
   * Used by Safety Net, Savings Plan, and Debt modules
   * @param client - Database client
   * @param userId - User ID
   * @param commitmentAmount - New commitment amount
   * @param commitmentFrequency - Frequency of the commitment (DAILY, WEEKLY, etc.)
   * @param excludeModule - Module to exclude from existing commitments
   * @param excludeId - Specific record ID to exclude
   * @returns Validation result
   */
  async validateCommitment(
    client: PoolClient,
    userId: Id,
    commitmentAmount: number,
    commitmentFrequency: FREQUENCY_TYPE,
    currentMonthlyAllocation: number,
    excludeModule?: string,
    excludeId?: Id
  ): Promise<CommitmentValidation> {
    const messageKey = "validateCommitment";
    return this.handleExceptionWrapper(async () => {
      // Convert commitment amount to monthly for comparison
      const monthlyCommitmentAmount = this.frequencyService.convertAmount(
        commitmentAmount,
        commitmentFrequency,
        FREQUENCY_TYPE.MONTHLY
      );

      // Get total income savings (convert to monthly for comparison)
      let monthlyIncomeSavings = await this.getMonthlyIncomeSavingsAllocation(
        client,
        userId
      );

      // Get all existing monthly commitments
      const existingMonthlyCommitments = await this.getTotalMonthlyCommitments(
        client,
        userId,
        excludeModule,
        excludeId
      );

      console.log(existingMonthlyCommitments);
      
      const totalAfterNewCommitment =
        existingMonthlyCommitments + monthlyCommitmentAmount;
      monthlyIncomeSavings += currentMonthlyAllocation
      const remaining = monthlyIncomeSavings - totalAfterNewCommitment;

      const isValid = totalAfterNewCommitment <= monthlyIncomeSavings;

      return {
        isValid,
        availableAmount: monthlyIncomeSavings,
        totalCommitted: existingMonthlyCommitments,
        newCommitment: monthlyCommitmentAmount,
        remainingAfterCommitment: remaining,
        message: isValid
          ? `Valid commitment. $${remaining.toFixed(2)}/month will remain available.`
          : formatErrorResponse("allocateFunds", "commitmentLimitExceeded"),
      };
    }, messageKey);
  }

  /**
   * Validate investment commitment against INVESTMENT budget category allocation
   * Used by Super and Investment modules only
   * @param client - Database client
   * @param userId - User ID
   * @param commitmentAmount - New commitment amount
   * @param commitmentFrequency - Frequency of the commitment (DAILY, WEEKLY, etc.)
   * @param excludeModule - Module to exclude from existing commitments
   * @param excludeId - Specific record ID to exclude
   * @returns Validation result
   */
  async validateInvestmentCommitment(
    client: PoolClient,
    userId: Id,
    commitmentAmount: number,
    commitmentFrequency: FREQUENCY_TYPE,
    currentMonthlyAllocation: number,
    excludeModule?: string,
    excludeId?: Id
  ): Promise<CommitmentValidation> {
    const messageKey = "validateInvestmentCommitment";
    return this.handleExceptionWrapper(async () => {
      // Convert commitment amount to monthly for comparison
      const monthlyCommitmentAmount = this.frequencyService.convertAmount(
        commitmentAmount,
        commitmentFrequency,
        FREQUENCY_TYPE.MONTHLY
      );

      // Get total investment allocation (convert to monthly for comparison)
      let monthlyInvestmentAllocation =
        await this.getMonthlyInvestmentAllocation(client, userId);

      // Get existing investment commitments (only Super and Investment modules)
      const existingInvestmentCommitments =
        await this.getTotalMonthlyInvestmentCommitments(
          client,
          userId,
          excludeModule,
          excludeId
        );

      const totalAfterNewCommitment =
        existingInvestmentCommitments + monthlyCommitmentAmount;
      monthlyInvestmentAllocation += currentMonthlyAllocation
      const remaining = monthlyInvestmentAllocation - totalAfterNewCommitment;

      const isValid = totalAfterNewCommitment <= monthlyInvestmentAllocation;

      return {
        isValid,
        availableAmount: monthlyInvestmentAllocation,
        totalCommitted: existingInvestmentCommitments,
        newCommitment: monthlyCommitmentAmount,
        remainingAfterCommitment: remaining,
        message: isValid
          ? `Valid investment commitment. $${remaining.toFixed(2)}/month will remain available.`
          : formatErrorResponse("allocateInvestmentFunds", "commitmentLimitExceeded"),
      };
    }, messageKey);
  }

  /**
   * Get income savings allocation converted to monthly
   * @param client - Database client
   * @param userId - User ID
   * @returns Monthly income savings amount
   */
  private async getMonthlyIncomeSavingsAllocation(
    client: PoolClient,
    userId: Id
  ): Promise<number> {
    const query = `
      SELECT 
        ubpa.allocation_amount,
        COALESCE(ubpa.frequency, 'MONTHLY') as allocation_frequency
      FROM user_budget_plan ubp
      INNER JOIN user_budget_plan_allocation ubpa ON ubp.id = ubpa.user_budget_id
      INNER JOIN system_budget_categories sbc ON ubpa.system_budget_category_id = sbc.id
      WHERE ubp.user_id = $1 
        AND ubp.status = $2
        AND ubpa.status = $2
        AND ubpa.allocation_type = 'SAVING'
        AND sbc.code = 'SAVINGS'
      ORDER BY ubp.created_on DESC
      LIMIT 1`;

    const result = await client.query(query, [userId, STATUS.ACTIVE]);

    if (result.rows.length === 0) {
      return 0;
    }

    const row = result.rows[0];
    const amount = parseFloat(row.allocation_amount);
    const frequency = row.allocation_frequency as FREQUENCY_TYPE;

    // Convert to monthly
    return this.frequencyService.convertAmount(
      amount,
      frequency,
      FREQUENCY_TYPE.MONTHLY
    );
  }

  /**
   * Get investment allocation converted to monthly
   * @param client - Database client
   * @param userId - User ID
   * @returns Monthly investment allocation amount
   */
  private async getMonthlyInvestmentAllocation(
    client: PoolClient,
    userId: Id
  ): Promise<number> {
    const query = `
      SELECT 
        ubpa.allocation_amount,
        COALESCE(ubpa.frequency, 'MONTHLY') as allocation_frequency
      FROM user_budget_plan ubp
      INNER JOIN user_budget_plan_allocation ubpa ON ubp.id = ubpa.user_budget_id
      INNER JOIN system_budget_categories sbc ON ubpa.system_budget_category_id = sbc.id
      WHERE ubp.user_id = $1 
        AND ubp.status = $2
        AND ubpa.status = $2
        AND ubpa.allocation_type = 'SAVING'
        AND sbc.code = 'INVESTMENT'
      ORDER BY ubp.created_on DESC
      LIMIT 1`;

    const result = await client.query(query, [userId, STATUS.ACTIVE]);

    if (result.rows.length === 0) {
      return 0;
    }

    const row = result.rows[0];
    const amount = parseFloat(row.allocation_amount);
    const frequency = row.allocation_frequency as FREQUENCY_TYPE;

    // Convert to monthly
    return this.frequencyService.convertAmount(
      amount,
      frequency,
      FREQUENCY_TYPE.MONTHLY
    );
  }

  /**
   * Get total monthly commitments across modules (excludes Super and Investment as they use separate investment validator)
   * @param client - Database client
   * @param userId - User ID
   * @param excludeModule - Module to exclude
   * @param excludeId - Record ID to exclude
   * @returns Total monthly commitments from income savings
   */
  async getTotalMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeModule?: string,
    excludeId?: Id
  ): Promise<number> {
    let total = 0;

    // Safety Net commitments
    if (excludeModule !== "safetyNet") {
      total += await this.getSafetyNetMonthlyCommitments(
        client,
        userId,
        excludeId
      );
    }

    // Savings Plan commitments
    if (excludeModule !== "savingsPlan") {
      total += await this.getSavingsPlanMonthlyCommitments(
        client,
        userId,
        excludeId
      );
    }

    // Debt commitments (from income savings, not total debt payments)
    if (excludeModule !== "debt") {
      total += await this.getDebtMonthlyCommitments(client, userId, excludeId);
    }

    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Get total monthly investment commitments (Super and Investment modules only)
   * @param client - Database client
   * @param userId - User ID
   * @param excludeModule - Module to exclude
   * @param excludeId - Record ID to exclude
   * @returns Total monthly investment commitments
   */
  private async getTotalMonthlyInvestmentCommitments(
    client: PoolClient,
    userId: Id,
    excludeModule?: string,
    excludeId?: Id
  ): Promise<number> {
    let total = 0;

    // Super commitments
    // if (excludeModule !== "super") {
    //   total += await this.getSuperMonthlyCommitments(client, userId, excludeId);
    // }

    // Investment commitments
    if (excludeModule !== "investment") {
      total += await this.getInvestmentMonthlyCommitments(
        client,
        userId,
        excludeId
      );
    }

    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Get Safety Net monthly commitments
   */
  private async getSafetyNetMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeId?: Id
  ): Promise<number> {
    const query = `
      SELECT 
        usn.income_contribution_amount
      FROM user_safety_net_goals usn
      WHERE usn.user_id = $1 
        AND usn.income_contribution_amount > 0
        ${excludeId ? "AND usn.id != $2" : ""}`;

    const params = [userId];
    if (excludeId) params.push(excludeId);

    const result = await client.query(query, params);
    
    return result.rows.reduce((total, row) => {
      const amount = parseFloat(row.income_contribution_amount);
      const frequency = FREQUENCY_TYPE.MONTHLY;
      const monthlyAmount = this.frequencyService.convertAmount(
        amount,
        frequency,
        FREQUENCY_TYPE.MONTHLY
      );
      return total + monthlyAmount;
    }, 0);
  }

  /**
   * Get Savings Plan monthly commitments
   */
  private async getSavingsPlanMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeId?: Id
  ): Promise<number> {
    const query = `
      SELECT 
        usg.income_contribution_amount
      FROM user_savings_goals usg
      WHERE usg.user_id = $1 
        AND usg.status = $2
        AND usg.income_contribution_amount > 0
        ${excludeId ? "AND usg.id != $3" : ""}`;

    const params = [userId, GOAL_STATUS.IN_PROGRESS];
    if (excludeId) params.push(excludeId);

    const result = await client.query(query, params);

    return result.rows.reduce((total, row) => {
      const amount = parseFloat(row.income_contribution_amount);
      const frequency = FREQUENCY_TYPE.MONTHLY;
      const monthlyAmount = this.frequencyService.convertAmount(
        amount,
        frequency,
        FREQUENCY_TYPE.MONTHLY
      );
      return total + monthlyAmount;
    }, 0);
  }

  /**
   * Get Debt monthly commitments (only payments from income savings)
   */
  private async getDebtMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeId?: Id
  ): Promise<number> {
    const query = `
      SELECT 
        uda.accelerator_allocated_amount,
        COALESCE(ud.payment_frequency, 'MONTHLY') as frequency
      FROM user_debt_accelerator uda
      LEFT JOIN user_debts ud ON uda.accelerated_debt_id = ud.id
      WHERE uda.user_id = $1 AND uda.status = 'ACTIVE'
        ${excludeId ? "AND uda.id != $3" : ""}`;

    const params = [userId];
    if (excludeId) params.push(excludeId);

    const result = await client.query(query, params);

    return result.rows.reduce((total, row) => {
      const amount = parseFloat(row.accelerator_allocated_amount);
      const frequency = row.frequency as FREQUENCY_TYPE;
      const monthlyAmount = this.frequencyService.convertAmount(
        amount,
        frequency,
        FREQUENCY_TYPE.MONTHLY
      );
      return total + monthlyAmount;
    }, 0);
  }

  /**
   * Get Super monthly commitments
   */
  private async getSuperMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeId?: Id
  ): Promise<number> {
    const query = `
      SELECT 
        usf.contribution_amount,
        COALESCE(usf.contribution_frequency, 'MONTHLY') as frequency
      FROM user_super_funds usf
      WHERE usf.user_id = $1 
        AND usf.status = $2
        ${excludeId ? "AND usf.id != $3" : ""}`;

    const params = [userId, PROGRESS_TYPE.IN_PROGRESS];
    if (excludeId) params.push(excludeId);

    const result = await client.query(query, params);

    return result.rows.reduce((total, row) => {
      const amount = parseFloat(row.contribution_amount);
      const frequency = row.frequency as FREQUENCY_TYPE;
      const monthlyAmount = this.frequencyService.convertAmount(
        amount,
        frequency,
        FREQUENCY_TYPE.MONTHLY
      );
      return total + monthlyAmount;
    }, 0);
  }

  /**
   * Get Investment monthly commitments
   */
  private async getInvestmentMonthlyCommitments(
    client: PoolClient,
    userId: Id,
    excludeId?: Id
  ): Promise<number> {
    const query = `
      SELECT 
        ui.income_contribution_amount,
        COALESCE(ui.contribution_frequency, 'MONTHLY') as frequency
      FROM user_investments ui
      WHERE ui.user_id = $1 
        AND ui.status = $2
        ${excludeId ? "AND ui.id != $3" : ""}`;

    const params = [userId, PROGRESS_TYPE.IN_PROGRESS];
    if (excludeId) params.push(excludeId);

    const result = await client.query(query, params);

    return result.rows.reduce((total, row) => {
      const amount = parseFloat(row.income_contribution_amount);
      const frequency = row.frequency as FREQUENCY_TYPE;
      const monthlyAmount = this.frequencyService.convertAmount(
        amount,
        frequency,
        FREQUENCY_TYPE.MONTHLY
      );
      return total + monthlyAmount;
    }, 0);
  }

  /**
   * Get available monthly amount for new commitments (from income savings)
   * @param client - Database client
   * @param userId - User ID
   * @returns Available monthly amount from income savings
   */
  async getAvailableMonthlyAmount(
    client: PoolClient,
    userId: Id
  ): Promise<number> {
    const messageKey = "getAvailableMonthlyAmount";
    return this.handleExceptionWrapper(async () => {
      const totalIncomeSavings = await this.getMonthlyIncomeSavingsAllocation(
        client,
        userId
      );
      const totalCommitted = await this.getTotalMonthlyCommitments(
        client,
        userId
      );

      return Math.max(0, totalIncomeSavings - totalCommitted);
    }, messageKey);
  }

  /**
   * Get available monthly amount from investment allocation after existing commitments
   * @param client - Database client
   * @param userId - User ID
   * @returns Available monthly amount from investment allocation
   */
  async getAvailableMonthlyInvestmentAmount(
    client: PoolClient,
    userId: Id
  ): Promise<number> {
    const messageKey = "getAvailableMonthlyInvestmentAmount";
    return this.handleExceptionWrapper(async () => {
      const totalInvestmentAllocation =
        await this.getMonthlyInvestmentAllocation(client, userId);
      const totalCommitted = await this.getTotalMonthlyInvestmentCommitments(
        client,
        userId
      );

      return Math.max(0, totalInvestmentAllocation - totalCommitted);
    }, messageKey);
  }
}

export default CommitmentTrackingService;
