import type { IPaymentService } from "./IPaymentService.ts";
import { StripePaymentService } from "./StripePaymentService.ts";

export class PaymentServiceFactory {
  private static instance: IPaymentService | null = null;

  static getInstance(): IPaymentService {
    if (!this.instance) {
      this.instance = new StripePaymentService();
    }
    return this.instance;
  }

  static resetInstance(): void {
    this.instance = null;
  }
}

export function getPaymentService(): IPaymentService {
  return PaymentServiceFactory.getInstance();
}
