import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { AppConfig } from '../config/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) => {
        const secret = configService.get('jwt.secret', { infer: true });

        if (!secret) {
          throw new Error('JWT_SECRET is required for authentication.');
        }

        return {
          secret,
          signOptions: {
            expiresIn: configService.get('jwt.accessTokenTtl', { infer: true })
          }
        };
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
