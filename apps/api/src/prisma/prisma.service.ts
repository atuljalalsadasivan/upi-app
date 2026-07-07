import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import type { AppConfig } from '../config/configuration';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(configService: ConfigService<AppConfig, true>) {
    const databaseUrl = configService.get('database.url', { infer: true });

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is required to initialize Prisma.');
    }

    super({
      adapter: new PrismaPg({
        connectionString: databaseUrl
      })
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
