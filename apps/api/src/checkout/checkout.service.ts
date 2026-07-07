import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from '../config/configuration';
import { CheckoutSessionStatus } from '../generated/prisma/client.js';
import type { CheckoutSession } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CheckoutSessionResponse,
  CheckoutSessionResponseData,
  CheckoutSessionsResponse,
  PublicCheckoutSessionResponse,
  PublicCheckoutSessionResponseData
} from './checkout.types';
import type { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

type PublicCheckoutSession = CheckoutSession & {
  merchant: {
    businessName: string;
  };
};

@Injectable()
export class CheckoutService {
  private readonly checkoutTtlMs = 30 * 60 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<AppConfig, true>
  ) {}

  async createSession(
    merchantId: string,
    createDto: CreateCheckoutSessionDto
  ): Promise<CheckoutSessionResponse> {
    const expiresAt = new Date(Date.now() + this.checkoutTtlMs);
    const session = await this.prisma.checkoutSession.create({
      data: {
        merchantId,
        amount: createDto.amount.toFixed(4),
        currency: createDto.currency.trim().toUpperCase(),
        customerEmail: createDto.customerEmail.trim().toLowerCase(),
        customerName: createDto.customerName.trim(),
        description: createDto.description?.trim() || null,
        successUrl: createDto.successUrl.trim(),
        cancelUrl: createDto.cancelUrl.trim(),
        expiresAt
      }
    });

    return {
      success: true,
      data: this.toMerchantSessionResponse(session)
    };
  }

  async listSessions(merchantId: string): Promise<CheckoutSessionsResponse> {
    await this.expirePendingSessions({ merchantId });

    const sessions = await this.prisma.checkoutSession.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take: 25
    });

    return {
      success: true,
      data: sessions.map((session) => this.toMerchantSessionResponse(session))
    };
  }

  async getSession(merchantId: string, sessionId: string): Promise<CheckoutSessionResponse> {
    const session = await this.findMerchantSession(merchantId, sessionId);

    if (!session) {
      throw new NotFoundException('Checkout session was not found.');
    }

    const normalizedSession = await this.normalizeSessionExpiry(session);

    return {
      success: true,
      data: this.toMerchantSessionResponse(normalizedSession)
    };
  }

  async cancelSession(merchantId: string, sessionId: string): Promise<CheckoutSessionResponse> {
    const session = await this.findMerchantSession(merchantId, sessionId);

    if (!session) {
      throw new NotFoundException('Checkout session was not found.');
    }

    const normalizedSession = await this.normalizeSessionExpiry(session);

    if (normalizedSession.status === CheckoutSessionStatus.COMPLETED) {
      throw new BadRequestException('Completed checkout sessions cannot be cancelled.');
    }

    if (normalizedSession.status === CheckoutSessionStatus.EXPIRED) {
      throw new BadRequestException('Expired checkout sessions cannot be cancelled.');
    }

    if (normalizedSession.status === CheckoutSessionStatus.CANCELLED) {
      return {
        success: true,
        data: this.toMerchantSessionResponse(normalizedSession)
      };
    }

    const cancelledSession = await this.prisma.checkoutSession.update({
      where: { id: normalizedSession.id },
      data: { status: CheckoutSessionStatus.CANCELLED }
    });

    return {
      success: true,
      data: this.toMerchantSessionResponse(cancelledSession)
    };
  }

  async getPublicSession(sessionId: string): Promise<PublicCheckoutSessionResponse> {
    const session = await this.findPublicSession(sessionId);

    if (!session) {
      throw new NotFoundException('Checkout session was not found.');
    }

    const normalizedSession = await this.normalizePublicSessionExpiry(session);

    return {
      success: true,
      data: this.toPublicSessionResponse(normalizedSession)
    };
  }

  private async expirePendingSessions(where: { merchantId?: string } = {}) {
    await this.prisma.checkoutSession.updateMany({
      where: {
        ...where,
        status: CheckoutSessionStatus.PENDING,
        expiresAt: {
          lte: new Date()
        }
      },
      data: {
        status: CheckoutSessionStatus.EXPIRED
      }
    });
  }

  private findMerchantSession(merchantId: string, sessionId: string) {
    return this.prisma.checkoutSession.findFirst({
      where: {
        id: sessionId,
        merchantId
      }
    });
  }

  private findPublicSession(sessionId: string) {
    return this.prisma.checkoutSession.findUnique({
      where: { id: sessionId },
      include: {
        merchant: {
          select: {
            businessName: true
          }
        }
      }
    });
  }

  private async normalizeSessionExpiry(session: CheckoutSession): Promise<CheckoutSession> {
    if (this.shouldExpire(session)) {
      return this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: { status: CheckoutSessionStatus.EXPIRED }
      });
    }

    return session;
  }

  private async normalizePublicSessionExpiry(
    session: PublicCheckoutSession
  ): Promise<PublicCheckoutSession> {
    if (this.shouldExpire(session)) {
      return this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: { status: CheckoutSessionStatus.EXPIRED },
        include: {
          merchant: {
            select: {
              businessName: true
            }
          }
        }
      });
    }

    return session;
  }

  private shouldExpire(session: { status: CheckoutSessionStatus; expiresAt: Date }): boolean {
    return (
      session.status === CheckoutSessionStatus.PENDING && session.expiresAt.getTime() <= Date.now()
    );
  }

  private toMerchantSessionResponse(session: CheckoutSession): CheckoutSessionResponseData {
    return {
      id: session.id,
      publicCheckoutUrl: this.buildPublicCheckoutUrl(session.id),
      amount: session.amount.toString(),
      currency: session.currency,
      status: session.status,
      customerEmail: session.customerEmail,
      customerName: session.customerName,
      description: session.description,
      successUrl: session.successUrl,
      cancelUrl: session.cancelUrl,
      expiresAt: session.expiresAt.toISOString(),
      createdAt: session.createdAt.toISOString(),
      updatedAt: session.updatedAt.toISOString()
    };
  }

  private toPublicSessionResponse(
    session: PublicCheckoutSession
  ): PublicCheckoutSessionResponseData {
    return {
      id: session.id,
      merchantBusinessName: session.merchant.businessName,
      amount: session.amount.toString(),
      currency: session.currency,
      description: session.description,
      customerEmail: session.customerEmail,
      customerName: session.customerName,
      status: session.status
    };
  }

  private buildPublicCheckoutUrl(sessionId: string): string {
    const appUrl = this.configService.get('web.appUrl', { infer: true }).replace(/\/$/, '');

    return `${appUrl}/checkout/${sessionId}`;
  }
}
