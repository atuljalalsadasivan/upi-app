import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PublicCheckoutController } from './public-checkout.controller';

@Module({
  imports: [AuthModule],
  controllers: [CheckoutController, PublicCheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
