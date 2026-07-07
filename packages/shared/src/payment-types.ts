export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export type CheckoutSessionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

export type TransactionStatus =
  'created' | 'authorized' | 'captured' | 'failed' | 'refunded' | 'voided';

export type MoneyAmount = {
  amount: string;
  currency: CurrencyCode;
};

export type CreateCheckoutSessionRequest = {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description?: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSession = {
  id: string;
  publicCheckoutUrl: string;
  amount: string;
  currency: string;
  status: CheckoutSessionStatus;
  customerEmail: string;
  customerName: string;
  description: string | null;
  successUrl: string;
  cancelUrl: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicCheckoutSession = {
  id: string;
  merchantBusinessName: string;
  amount: string;
  currency: string;
  description: string | null;
  customerEmail: string;
  customerName: string;
  status: CheckoutSessionStatus;
};

export type CheckoutSessionResponse = {
  success: true;
  data: CheckoutSession;
};

export type CheckoutSessionsResponse = {
  success: true;
  data: CheckoutSession[];
};

export type PublicCheckoutSessionResponse = {
  success: true;
  data: PublicCheckoutSession;
};
