export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export type CheckoutSessionStatus = 'created' | 'pending' | 'completed' | 'expired' | 'cancelled';

export type TransactionStatus =
  'created' | 'authorized' | 'captured' | 'failed' | 'refunded' | 'voided';

export type MoneyAmount = {
  amount: string;
  currency: CurrencyCode;
};
