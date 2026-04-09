// Note: Install stripe package with: npm install stripe @types/stripe
import Stripe from "stripe";
import type {
  IPaymentService,
  PaymentIntent,
  Customer,
  CreateCustomerRequest,
  CreatePaymentIntentRequest} from "./IPaymentService.ts";
import {
  PaymentServiceError,
  PaymentDeclinedError,
  InvalidPaymentMethodError
} from "./IPaymentService.ts";
import { PaymentStatus } from "../../models/genericTypes.ts";
import config from "../../config/index.ts";

export class StripePaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor() {
    const apiKey = config.stripe.secretKey;
    if (!apiKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }
    this.stripe = new Stripe(apiKey, {
      apiVersion: "2025-10-29.clover",
      typescript: true,
    });
  }

  // =========================================================
  // CUSTOMER MANAGEMENT
  // =========================================================
  async createCustomer(request: CreateCustomerRequest): Promise<Customer> {
    try {
      const stripeCustomer = await this.stripe.customers.create({
        email: request.email,
        name: request.name,
        metadata: request.metadata || {},
      });

      return {
        id: stripeCustomer.id,
        email: stripeCustomer.email || undefined,
        name: stripeCustomer.name || undefined,
        metadata: stripeCustomer.metadata,
      };
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  // =========================================================
  // PAYMENT INTENTS
  // =========================================================
async createPaymentIntent(request: CreatePaymentIntentRequest): Promise<PaymentIntent> {
  try {
    const stripePaymentIntent = await this.stripe.paymentIntents.create({
      amount: request.amount,
      currency: request.currency.toLowerCase(),
      payment_method: request.token,
      confirm: request.confirm || false,
      metadata: request.metadata || {},
      customer: request.customerId,
      description: request.description,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    return this.mapStripePaymentIntentToPaymentIntent(stripePaymentIntent);
  } catch (error) {
    console.log(error);
    
    throw this.handleStripeError(error);
  }
}

  async getPaymentMethodDetails(paymentMethodId: string): Promise<string> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodId);
      
      if (paymentMethod.type === 'card' && paymentMethod.card) {
        const card = paymentMethod.card;
        return `${card.brand?.charAt(0).toUpperCase()}${card.brand?.slice(1)}....${card.last4}`;
      }
      
      return paymentMethod.type || 'Unknown';
    } catch (error) {
      console.error('Failed to retrieve payment method:', error);
      return 'Unknown';
    }
  }

  async getAllPaymentMethodDetails(paymentMethodId: string) {
    try {
      const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentMethodId);
      
      if(!paymentMethod) {
        return 'Unknown';
      }

      return paymentMethod;
    } catch (error) {
      console.error('Failed to retrieve payment method:', error);
      return 'Unknown';
    }
  }

  formatAmount(amount: number, currency: string): string {
    const displayAmount = amount / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(displayAmount);
  }

  private mapStripePaymentIntentToPaymentIntent(stripePaymentIntent: Stripe.PaymentIntent): PaymentIntent {
    return {
      id: stripePaymentIntent.id,
      amount: stripePaymentIntent.amount,
      currency: stripePaymentIntent.currency,
      status: this.mapStripeStatusToPaymentStatus(stripePaymentIntent.status),
      clientSecret: stripePaymentIntent.client_secret || undefined,
      metadata: stripePaymentIntent.metadata,
    };
  }

  private mapStripeStatusToPaymentStatus(stripeStatus: string): PaymentStatus {
    switch (stripeStatus) {
      case "succeeded":
        return PaymentStatus.SUCCEEDED;
      case "processing":
        return PaymentStatus.PENDING;
      case "requires_payment_method":
        return PaymentStatus.REQUIRES_PAYMENT_METHOD;
      case "requires_action":
        return PaymentStatus.REQUIRES_ACTION;
      case "canceled":
        return PaymentStatus.CANCELED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  private handleStripeError(error: any): PaymentServiceError {
    if (error.type === "StripeCardError") {
      return new PaymentDeclinedError(error.message, error.decline_code, error);
    } else if (error.type === "StripeInvalidRequestError") {
      return new InvalidPaymentMethodError(error.message, error);
    } else {
      return new PaymentServiceError("stripe_error", error.message, error);
    }
  }
}