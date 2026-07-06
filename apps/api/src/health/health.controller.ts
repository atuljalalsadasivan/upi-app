import { Controller, Get } from '@nestjs/common';

type HealthResponse = {
  success: true;
  data: {
    service: 'globalpay-api';
    status: 'ok';
    timestamp: string;
  };
};

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      success: true,
      data: {
        service: 'globalpay-api',
        status: 'ok',
        timestamp: new Date().toISOString()
      }
    };
  }
}
