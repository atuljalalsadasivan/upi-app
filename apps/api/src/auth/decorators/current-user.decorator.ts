import { createParamDecorator } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { AuthTokenPayload } from '../auth.types';

export type AuthenticatedRequest = Request & {
  user?: AuthTokenPayload;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthTokenPayload => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.user) {
      throw new Error('Authenticated request is missing user context.');
    }

    return request.user;
  }
);
