import type { CheckoutSessionStatus } from '../generated/prisma/client.js';

export type CheckoutSessionResponseData = {
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

export type CheckoutSessionResponse = {
  success: true;
  data: CheckoutSessionResponseData;
};

export type CheckoutSessionsResponse = {
  success: true;
  data: CheckoutSessionResponseData[];
};

export type PublicCheckoutSessionResponseData = {
  id: string;
  merchantBusinessName: string;
  amount: string;
  currency: string;
  description: string | null;
  customerEmail: string;
  customerName: string;
  status: CheckoutSessionStatus;
};

export type PublicCheckoutSessionResponse = {
  success: true;
  data: PublicCheckoutSessionResponseData;
};
