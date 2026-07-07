import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthProfile, AuthResponse, AuthTokenPayload, MeResponse } from './auth.types';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

type UserRecord = NonNullable<Awaited<ReturnType<AuthService['findUserProfile']>>>;
type UserWithMerchant = UserRecord & {
  merchant: NonNullable<UserRecord['merchant']>;
};

@Injectable()
export class AuthService {
  private readonly passwordHashRounds = 12;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const email = registerDto.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, this.passwordHashRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          fullName: registerDto.fullName.trim(),
          email,
          passwordHash,
          merchant: {
            create: {
              businessName: registerDto.businessName.trim(),
              businessType: registerDto.businessType.trim(),
              country: registerDto.country.trim().toUpperCase(),
              currency: registerDto.currency.trim().toUpperCase()
            }
          }
        },
        include: { merchant: true }
      });

      return this.buildAuthResponse(this.requireMerchant(user));
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('A user with this email already exists.');
      }

      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email.trim().toLowerCase() },
      include: { merchant: true }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(this.requireMerchant(user));
  }

  async me(userId: string): Promise<MeResponse> {
    const user = await this.findUserProfile(userId);

    if (!user) {
      throw new UnauthorizedException('User no longer exists.');
    }

    return {
      success: true,
      data: this.toProfile(this.requireMerchant(user))
    };
  }

  private async buildAuthResponse(user: UserWithMerchant): Promise<AuthResponse> {
    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      merchantId: user.merchant.id
    };

    return {
      success: true,
      data: {
        accessToken: await this.jwtService.signAsync(payload),
        profile: this.toProfile(user)
      }
    };
  }

  private async findUserProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { merchant: true }
    });
  }

  private requireMerchant<TUser extends { merchant: unknown }>(
    user: TUser
  ): TUser & { merchant: NonNullable<TUser['merchant']> } {
    if (!user.merchant) {
      throw new UnauthorizedException('Merchant profile is missing.');
    }

    return user as TUser & { merchant: NonNullable<TUser['merchant']> };
  }

  private toProfile(user: UserWithMerchant): AuthProfile {
    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      merchant: {
        id: user.merchant.id,
        ownerId: user.merchant.ownerId,
        businessName: user.merchant.businessName,
        businessType: user.merchant.businessType,
        country: user.merchant.country,
        currency: user.merchant.currency,
        status: user.merchant.status,
        createdAt: user.merchant.createdAt.toISOString(),
        updatedAt: user.merchant.updatedAt.toISOString()
      }
    };
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002';
  }
}
