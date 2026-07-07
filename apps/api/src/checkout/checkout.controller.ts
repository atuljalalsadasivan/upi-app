import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { AuthTokenPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CheckoutSessionResponse, CheckoutSessionsResponse } from './checkout.types';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('checkout/sessions')
@UseGuards(JwtAuthGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  createSession(
    @CurrentUser() currentUser: AuthTokenPayload,
    @Body() createDto: CreateCheckoutSessionDto
  ): Promise<CheckoutSessionResponse> {
    return this.checkoutService.createSession(currentUser.merchantId, createDto);
  }

  @Get()
  listSessions(@CurrentUser() currentUser: AuthTokenPayload): Promise<CheckoutSessionsResponse> {
    return this.checkoutService.listSessions(currentUser.merchantId);
  }

  @Get(':id')
  getSession(
    @CurrentUser() currentUser: AuthTokenPayload,
    @Param('id') sessionId: string
  ): Promise<CheckoutSessionResponse> {
    return this.checkoutService.getSession(currentUser.merchantId, sessionId);
  }

  @Patch(':id/cancel')
  cancelSession(
    @CurrentUser() currentUser: AuthTokenPayload,
    @Param('id') sessionId: string
  ): Promise<CheckoutSessionResponse> {
    return this.checkoutService.cancelSession(currentUser.merchantId, sessionId);
  }
}
