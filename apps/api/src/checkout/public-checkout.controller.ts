import { Controller, Get, Param } from '@nestjs/common';
import type { PublicCheckoutSessionResponse } from './checkout.types';
import { CheckoutService } from './checkout.service';

@Controller('public/checkout/sessions')
export class PublicCheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get(':id')
  getPublicSession(@Param('id') sessionId: string): Promise<PublicCheckoutSessionResponse> {
    return this.checkoutService.getPublicSession(sessionId);
  }
}
