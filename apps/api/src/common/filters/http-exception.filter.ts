import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

type ErrorPayload = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  path: string;
  timestamp: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload: ErrorPayload = {
      success: false,
      error: {
        code: this.getErrorCode(status),
        message: this.getErrorMessage(exception)
      },
      path: request.url,
      timestamp: new Date().toISOString()
    };

    if (exception instanceof HttpException) {
      payload.error.details = exception.getResponse();
    }

    response.status(status).json(payload);
  }

  private getErrorCode(status: number): string {
    return status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR';
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'object' && response !== null && 'message' in response) {
        const { message } = response;
        return Array.isArray(message) ? message.join(', ') : String(message);
      }

      return exception.message;
    }

    return 'An unexpected error occurred.';
  }
}
