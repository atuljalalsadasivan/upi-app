export type MerchantStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';

export type UserRole = 'MERCHANT_ADMIN';

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

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  country: string;
  currency: string;
};

export type LoginRequest = {
  email: string;
  password: string;
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
