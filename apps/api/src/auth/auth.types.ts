import type { MerchantStatus, UserRole } from '../generated/prisma/client.js';

export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
  merchantId: string;
};

export type AuthProfile = {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  };
  merchant: {
    id: string;
    ownerId: string;
    businessName: string;
    businessType: string;
    country: string;
    currency: string;
    status: MerchantStatus;
    createdAt: string;
    updatedAt: string;
  };
};

export type AuthResponse = {
  success: true;
  data: {
    accessToken: string;
    profile: AuthProfile;
  };
};

export type MeResponse = {
  success: true;
  data: AuthProfile;
};
