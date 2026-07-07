import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthTokenPayload } from '../auth.types';
import type { AuthenticatedRequest } from '../decorators/current-user.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token.');
    }

    try {
      request.user = await this.jwtService.verifyAsync<AuthTokenPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired bearer token.');
    }
  }

  private extractBearerToken(authorizationHeader?: string): string | undefined {
    const [scheme, token] = authorizationHeader?.split(' ') ?? [];
    return scheme === 'Bearer' ? token : undefined;
  }
}
