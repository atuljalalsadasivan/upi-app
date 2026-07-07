import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/api/.env.local', 'apps/api/.env', '.env.local', '.env'],
      load: [configuration]
    }),
    PrismaModule,
    AuthModule,
    CheckoutModule,
    HealthModule
  ]
})
export class AppModule {}
