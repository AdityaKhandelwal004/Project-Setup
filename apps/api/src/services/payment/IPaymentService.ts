import type { PaymentStatus } from "../../models/genericTypes.ts";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  clientSecret?: string;
  metadata?: Record<string, any>;
}

export interface Customer {
  id: string;
  email?: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface CreateCustomerRequest {
  email?: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  customerId?: string;
  token?: string;
  description?: string;
  confirm?: boolean;
  metadata?: Record<string, any>;
}

export interface IPaymentService {
  createCustomer(_request: CreateCustomerRequest): Promise<Customer>;
  
  createPaymentIntent(_request: CreatePaymentIntentRequest): Promise<PaymentIntent>;
  
  getPaymentMethodDetails(_paymentMethodId: string): Promise<string>;

  getAllPaymentMethodDetails(_paymentMethodId: string): any;
  
  formatAmount(_amount: number, _currency: string): string;
}

export class PaymentServiceError extends Error {
  constructor(
    public _code: string,
    message: string,
    public _originalError?: any
  ) {
    super(message);
    this.name = "PaymentServiceError";
  }
}

export class PaymentDeclinedError extends PaymentServiceError {
  constructor(message: string, public _declineCode?: string, originalError?: any) {
    super("payment_declined", message, originalError);
    this.name = "PaymentDeclinedError";
  }
}

export class InvalidPaymentMethodError extends PaymentServiceError {
  constructor(message: string, originalError?: any) {
    super("invalid_payment_method", message, originalError);
    this.name = "InvalidPaymentMethodError";
  }
}